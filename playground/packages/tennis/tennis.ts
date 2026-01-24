/**
 * Tennis Kata - Score a tennis match
 *
 * Implement a tennis match as a reducer. The reducer should take the current state and a point event and return the new state.
 */

import { TennisState, TennisEvent } from "./types";
import { set } from "./set";

export * from "./types";
export { game } from "./game";
export { set } from "./set";

const setsKey = { player1: "player1Sets", player2: "player2Sets" } as const;

const freshSet = {
  type: "playing",
  player1Games: 0,
  player2Games: 0,
  game: { type: "scores", player1: "0", player2: "0" },
} as const;

export function tennis(state: TennisState, event: TennisEvent): TennisState {
  if (state.type === "playing") {
    const newSet = set(state.set, event);
    if (newSet.type === "setWon") {
      const winner = newSet.player;
      const winnerSets = state[setsKey[winner]] + 1;

      if (winnerSets >= 2) {
        return { type: "matchWon", player: winner };
      }

      return {
        ...state,
        [setsKey[winner]]: winnerSets,
        set: freshSet,
      };
    }
    return {
      ...state,
      set: newSet,
    };
  }
  return state;
}
