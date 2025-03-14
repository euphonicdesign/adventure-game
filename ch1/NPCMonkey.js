import { NPC } from "../NPC.js";
import { globalConditions } from "../globalConditions.js";

export class NPCMonkey extends NPC {
  interact(action) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "talk") {
      this.response.reply = "Nice talking to you! says the monkey.";
    }
    if (action === "offer food") {
      if (inventory.includes("food")) {
        this.response.reply = "Thanks, but I eat only bananas...";
      } else {
        this.response.reply = "You don't have any food...";
      }
    }
    return this.response;
  }
}
