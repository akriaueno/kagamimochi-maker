interface Observable {
  addOvserver(entity: Observer): void;
  rmObserver(entity: Observer): void;
  notify(): void;
}
