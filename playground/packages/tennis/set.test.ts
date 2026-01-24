import { describe, expect, test } from "bun:test";
import { set } from "./set";
import { SetScore, TennisEvent } from "./types";

describe("set", () => {
  test("point scored within a game", () => {
    const state: SetScore = {
      type: "playing",
      player1Games: 0,
      player2Games: 0,
      game: { type: "scores", player1: "0", player2: "0" },
    };
    const event: TennisEvent = { type: "point", player: "player1" };

    const result = set(state, event);

    expect(result).toEqual({
      type: "playing",
      player1Games: 0,
      player2Games: 0,
      game: { type: "scores", player1: "15", player2: "0" },
    });
  });

  test("game won increments game count and resets game", () => {
    const state: SetScore = {
      type: "playing",
      player1Games: 2,
      player2Games: 1,
      game: { type: "scores", player1: "40", player2: "0" },
    };
    const event: TennisEvent = { type: "point", player: "player1" };

    const result = set(state, event);

    expect(result).toEqual({
      type: "playing",
      player1Games: 3,
      player2Games: 1,
      game: { type: "scores", player1: "0", player2: "0" },
    });
  });

  test("winning 6th game with 2+ lead wins the set", () => {
    const state: SetScore = {
      type: "playing",
      player1Games: 5,
      player2Games: 4,
      game: { type: "scores", player1: "40", player2: "0" },
    };
    const event: TennisEvent = { type: "point", player: "player1" };

    const result = set(state, event);

    expect(result).toEqual({ type: "setWon", player: "player1" });
  });
});
