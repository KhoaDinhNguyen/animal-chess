import { PlayerNum } from "../core/Game";
import { Piece } from "./Piece";

export class Dog extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "dog";
  }

  canCapture(piece: Piece): boolean {
    return ["mouse", "cat", "dog"].includes(piece.type);
  }
}