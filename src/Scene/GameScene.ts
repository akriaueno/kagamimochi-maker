import { resolvePlayerInfo } from "@akashic-extension/resolve-player-info";
import { KagamiMochi } from "../Entity/KagamiMochi";
import { Mochi } from "../Entity/Mochi";
import { GameEndSign } from "../Entity/GameEndSign";
import { MochiCountLabel } from "../Entity/MochiCountLabel";
import { PlayerManager } from "../Util/PlayerManager";
import { ResultScene } from "./ResultScene";
import { MochiManager } from "../Util/MochiManager";
import { GameMessageLabel } from "../Entity/GameMessageLabel";
import { KokomadeLabel } from "../Entity/KokomadeLabel";

export class GameScene extends g.Scene {

  private endLabel: g.Label;
  private font: g.DynamicFont;
  private forcusedMochi: Mochi;
  private gameEndSign: GameEndSign;
  private gameMessageLabel: GameMessageLabel;
  private gameState: "PROGRESS" | "END";
  private kagamiMochi: KagamiMochi;
  private kokomadeLabel: KokomadeLabel;
  private mochiFailedCountLabel: MochiCountLabel;
  private mochiStackedCountLabel: MochiCountLabel;
  private playerManager: PlayerManager;
  public mochiManager: MochiManager;
  constructor(param: g.SceneParameterObject) {
    super({ ...param, assetIds: ["mochi", "mikan", "dai"] });

    this.playerManager = new PlayerManager();
    this.font = new g.DynamicFont({
      game: g.game,
      fontFamily: "sans-serif",
      size: 48,
    });
    this.gameState = "PROGRESS";
    resolvePlayerInfo({ raises: true });

    g.game.onPlayerInfo.add((ev) => {
      if (!!ev.player) {
        this.playerManager.add(ev.player);
      }
    });

    this.onLoad.add(() => {
      this.mochiManager = new MochiManager();

      this.gameEndSign = new GameEndSign(this);
      this.append(this.gameEndSign);

      this.kokomadeLabel = new KokomadeLabel(this, this.font);
      this.kokomadeLabel.x = g.game.width - this.kokomadeLabel.width - 32;
      this.kokomadeLabel.y = this.gameEndSign.y - this.kokomadeLabel.height;
      this.append(this.kokomadeLabel);

      this.kagamiMochi = new KagamiMochi(this);
      this.append(this.kagamiMochi);

      this.forcusedMochi = new Mochi(this);
      this.append(this.forcusedMochi);

      this.mochiStackedCountLabel = new MochiCountLabel(
        this,
        this.font,
        "STACKED"
      );
      this.mochiStackedCountLabel.x = 4;
      this.mochiStackedCountLabel.y = 4;
      this.append(this.mochiStackedCountLabel);
      this.mochiManager.addOvserver(this.mochiStackedCountLabel);

      this.mochiFailedCountLabel = new MochiCountLabel(
        this,
        this.font,
        "FAILED"
      );
      this.mochiFailedCountLabel.x = 4;
      this.mochiFailedCountLabel.y = 68;
      this.append(this.mochiFailedCountLabel);
      this.mochiManager.addOvserver(this.mochiFailedCountLabel);

      this.gameMessageLabel = new GameMessageLabel(
        this,
        this.font,
      );
      this.gameMessageLabel.x = g.game.width/2;
      this.gameMessageLabel.y = 32;
      this.append(this.gameMessageLabel);

      this.endLabel = new g.Label({
        scene: this,
        font: this.font,
        text: "終了!",
        fontSize: 64,
        textColor: "red",
        x: g.game.width / 2,
        y: g.game.height / 2,
      });
      this.endLabel.hide();
      this.append(this.endLabel);
    });

    this.onUpdate.add(() => {
      if (this.gameState === "END") {
        return;
      }
      if (this.forcusedMochi.x + this.forcusedMochi.width < this.kagamiMochi.minX ) {
        this.gameMessageLabel.change("左を連打!!")
      } else if ( this.kagamiMochi.maxXWidth < this.forcusedMochi.x ) {
        this.gameMessageLabel.change("右を連打!!")
      } else {
        this.gameMessageLabel.change("")
      }
      if (this.kagamiMochi.collide(this.forcusedMochi)) {
        const isEnd = this.gameEndSign.collide(this.forcusedMochi);
        this.kagamiMochi.put(
          this.forcusedMochi,
        );
        if (isEnd) {
          this.gameState = "END";
          this.endLabel.show();
          this.goNextScene();
          return;
        }
      } else if (this.forcusedMochi.y > g.game.height) {
        this.forcusedMochi.fail();
        this.remove(this.forcusedMochi);
      }
      if (this.forcusedMochi.isStopped()) {
        this.forcusedMochi = new Mochi(this); // next mochi
        this.append(this.forcusedMochi);
      } else {
        this.forcusedMochi.modified();
      }
    });

    this.onPointDownCapture.add((ev) => {
      const x = ev.point.x;
      if (x < g.game.width / 2) {
        this.kagamiMochi.moveLeft();
      } else {
        this.kagamiMochi.moveRight();
      }
      this.kagamiMochi.modified();
    });
  }

  goNextScene() {
    const resultScene = new ResultScene(
      { game: g.game },
      this.mochiManager
    );
    this.setTimeout(() => g.game.replaceScene(resultScene), 3000);
  }
}
