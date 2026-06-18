import { PieceType } from "./Piece";
import { Mouse } from "./Mouse";

export class PieceFactory {
  static create(type: PieceType, color: string) {
    switch (type) {
      case "mouse": return new Mouse(color);
      default: return null;
    }
  }
}