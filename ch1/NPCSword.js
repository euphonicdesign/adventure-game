import { globalConditions } from "../globalConditions.js";
import { NPC } from "../NPC.js";

export class NPCSword extends NPC {
  interact(action, currentRoom) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "pull") {
      if (globalConditions.conditions.receivedStrength) {
        if (!this.state.pushed) {
          this.response.reply =
            "You gather all your strength and try to pull the sword out of the ground, but to no avail...";
        } else {
          this.response.reply =
            "You gather all your strength and try to pull the sword out of the ground and... you manage to get it! Hurray!";
          this.response.returnedObjects = ["sword"];
          // remove sword npc from current room
          currentRoom.npcs = currentRoom.npcs.filter(
            (npc) => npc.name !== this.name
          );
          currentRoom.description =
            "You go down until you reach the creative realm. This is the place where you have found your sword.";
        }
      } else {
        this.response.reply =
          "You try to pull the sword out of the ground, but it's stuck...";
      }
    }

    if (action === "push") {
      if (!this.state.pushed) {
        this.state.pushed = true;
      }
      this.response.reply =
        "Pushing the sword seems to have moved it a little bit...";
    }

    if (action === "cry") {
      this.response.reply =
        "Crying out loud won't do any good in this situation...";
    }

    return this.response;
  }
}
