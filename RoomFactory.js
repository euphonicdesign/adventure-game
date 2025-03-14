import { Room } from "./Room.js";

export class RoomFactory {
  #rooms;
  constructor() {
    this.#rooms = [];
  }

  getRoom(destination) {
    // console.log(this.#rooms);

    const currentRoom = this.#rooms.find(
      (room) => room.getName() === destination
    );
    if (!currentRoom) {
      const newRoom = new Room(destination);
      this.#rooms.push(newRoom);
      // console.log("Not good!");
      return newRoom;
    }
    return currentRoom;
  }

  saveRooms() {
    const rooms = JSON.stringify(this.#rooms);
    // console.log(this.#rooms);
    localStorage.setItem("rooms", rooms);
  }

  loadRooms() {
    const loadedRooms = JSON.parse(localStorage.getItem("rooms"));
    this.#rooms = [];

    for (let loadedRoom of loadedRooms) {
      const newRoom = new Room(loadedRoom.name, loadedRooms);
      this.#rooms.push(newRoom);
    }
  }
}
