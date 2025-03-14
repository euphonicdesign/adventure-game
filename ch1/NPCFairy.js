import { NPC } from "../NPC.js";
import { globalConditions } from "../globalConditions.js";

export class NPCFairy extends NPC {
  interact(action) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "talk") {
      this.response.reply = "Nice talking to you!";
    }
    if (action === "offer book") {
      this.response.reply = "Thanks for the book!";
      globalConditions.player.inventory = inventory.filter(
        (item) => item !== "book"
      );
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
