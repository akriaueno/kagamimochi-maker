export class Dai extends g.Sprite {
  private static DIFF_X = 8;

  constructor(scene: g.Scene) {
    const daiImageAsset = scene.asset.getImageById("dai");
    const param = {
      scene: scene,
      src: daiImageAsset,
      width: daiImageAsset.width,
      height: daiImageAsset.height,
    };
    super(param);
    return this;
  }
}
