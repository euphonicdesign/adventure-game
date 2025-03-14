import { globalConditions } from "../globalConditions.js";
import { NPC } from "../NPC.js";

export class NPCInventor extends NPC {
  interact(action, currentRoom, roomFactory) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "talk") {
      if (!this.state.hadTalked) {
        this.state.hadTalked = true;
        this.response.returnedObjects = ["binoculars", "scuba"];
        this.response.reply =
          "Nice talking to you! says the inventor. Here are a pair of binoculars and a set of scuba diving. You might find them useful in your journey";

        const affectedRoom = roomFactory.getRoom("swamp");
        affectedRoom.actions.push({
          action: "dive",
          destination: "underwater",
        });
      } else {
        this.response.reply = "Thanks for passing by! :)";
      }
    }

    return this.response;
  }
}
