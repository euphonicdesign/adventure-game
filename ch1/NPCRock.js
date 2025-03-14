import { globalConditions } from "../globalConditions.js";
import { NPC } from "../NPC.js";

export class NPCRock extends NPC {
  interact(action, currentRoom) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "move") {
      if (!this.state.moved) {
        this.state.moved = true;
        this.response.reply = "You moved the rock away.";
        currentRoom.description = "You are at the entrance of a dragon cave.";
        currentRoom.actions.push({
          action: "deep inside",
          destination: "dragon cave",
        });
      } else {
        this.response.reply =
          "No need to do that. The rock is not blocking the entrance anymore...";
      }
    }

    if (action === "cry") {
      this.response.reply =
        "You can cry out as much as you want... It doesn't seem to help much...";
    }

    return this.response;
  }
}
