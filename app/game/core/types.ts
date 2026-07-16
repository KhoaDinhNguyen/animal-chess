export type PlayerRole = "player1" | "player2" | "spectator";
export type ActivePlayer = Exclude<PlayerRole, "spectator">;
export type GameMode = "single" | "multi"
export type SquareType = "plain" | "river" | "trap" | "den";
export type PieceType = "mouse" | "elephant" | "lion" | "tiger" | "leopard" | "wolf" | "dog" | "cat"
export type BoardCoordinate = readonly [row: number, col: number];