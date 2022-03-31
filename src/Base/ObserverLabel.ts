export abstract class ObserverLabel extends g.Label implements Observer {
  constructor(param: g.LabelParameterObject) {
    super(param);
  }

  onChanged(arg?: any) {}
}
