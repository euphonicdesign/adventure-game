import { globalConditions } from "../globalConditions.js";
import { NPC } from "../NPC.js";

export class NPCTiger extends NPC {
  interact(action) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "talk") {
      this.response.reply = "Nice talking to you! says the tiger.";
    }

    if (action === "feed") {
      if (!inventory.includes("food")) {
        this.response.reply = "You don't have any food...";
      } else {
        this.response.reply = "Thanks for the food!";
      }
    }

    return this.response;
  }
}
