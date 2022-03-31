import { ObserverLabel } from "../Base/ObserverLabel";
import { PlayerQueue } from "../Util/PlayerQueue";

export class NextPlayerNameLabel extends ObserverLabel {
  constructor(scene: g.Scene, font: g.Font, playerName?: string) {
    const param = {
      scene: scene,
      font: font,
      text: `次：${playerName ?? "?"}`,
      fontSize: 32,
      x: g.game.width - 300,
      y: 50,
    };
    super(param);
    return this;
  }

  private updateName(playerName: string | undefined) {
    this.text = `次：${playerName ?? "?"}`;
    this.invalidate();
  }

  public onChanged(playerQueue: PlayerQueue) {
    const nextPlayer = playerQueue.getNth(1);
    this.updateName(nextPlayer?.name);
  }
}
