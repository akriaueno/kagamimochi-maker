import { GameScene } from "../Scene/GameScene";

export class KokomadeLabel extends g.Label{

  constructor(scene: GameScene, font: g.Font) {
    const param = {
      scene: scene,
      font: font,
      fontSize: 24,
      text: "ここまで↓",
      textColor: "red"
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
