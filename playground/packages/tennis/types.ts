export type Point = "0" | "15" | "30" | "40";
export type Player = "player1" | "player2";
export type GameScore =
  | { type: "scores"; player1: Point; player2: Point }
  | { type: "advantage"; player: Player }
  | { type: "winner"; player: Player };
export type SetScore =
  | { type: "playing"; player1Games: number; player2Games: number; game: GameScore }
  | { type: "setWon"; player: Player };
export type TennisState =
  | { type: "playing"; player1Sets: number; player2Sets: number; set: SetScore }
  | { type: "matchWon"; player: Player };
export type TennisEvent = { type: "point"; player: Player };
