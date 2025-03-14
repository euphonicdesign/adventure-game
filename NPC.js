export class NPC {
  #name;
  state;
  actions;
  response;
  constructor(name, state, actions) {
    this.#name = name;
    this.state = state;
    this.actions = actions;
    this.response = {
      roomName: null,
      reply: null,
      returnedObjects: null,
    };
  }

  interact(action) {
    throw new Error("Must be implemented in its subclass.");
  }

  checkWinningConditions() {
    throw new Error("Must be implemented in its subclass.");
  }

  getActions() {
    return this.actions;
  }

  removeAction(action) {
    this.actions = this.actions.filter((a) => a !== action);
  }

  getName() {
    return this.#name;
  }
}
