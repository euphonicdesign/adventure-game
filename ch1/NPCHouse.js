import { globalConditions } from "../globalConditions.js";
import { NPC } from "../NPC.js";

export class NPCHouse extends NPC {
  interact(action) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "pick food") {
      if (!this.state.hasPickedFood) {
        this.state.hasPickedFood = true;
        this.response.reply = "You grabed some food";
        this.response.returnedObjects = ["food"];
        this.removeAction(action);
      }
    }
    if (action === "pick money") {
      if (!this.state.hasPickedMoney) {
        this.state.hasPickedMoney = true;
        this.response.reply = "You picked some money";
        this.response.returnedObjects = ["money"];
        this.removeAction(action);
      }
    }

    return this.response;
  }
}
