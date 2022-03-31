export class PlayerQueue {
  private queue: g.Player[];

  constructor() {
    this.queue = [];
  }

  public push(player: g.Player | undefined | null) {
    if (!!player) {
      this.queue.push(player);
    }
  }

  public pop(): g.Player | null {
    if (this.queue.length > 0) {
      return this.queue.shift();
    } else {
      return null;
    }
  }

  public popPush(): g.Player | null {
    const player = this.pop();
    this.push(player);
    return player;
  }

  public getNth(n: number): g.Player {
    const length = this.queue.length;
    return this.queue[n % length];
  }

  public remove(player: g.Player) {
    this.queue.splice(this.queue.indexOf(player), 1);
  }
}
