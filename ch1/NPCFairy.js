import { NPC } from "../NPC.js";
import { globalConditions } from "../globalConditions.js";

export class NPCFairy extends NPC {
  interact(action) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "talk") {
      this.response.reply = "The fairy greets you.";
      this.state.talked = true;
      this.#checkWinningConditions();
    }
    if (action === "offer pearls") {
      if (!this.state.receivedPearls) {
        this.state.receivedPearls = true;
        this.response.reply = "Thanks for the pearls! says the fairy.";
        globalConditions.player.inventory = inventory.filter(
          (item) => item !== "pearls"
        );

        if (!globalConditions.player.inventory.includes("pearls")) {
          this.removeAction(action);
        }

        this.#checkWinningConditions();
      }
    }
    return this.response;
  }

  #checkWinningConditions() {
    if (!this.winningConditions) {
      if (this.state.receivedPearls && this.state.talked) {
        this.response.reply +=
          " You are the best. I would like to give you a lot of strength!";
        // this.response.returnedObjects = ["strength"];
        this.winningConditions = true;
        globalConditions.conditions.receivedStrength = true;
      }
    }
  }
}
