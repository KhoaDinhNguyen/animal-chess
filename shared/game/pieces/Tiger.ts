import { PlayerNum } from "../core/Game";
import { Piece } from "./Piece";

export class Tiger extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "tiger";
    this.rank = 6;
  }
}