import { globalConditions } from "../globalConditions.js";
import { NPC } from "../NPC.js";

export class NPCFish extends NPC {
  interact(action, currentRoom, roomFactory) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "watch") {
      this.response.reply =
        "You watch the fish... They are swimming in banks...";
    }

    if (action === "feed") {
      if (!inventory.includes("food")) {
        this.response.reply = "You don't have any food...";
      } else {
        if (!this.state.fed) {
          this.response.reply =
            "The fish thank you for the food and offer you a set of pearls!";
          globalConditions.player.inventory.push("pearls");
          this.state.fed = true;
          roomFactory
            .getRoom("creative realm")
            .npcs.find((npc) => npc.name === "fairy")
            .actions.push("offer pearls");
        } else {
          this.response.reply =
            "The fish consume the little food you have provided!";
        }
      }
    }

    return this.response;
  }
}
