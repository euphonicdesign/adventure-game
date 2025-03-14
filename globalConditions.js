export let globalConditions = {
  player: {
    name: "Adventurer",
    inventory: ["book", "sticks", "money", "food"],
  },
  conditions: {
    fedTheTiger: false,
  },
};

export function setGlobalConditions(newGlobalConditions) {
  globalConditions = newGlobalConditions;
}
