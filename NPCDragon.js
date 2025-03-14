import { globalConditions } from "./globalConditions.js";
import { NPC } from "./NPC.js";

export class NPCDragon extends NPC {
  interact(action) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "say a joke") {
      this.state.happiness = true;
      this.response.reply = "Nice joke!";
      this.removeAction(action);
      this.#checkWinningConditions();
    }
    if (action === "offer food") {
      this.state.hunger = false;
      this.response.reply = "Thanks for the food!";
      inventory = inventory.filter((item) => item !== "food");
      if (!inventory.includes("food")) {
        this.removeAction(action);
      }
      this.#checkWinningConditions();
    }
    if (action === "talk") {
      if (globalConditions.conditions.fedTheTiger) {
        this.response.reply = "I see you have fed the tiger...";
      } else {
        this.response.reply = "What would you like to talk about?";
      }
    }
    return this.response;
  }

  #checkWinningConditions() {
    if (!this.winningConditions) {
      if (this.state.happiness && !this.state.hunger) {
        this.response.reply +=
          " You are the best. I would like to give you a sword and a shield.";
        this.response.returnedObjects = ["sword", "shield"];
        this.winningConditions = true;
      }
    }
  }
}
