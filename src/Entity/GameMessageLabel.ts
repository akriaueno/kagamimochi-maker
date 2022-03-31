import { ObserverLabel } from "../Base/ObserverLabel";
import { GameScene } from "../Scene/GameScene";

export class GameMessageLabel extends g.Label{

  constructor(scene: GameScene, font: g.Font) {
    const param = {
      scene: scene,
      font: font,
      fontSize: 64,
      text: ""
    };
    super(param);
    return this;
  }

  public change(text: string){
    // TODO: 修正
    this.text= text;
    this.invalidate();
  }
}
