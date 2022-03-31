import { GameScene } from "../Scene/GameScene";
import { MochiManager } from "../Util/MochiManager";
import { MyMath } from "../Util/MyMath";

type Status = "FALL" |"STACKED" | "FAILED";

export class Mochi extends g.Sprite {
  private static DIFF_Y = 4;
  private _status: Status;
  private mochiManger: MochiManager;
  private m: MyMath;

  constructor(scene: GameScene) {
    const mochiImageAsset = scene.asset.getImageById("mochi");
    const param = {
      scene: scene,
      src: mochiImageAsset,
      width: mochiImageAsset.width,
      height: mochiImageAsset.height,
    };
    super(param);
    this.x = Math.floor(MyMath.getUniform() * (g.game.width - this.width)); // [0, game.width - mochi.width]
    this.y = 0;
    const mochi_scale = MyMath.sigmoid(MyMath.getNormal(0.0, 0.5)) * 2; // x~N(0, 0.5), mochi_scale = 1 / (1 + exp(-x)) * 2
    this.scale(mochi_scale);
    this.mochiManger = scene.mochiManager
    this._status = "FALL";
    this.onUpdate.add(() => {
      switch (this._status) {
        case "FALL":
          this.y += Mochi.DIFF_Y;
          break;
      }
      this.modified();
    });
    return this;
  }

  public fall() {
    this._status = "FALL";
  }

  public fail() {
    this._status = "FAILED";
    this.mochiManger.push(this)
  }

  public stack() {
    this._status = "STACKED";
    this.mochiManger.push(this)
  }

  public isStopped() {
    return this._status !== "FALL";
  }

  public isStacked() {
    return this._status === "STACKED";
  }

  get status() {
    return this._status;
  }
}
