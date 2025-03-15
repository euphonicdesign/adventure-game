import { globalConditions } from "../globalConditions.js";
import { NPC } from "../NPC.js";

export class NPCDragon extends NPC {
  interact(action, currentRoom, roomFactory) {
    this.response.reply = "";
    this.response.returnedObjects = [];
    let inventory = globalConditions.player.inventory;

    if (action === "attack") {
      if (inventory.includes("sword")) {
        if (!this.state.defeated) {
          this.state.defeated = true;
          globalConditions.conditions.defeatedTheDragon = true;
          this.response.reply = "You have defeated the dragon!";
          this.removeAction(action);
          currentRoom.description =
            "You are deep inside the cave. You stand in front of a weak dragon...";

          const affectedRoom = roomFactory.getRoom("creative realm");
          affectedRoom.actions.push({
            action: "down",
            destination: "circus",
          });
        }
      } else {
        this.response.reply = "You don't have any weapons with you...";
      }
    }

    return this.response;
  }
}
// export class NPCDragon extends NPC {
//   interact(action) {
//     this.response.reply = "";
//     this.response.returnedObjects = [];
//     let inventory = globalConditions.player.inventory;

//     if (action === "say a joke") {
//       this.state.happiness = true;
//       this.response.reply = "Nice joke!";
//       this.removeAction(action);
//       this.#checkWinningConditions();
//     }
//     if (action === "offer food") {
//       if (!inventory.includes("food")) {
//         this.response.reply = "You have no food left...";
//       } else {
//         this.state.hunger = false;
//         this.response.reply = "Thanks for the food!";
//         globalConditions.player.inventory = inventory.filter(
//           (item) => item !== "food"
//         );

//         if (!globalConditions.player.inventory.includes("food")) {
//           this.removeAction(action);
//         }
//         this.#checkWinningConditions();
//       }
//     }
//     if (action === "talk") {
//       if (globalConditions.conditions.fedTheTiger) {
//         this.response.reply = "I see you have fed the tiger...";
//       } else {
//         this.response.reply = "What would you like to talk about?";
//       }
//     }
//     return this.response;
//   }

//   #checkWinningConditions() {
//     if (!this.winningConditions) {
//       if (this.state.happiness && !this.state.hunger) {
//         this.response.reply +=
//           " You are the best. I would like to give you a sword and a shield.";
//         this.response.returnedObjects = ["sword", "shield"];
//         this.winningConditions = true;
//       }
//     }
//   }
// }
