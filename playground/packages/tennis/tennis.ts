/**
 * Tennis Kata - Score a tennis game
 *
 * Implement a tennis game as a reducer. The reducer should take the current state and a point event and return the new state.
 */

type Point = "0" | "15" | "30" | "40";
type Score =
  | { type: "scores"; player1: Point; player2: Point }
  | { type: "advantage"; player: "player1" | "player2" }
  | { type: "winner"; player: "player1" | "player2" };
type TennisState = Score
type TennisEvent = { type: "point"; player: "player1" | "player2" };

export function tennis(state: TennisState, event: TennisEvent): TennisState {
  throw new Error("Not implemented");
}
