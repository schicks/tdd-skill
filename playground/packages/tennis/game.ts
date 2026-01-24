import { GameScore, Point, TennisEvent } from "./types";

function nextPoint(point: Point): Point {
  const progression: Record<Point, Point> = {
    "0": "15",
    "15": "30",
    "30": "40",
    "40": "40",
  };
  return progression[point];
}

export function game(state: GameScore, event: TennisEvent): GameScore {
  const scorer = event.player;

  if (state.type === "scores") {
    // Deuce: both at 40
    if (state.player1 === "40" && state.player2 === "40") {
      return { type: "advantage", player: scorer };
    }
    // Win: scorer at 40, opponent not
    if (state[scorer] === "40") {
      return { type: "winner", player: scorer };
    }
    return {
      ...state,
      [scorer]: nextPoint(state[scorer]),
    };
  }

  if (state.type === "advantage") {
    // Advantage player scores -> win
    if (state.player === scorer) {
      return { type: "winner", player: scorer };
    }
    // Other player scores -> back to deuce
    return { type: "scores", player1: "40", player2: "40" };
  }

  return state;
}
