export class Action {
  actionSet = new Set();

  add(func) {
    this.actionSet.add(func);
  }

  remove(func) {
    this.actionSet.delete(func);
  }

  execute(...params) {
    for(const func of this.actionSet.values()) {
      func(...params);
    }
  }
}