import { NPC } from "./NPC.js";
import { NPCDragon } from "./ch1/NPCDragon.js";
import { NPCTiger } from "./ch1/NPCTiger.js";
import { NPCFairy } from "./ch1/NPCFairy.js";
import { NPCMonkey } from "./ch1/NPCMonkey.js";
import { NPCRock } from "./ch1/NPCRock.js";

export class NPCFactory {
  #npcs;
  constructor() {
    this.#npcs = [];
  }

  getNPC(name, state, actions) {
    const foundNPC = this.#npcs.find((npc) => npc.getName() === name);
    if (!foundNPC) {
      let newNPC;
      if (name === "dragon") {
        newNPC = new NPCDragon(name, state, actions);
      }
      if (name === "tiger") {
        newNPC = new NPCTiger(name, state, actions);
      }
      if (name === "fairy") {
        newNPC = new NPCFairy(name, state, actions);
      }
      if (name === "monkey") {
        newNPC = new NPCMonkey(name, state, actions);
      }
      if (name === "rock") {
        newNPC = new NPCRock(name, state, actions);
      }

      this.#npcs.push(newNPC);
      return newNPC;
    }
    return foundNPC;
  }
}
