import { SetScore, TennisEvent } from "./types";
import { game } from "./game";

const gamesKey = { player1: "player1Games", player2: "player2Games" } as const;

export function set(state: SetScore, event: TennisEvent): SetScore {
  if (state.type === "playing") {
    const newGame = game(state.game, event);
    if (newGame.type === "winner") {
      const winner = newGame.player;
      const loser = winner === "player1" ? "player2" : "player1";
      const winnerGames = state[gamesKey[winner]] + 1;
      const loserGames = state[gamesKey[loser]];

      if (winnerGames >= 6 && winnerGames - loserGames >= 2) {
        return { type: "setWon", player: winner };
      }

      return {
        ...state,
        [gamesKey[winner]]: winnerGames,
        game: { type: "scores", player1: "0", player2: "0" },
      };
    }
    return {
      ...state,
      game: newGame,
    };
  }
  return state;
}
