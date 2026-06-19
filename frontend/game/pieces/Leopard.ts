import { PlayerNum } from "../core/Game";
import { Piece } from "./Piece";

export class Leopard extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "leopard";
  }

  canCapture(piece: Piece): boolean {
    return !["element", "lion", "tiger"].includes(piece.type);
  }
}