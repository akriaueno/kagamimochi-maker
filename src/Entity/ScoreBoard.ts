import { GameScene } from "../Scene/GameScene";
import { MochiManager } from "../Util/MochiManager";
import { Mochi } from "./Mochi";

export class ScoreBoard extends g.E {
  private stackedMochiLabel: g.Label;
  private failedMochiLabel: g.Label;
  private scoreLabel: g.Label;
  private playerResultLabelList: g.Label[];
  static readonly font = new g.DynamicFont({
    game: g.game,
    fontFamily: "sans-serif",
    size: 48,
  });

  constructor(scene: g.Scene, mochiManager: MochiManager) {
    super({ scene });
    this.stackedMochiLabel = new g.Label({
      scene: scene,
      font: ScoreBoard.font,
      text: `積めたもち　: ${mochiManager.stackedMochiList.length}個`,
      fontSize: 48,
    });
    this.stackedMochiLabel.x = g.game.width / 2 - this.stackedMochiLabel.width / 2;
    this.stackedMochiLabel.y = 32;
    this.append(this.stackedMochiLabel);
    
    this.failedMochiLabel = new g.Label({
      scene: scene,
      font: ScoreBoard.font,
      text: `落としたもち: ${mochiManager.failedMochiList.length}個`,
      fontSize: 48,
    });
    this.failedMochiLabel.x = g.game.width / 2 - this.failedMochiLabel.width / 2;
    this.failedMochiLabel.y = 84;
    this.append(this.failedMochiLabel);
    
    this.scoreLabel = new g.Label({
      scene: scene,
      font: ScoreBoard.font,
      text: `スコア　　　 ${mochiManager.stackedMochiList.length - mochiManager.failedMochiList.length}`,
      fontSize: 64,
      textColor: 'red'
    });
    this.scoreLabel.x = g.game.width / 2 - this.scoreLabel.width / 2;
    this.scoreLabel.y = 152;
    this.append(this.scoreLabel);

    return this;
  }

}
