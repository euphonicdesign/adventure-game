import { Room } from "./Room.js";
import { RoomFactory } from "./RoomFactory.js";
import { Tester } from "./utils/Tester.js";
import { removeWhiteSpacesAndAddDashes } from "./utils.js";
import { globalConditions, setGlobalConditions } from "./globalConditions.js";

export class Game {
  #contentElement;
  #currentRoom;
  #roomFactory;
  constructor() {
    this.#initialize();
    this.#roomFactory = new RoomFactory();
    this.#currentRoom = this.#roomFactory.getRoom("starting place");
  }

  getContentElement() {
    return this.#contentElement;
  }

  getCurrentRoom() {
    return this.#currentRoom;
  }

  #initialize() {
    const contentElement = document.createElement("section");
    this.#contentElement = contentElement;
    contentElement.setAttribute("id", "game-content");

    document.body.prepend(contentElement);
  }

  displayCurrentRoom() {
    this.#contentElement.innerHTML = "";
    this.displaySaveAndLoadButtons();
    this.displayRoomDescriptionAndPlayerInventory();
    this.displayActions();
    this.displayNPCActions();
  }
  displaySaveAndLoadButtons() {
    const saveElement = document.createElement("button");
    saveElement.classList.add("save-button");
    saveElement.innerText = "Save game";
    this.#contentElement.prepend(saveElement);
    saveElement.addEventListener("click", () => {
      this.saveGameState(this.#currentRoom.getName());
    });

    const loadElement = document.createElement("button");
    loadElement.classList.add("load-button");
    loadElement.innerText = "Load previous game";
    this.#contentElement.append(loadElement);
    loadElement.addEventListener("click", () => {
      this.loadGameState();
    });
  }

  displayRoomDescriptionAndPlayerInventory() {
    let roomDetailsElement = document.querySelector(".room-details-container");
    if (!roomDetailsElement) {
      roomDetailsElement = document.createElement("div");
      roomDetailsElement.classList.add("room-details-container");
      this.#contentElement.append(roomDetailsElement);
    }

    let currentRoomName = this.#currentRoom.getName().toUpperCase();

    roomDetailsElement.innerHTML = `
      <div>
        <h1>${currentRoomName}</h1>
        <p class="tester-room-description">${this.#currentRoom.getDescription()}</p>
        <p>Player inventory: ${globalConditions.player.inventory.join(", ")}</p>
        <p class="tooltip">Go: </p>
      </div>
    `;
  }

  displayActions() {
    // New destination actions
    let actionsContainerElement = document.querySelector("#actions-container");
    if (!actionsContainerElement) {
      actionsContainerElement = document.createElement("div");
      actionsContainerElement.setAttribute("id", "actions-container");
      this.#contentElement.append(actionsContainerElement);
    }

    actionsContainerElement.innerHTML = "";

    const tooltip = document.querySelector(".tooltip");

    const actions = this.#currentRoom.getActions();
    for (let action of actions) {
      const actionButton = document.createElement("button");
      actionButton.classList.add("action-button");
      actionButton.classList.add(
        `tester-action-button-${removeWhiteSpacesAndAddDashes(action.action)}`
      );
      actionButton.textContent = action.action;
      actionButton.dataset.destination = action.destination;
      actionsContainerElement.append(actionButton);
      actionButton.addEventListener("click", this.performAction.bind(this));

      actionButton.addEventListener("mouseenter", (e) => {
        const potentialDestination = action.destination;
        const tooltipContent = this.#roomFactory
          .getRoom(potentialDestination)
          .getName();
        tooltip.textContent = "Go: " + tooltipContent;
      });
      actionButton.addEventListener("mouseleave", () => {
        tooltip.textContent = "Go: ";
      });
    }
  }

  displayNPCActions() {
    // NPC actions
    const npcs = this.#currentRoom.getNPCs();

    let npcsContainerElement = document.querySelector(".npcs-container");
    if (!npcsContainerElement) {
      npcsContainerElement = document.createElement("div");
      npcsContainerElement.classList.add("npcs-container");
      this.#contentElement.append(npcsContainerElement);
    } else {
      npcsContainerElement.innerHTML = "";
    }

    for (let npc of npcs) {
      const npcContainerElement = document.createElement("article");
      npcContainerElement.classList.add("npc-container");
      npcsContainerElement.append(npcContainerElement);

      const npcNameElement = document.createElement("div");
      npcNameElement.classList.add("npc-name");
      npcNameElement.textContent = npc.getName();
      npcContainerElement.append(npcNameElement);

      const npcActionsContainerElement = document.createElement("div");
      npcActionsContainerElement.classList.add("npc-actions-container");
      npcActionsContainerElement.classList.add(
        `tester-${npc.getName()}-npc-actions-container`
      );
      npcContainerElement.append(npcActionsContainerElement);

      const npcResponseElement = document.createElement("div");
      npcResponseElement.classList.add("npc-response");
      npcResponseElement.classList.add(`tester-${npc.getName()}-response`);
      npcResponseElement.textContent = npc.response.reply;
      npcContainerElement.append(npcResponseElement);

      const actions = npc.getActions();
      for (let action of actions) {
        const actionButton = document.createElement("button");
        actionButton.classList.add("npc-action-button");
        actionButton.classList.add(
          `tester-${npc.getName()}-${removeWhiteSpacesAndAddDashes(
            action
          )}-button`
        );

        actionButton.textContent = action;
        actionButton.dataset.npcName = npc.getName();
        actionButton.addEventListener("click", (e) => {
          this.interactNPC(e, npcResponseElement);
        });
        npcActionsContainerElement.append(actionButton);
      }
    }
  }

  interactNPC(e, npcResponseElement) {
    const npcName = e.target.dataset.npcName;
    const action = e.target.textContent;
    const response = this.#currentRoom
      .getNPC(npcName)
      .interact(action, this.#currentRoom, this.#roomFactory);
    // console.log("response: ", response);

    npcResponseElement.textContent = response.reply;
    const playerInventory = globalConditions.player.inventory;
    const returnedObjects = response.returnedObjects || [];
    globalConditions.player.inventory = [
      ...playerInventory,
      ...returnedObjects,
    ];

    this.displayRoomDescriptionAndPlayerInventory();
    this.displayActions();
    this.displayNPCActions();
  }

  performAction(e, testerEvent) {
    const destination = e?.target.dataset.destination || testerEvent;
    // change room and display actions
    this.#contentElement.innerHTML = "";
    this.#currentRoom = this.#roomFactory.getRoom(destination);
    this.displayCurrentRoom();
  }

  saveGameState(currentRoom) {
    this.#roomFactory.saveRooms();
    localStorage.setItem("currentRoom", JSON.stringify(currentRoom));
    localStorage.setItem("globalConditions", JSON.stringify(globalConditions));
  }

  loadGameState() {
    this.#roomFactory.loadRooms();
    const currentRoom = JSON.parse(localStorage.getItem("currentRoom"));
    this.#currentRoom = this.#roomFactory.getRoom(currentRoom);
    setGlobalConditions(JSON.parse(localStorage.getItem("globalConditions")));
    this.displayCurrentRoom();
  }
}

// const game = new Game();
// game.displayCurrentRoom();
// console.log(game);

const tester = new Tester();
