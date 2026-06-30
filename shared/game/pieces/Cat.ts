import { PlayerNum } from "../core/Game";
import { Piece } from "./Piece";

export class Cat extends Piece {
  constructor(player: PlayerNum) {
    super(player);
    this.type = "cat";
    this.rank = 2;
  }
}