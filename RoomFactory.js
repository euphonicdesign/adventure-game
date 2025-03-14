import { Room } from "./Room.js";

export class RoomFactory {
  #rooms;
  constructor() {
    this.#rooms = [];
  }

  getRoom(destination) {
    const currentRoom = this.#rooms.find(
      (room) => room.getName() === destination
    );
    if (!currentRoom) {
      const newRoom = new Room(destination);
      this.#rooms.push(newRoom);
      return newRoom;
    }
    return currentRoom;
  }
}
