import { rooms } from "./rooms.js";
import { NPC } from "./NPC.js";
import { NPCFactory } from "./NPCFactory.js";

export class Room {
  number;
  name;
  description;
  actions;
  npcs;
  constructor(roomName, loadedRooms) {
    this.name = roomName;
    this.npcFactory = new NPCFactory();
    this.npcs = [];
    this.#loadRoomDetails(loadedRooms);
  }

  #loadRoomDetails(loadedRooms) {
    let room;
    if (loadedRooms) {
      room = loadedRooms.find((room) => room.name === this.name);
      console.log("loaded room: ", room.number);
      console.log("loaded npcs", room.npcs);
    } else {
      room = rooms.find((room) => room.name === this.name);
    }

    this.number = room.number;
    this.description = room.description;
    this.actions = room.actions;

    // load npcs
    const npcs = room.npcs || [];
    for (let npc of npcs) {
      const newNPC = this.npcFactory.getNPC(npc.name, npc.state, npc.actions);
      this.npcs.push(newNPC);
    }
  }

  getNPCs() {
    return this.npcs;
  }

  getNPC(name) {
    return this.npcs.find((npc) => npc.getName() === name);
  }

  getNumber() {
    return this.number;
  }
  getName() {
    return this.name;
  }
  getDescription() {
    return this.description;
  }
  getActions() {
    return this.actions;
  }
}
