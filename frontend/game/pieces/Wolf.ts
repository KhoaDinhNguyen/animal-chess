import { PlayerNum } from "../core/Game";
import { Piece } from "./Piece";

export class Wolf extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "wolf";
  }

  canCapture(piece: Piece): boolean {
    return ["mouse", "cat", "dog", "wolf"].includes(piece.type);
  }
}