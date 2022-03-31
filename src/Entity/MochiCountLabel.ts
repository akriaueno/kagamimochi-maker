import { ObserverLabel } from "../Base/ObserverLabel";
import { GameScene } from "../Scene/GameScene";
import { MochiManager } from "../Util/MochiManager";
import { Mochi } from "./Mochi";
type LabelType = "STACKED" | "FAILED"
export class MochiCountLabel extends ObserverLabel  {
  private labelType: LabelType
  private mochiManager: MochiManager

  constructor(scene: GameScene, font: g.Font, labelType: LabelType) {
    let text;
    if (labelType === "STACKED") {
      text= "積めたもち　: 0個"
    } else {
      text= "落としたもち: 0個"
    }
    const param = {
      scene: scene,
      font: font,
      fontSize: 48,
      text
    };
    super(param);
    this.labelType = labelType;
    this.mochiManager = scene.mochiManager;
    return this;
  }

  public onChanged(){
    if (this.labelType === "STACKED") {
      this.text= `積めたもち　: ${this.mochiManager.stackedMochiList.length}個`
    } else {
      this.text= `落としたもち: ${this.mochiManager.failedMochiList.length}個`
    }
    this.invalidate();
  }
}
