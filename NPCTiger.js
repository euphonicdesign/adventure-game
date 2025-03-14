import { globalConditions } from "./globalConditions.js";
import { NPC } from "./NPC.js";

export class NPCTiger extends NPC {
  interact(action) {
    this.response.reply = "";
    if (action === "feed") {
      if (this.state.hunger) {
        this.state.hunger = false;
        globalConditions.conditions.fedTheTiger = true;
        this.response.reply =
          "Thanks for the food! I'm not feeling hungry anymore...";
        this.#checkWinningConditions();
      } else {
        this.response.reply = "I'm not feeling hungry anymore...";
      }
    }
    if (action === "talk") {
      this.response.reply = "Nice talking to you!";
    }
    if (action === "annoy") {
      this.response.reply = "Why are you so annyoing";
    }
    return this.response;
  }

  #checkWinningConditions() {
    if (!this.state.hunger) {
      this.response.reply += " You are the best";
    }
  }
}
