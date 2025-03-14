import { NPC } from "./NPC.js";
import { NPCDragon } from "./NPCDragon.js";
import { NPCTiger } from "./NPCTiger.js";

export class NPCFactory {
  #npcs;
  constructor() {
    this.#npcs = [];
  }

  getNPC(name, state, actions) {
    const foundNPC = this.#npcs.find((npc) => npc.getName() === name);
    if (!foundNPC) {
      if (name === "dragon") {
        const newNPC = new NPCDragon(name, state, actions);
        this.#npcs.push(newNPC);
        return newNPC;
      }
      if (name === "tiger") {
        const newNPC = new NPCTiger(name, state, actions);
        this.#npcs.push(newNPC);
        return newNPC;
      }
    }
    return foundNPC;
  }
}
