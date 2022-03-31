import { ObserverLabel } from "../Base/ObserverLabel";
import { PlayerQueue } from "./PlayerQueue";

export class PlayerManager implements Observable {
  private playerQueue: PlayerQueue;
  private observerLabelList: ObserverLabel[];

  constructor() {
    this.playerQueue = new PlayerQueue();
    this.observerLabelList = [];
  }

  public addOvserver(label: ObserverLabel) {
    this.observerLabelList.push(label);
  }

  public rmObserver(label: ObserverLabel) {
    this.observerLabelList.splice(this.observerLabelList.indexOf(label), 1);
  }

  public notify() {
    this.observerLabelList.forEach((label: ObserverLabel) =>
      label.onChanged(this.playerQueue)
    );
  }

  public add(player: g.Player | undefined) {
    this.playerQueue.push(player);
    this.notify();
  }

  public switch(): g.Player {
    const nextPlayer = this.playerQueue.popPush();
    this.notify();
    return nextPlayer;
  }

  public remove(player: g.Player) {
    this.playerQueue.remove(player);
    this.notify();
  }

  get currentPlayer(): g.Player | null {
    return this.playerQueue.getNth(0);
  }

  public isCurrentPlayer(player: g.Player | undefined) {
    if (!player || !this.currentPlayer) return false;
    return player === this.currentPlayer;
  }
}
