export let globalConditions = {
  player: {
    name: "Adventurer",
    inventory: ["book"],
  },
  conditions: {
    fedTheTiger: false,
  },
};

export function setGlobalConditions(newGlobalConditions) {
  globalConditions = newGlobalConditions;
}
