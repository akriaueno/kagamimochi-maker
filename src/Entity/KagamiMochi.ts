import { EntityStateFlags } from "@akashic/akashic-engine";
import { GameScene } from "../Scene/GameScene";
import { MochiManager } from "../Util/MochiManager";
import { Dai } from "./Dai";
import { Mochi } from "./Mochi";

type State = "MOVE_LEFT" | "MOVE_RIGHT" | "STOPPED";

export class KagamiMochi extends g.E {
  /* 台ともちからなるユーザが操作できるエンティティ
   * これにもちが乗っかっていく
   */
  private static DIFF_X = 8;
  private moveState: State;
  private dai: Dai;
  private mochiManager: MochiManager;

  constructor(scene: GameScene) {
    const param = {
      scene: scene,
    };
    super(param);
    this.dai = new Dai(scene);
    this.append(this.dai);
    this.width = this.dai.width;
    this.height = this.dai.height;
    this.x = Math.floor(g.game.width / 2) - Math.floor(this.dai.width / 2);
    this.y = g.game.height - this.dai.height;
    this.mochiManager = scene.mochiManager;
    this.moveState = "STOPPED";
    return this;
  }

  public moveLeft() {
    if (this.x - KagamiMochi.DIFF_X < 0) {
      return;
    }
    this.moveState = "MOVE_LEFT";
    this.x -= KagamiMochi.DIFF_X;
  }

  public moveRight() {
    if (this.x + this.width + KagamiMochi.DIFF_X >= g.game.width) {
      return;
    }
    this.moveState = "MOVE_RIGHT";
    this.x += KagamiMochi.DIFF_X;
  }

  public stop() {
    this.moveState = "STOPPED";
  }

  public put(mochi: Mochi) {
    this.stop();
    mochi.stack();
    // 鏡餅からの相対座標に変換
    mochi.x -= this.x;
    mochi.y -= this.y;
    this.append(mochi);
    this.modified();
  }

  get minX () {
    const xList =  [this.x,
                    ...(this.mochiManager.stackedMochiList.map((KagamiMochiEntity) => KagamiMochiEntity.x + this.x))]
    return Math.min.apply(null, xList)
  }

  get maxXWidth () {
    const xWidthList =  [this.x + this.width,
                        ...(this.mochiManager.stackedMochiList.map((KagamiMochiEntity) => KagamiMochiEntity.x + KagamiMochiEntity.width + this.x))]
    return Math.max.apply(null, xWidthList)
  }

  public collide(mochi: Mochi) {
    const cutX = 10;
    return [this.dai, ...this.mochiManager.stackedMochiList].some((kagamiMochiEntity) => {
      const kagamiMochiEntityTop: g.CommonArea = {
        x: cutX,
        y: 0,
        width: kagamiMochiEntity.width - cutX,
        height: kagamiMochiEntity.height,
      };
      const mochiBottom: g.CommonArea = {
        x: cutX,
        y: mochi.height - 1,
        width: mochi.width - cutX,
        height: 1,
      };
      return g.Collision.intersectEntities(
        kagamiMochiEntity,
        mochi,
        kagamiMochiEntityTop,
        mochiBottom
      );
    });
  }
}
