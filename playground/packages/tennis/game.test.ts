import { describe, expect, test } from "bun:test";
import { game } from "./game";
import { GameScore, TennisEvent, Point, Player } from "./types";

describe("game", () => {
  describe.each<[Player]>([["player1"], ["player2"]])(
    "%s",
    (player) => {
      const other: Player = player === "player1" ? "player2" : "player1";

      test.each<[Point, Point]>([
        ["0", "15"],
        ["15", "30"],
        ["30", "40"],
      ])("point progression: %s -> %s", (from, to) => {
        const state: GameScore = { type: "scores", player1: "0", player2: "0", [player]: from };
        const event: TennisEvent = { type: "point", player };

        const result = game(state, event);

        expect(result).toEqual({ type: "scores", player1: "0", player2: "0", [player]: to, [other]: "0" });
      });

      test("deuce -> advantage", () => {
        const state: GameScore = { type: "scores", player1: "40", player2: "40" };
        const event: TennisEvent = { type: "point", player };

        const result = game(state, event);

        expect(result).toEqual({ type: "advantage", player });
      });

      test("advantage -> winner (advantage player scores)", () => {
        const state: GameScore = { type: "advantage", player };
        const event: TennisEvent = { type: "point", player };

        const result = game(state, event);

        expect(result).toEqual({ type: "winner", player });
      });

      test("advantage -> deuce (other player scores)", () => {
        const state: GameScore = { type: "advantage", player };
        const event: TennisEvent = { type: "point", player: other };

        const result = game(state, event);

        expect(result).toEqual({ type: "scores", player1: "40", player2: "40" });
      });

      test("40-30 -> winner", () => {
        const state: GameScore = { type: "scores", player1: "30", player2: "30", [player]: "40" };
        const event: TennisEvent = { type: "point", player };

        const result = game(state, event);

        expect(result).toEqual({ type: "winner", player });
      });
    }
  );
});
