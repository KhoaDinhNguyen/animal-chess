import { PieceType } from "./Piece";
import { Mouse } from "./Mouse";
import { Elephant } from "./Elephant";
import { PlayerNum } from "../core/Game";

export class PieceFactory {
  static create(type: PieceType, player: PlayerNum) {
    switch (type) {
      case "mouse": return new Mouse(player);
      case "elephant": return new Elephant(player);
      default: return null;
    }
  }
}