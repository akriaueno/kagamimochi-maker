import { Mochi } from "./Mochi";

export class GameEndSign extends g.FilledRect {
  constructor(scene: g.Scene) {
    const param = {
      scene,
      cssColor: "#f00",
      width: g.game.width,
      height: 10,
    };
    super(param);
    this.x = 0;

    this.y = Math.floor(scene.game.height / 5);
    return this;
  }

  public collide(mochi: Mochi) {
    return g.Collision.intersectEntities(this, mochi);
  }
}
