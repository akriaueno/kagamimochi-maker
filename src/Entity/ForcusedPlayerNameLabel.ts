import { ObserverLabel } from "../Base/ObserverLabel";
import { PlayerQueue } from "../Util/PlayerQueue";

export class ForcusedPlayerNameLabel extends ObserverLabel {
  constructor(scene: g.Scene, font: g.Font, playerName?: string) {
    const param = {
      scene: scene,
      font: font,
      text: `${playerName ?? "??"}が操作中`,
      fontSize: 48,
      x: 300,
      y: 50,
    };
    super(param);
    return this;
  }

  private updateName(playerName?: string) {
    this.text = `${playerName ?? "??"}が操作中`;
    this.invalidate();
  }

  public onChanged(playerQueue: PlayerQueue) {
    const firstPlayer = playerQueue.getNth(0);
    this.updateName(firstPlayer?.name);
  }
}
