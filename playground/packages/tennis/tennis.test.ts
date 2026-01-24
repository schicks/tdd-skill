import { describe, expect, test } from "bun:test";
import { tennis } from "./tennis";
import { TennisState, TennisEvent } from "./types";

describe("tennis", () => {
  test("point scored within a set", () => {
    const state: TennisState = {
      type: "playing",
      player1Sets: 0,
      player2Sets: 0,
      set: {
        type: "playing",
        player1Games: 0,
        player2Games: 0,
        game: { type: "scores", player1: "0", player2: "0" },
      },
    };
    const event: TennisEvent = { type: "point", player: "player1" };

    const result = tennis(state, event);

    expect(result).toEqual({
      type: "playing",
      player1Sets: 0,
      player2Sets: 0,
      set: {
        type: "playing",
        player1Games: 0,
        player2Games: 0,
        game: { type: "scores", player1: "15", player2: "0" },
      },
    });
  });

  test("set won increments set count and resets set", () => {
    const state: TennisState = {
      type: "playing",
      player1Sets: 0,
      player2Sets: 0,
      set: {
        type: "playing",
        player1Games: 5,
        player2Games: 4,
        game: { type: "scores", player1: "40", player2: "0" },
      },
    };
    const event: TennisEvent = { type: "point", player: "player1" };

    const result = tennis(state, event);

    expect(result).toEqual({
      type: "playing",
      player1Sets: 1,
      player2Sets: 0,
      set: {
        type: "playing",
        player1Games: 0,
        player2Games: 0,
        game: { type: "scores", player1: "0", player2: "0" },
      },
    });
  });

  test("winning 2nd set wins the match", () => {
    const state: TennisState = {
      type: "playing",
      player1Sets: 1,
      player2Sets: 0,
      set: {
        type: "playing",
        player1Games: 5,
        player2Games: 4,
        game: { type: "scores", player1: "40", player2: "0" },
      },
    };
    const event: TennisEvent = { type: "point", player: "player1" };

    const result = tennis(state, event);

    expect(result).toEqual({ type: "matchWon", player: "player1" });
  });
});
