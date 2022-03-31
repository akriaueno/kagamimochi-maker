import { ObserverLabel } from "../Base/ObserverLabel";
import { Mochi } from "../Entity/Mochi";

export class MochiManager implements Observable {
  private observerLabelList: ObserverLabel[];
  private _mochiList: Mochi[];

  constructor() {
    this.observerLabelList = [];
    this._mochiList = [];
  }

  public addOvserver(label: ObserverLabel) {
    this.observerLabelList.push(label);
  }

  public rmObserver(label: ObserverLabel) {
    this.observerLabelList.splice(this.observerLabelList.indexOf(label), 1);
  }

  public notify() {
    this.observerLabelList.forEach((label: ObserverLabel) => {
      label.onChanged(this)
    });
  }

  public push(mochi:Mochi) {
    this._mochiList.push(mochi);
    this.notify();
  }

  get mochiList() {
    return this._mochiList;
  }

  get stackedMochiList() {
    return this._mochiList.filter(mochi => mochi.status==="STACKED");
  }

  get failedMochiList() {
    return this._mochiList.filter(mochi => mochi.status==="FAILED");
  }
}
