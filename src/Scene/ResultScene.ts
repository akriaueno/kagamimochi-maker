import { Mochi } from "../Entity/Mochi";
import { ScoreBoard } from "../Entity/ScoreBoard";
import { MochiManager } from "../Util/MochiManager";

export class ResultScene extends g.Scene {
  private scoreBoard: ScoreBoard;

  constructor(param: g.SceneParameterObject, mochiManager: MochiManager) {
    super({ ...param, assetIds: ["mochi", "mikan", "dai"] });

    this.onLoad.add(() => {
      this.scoreBoard = new ScoreBoard(this, mochiManager);
      this.append(this.scoreBoard);
    });
  }
}
