import { Game } from "./app.js";
import { removeWhiteSpacesAndAddDashes } from "./utils.js";

export class Tester {
  contentElement;
  roomDescriptionElement;
  constructor() {
    this.game = new Game();
    this.game.displayCurrentRoom();
    this.contentElement = this.game.getContentElement();
    this.runTests();
  }

  assert(testName, gameElement, value) {
    if (gameElement.innerText !== value) {
      throw new Error(`Test failed: ${gameElement.classList} !== ${value}`);
    }
    console.log(`Test passed: ${testName} (${gameElement.innerText})`);
  }

  getRoomDescriptionElement() {
    this.roomDescriptionElement = this.contentElement.querySelector(
      ".tester-room-description"
    );
  }

  testAction(action, newRoomDescription) {
    let actionButton = this.contentElement.querySelector(
      `.tester-action-button-${removeWhiteSpacesAndAddDashes(action)}`
    );
    actionButton.click();
    this.getRoomDescriptionElement();

    this.assert(action, this.roomDescriptionElement, newRoomDescription);
  }

  testNPCAction(npcName, npcAction, npcResponseReply) {
    const npcActionButtonElement = this.contentElement.querySelector(
      `.tester-${npcName}-${removeWhiteSpacesAndAddDashes(npcAction)}-button`
    );
    npcActionButtonElement.click();

    const npcResponseElement = this.contentElement.querySelector(
      `.tester-${npcName}-response`
    );
    this.assert(
      `${npcName}-${npcAction}`,
      npcResponseElement,
      npcResponseReply
    );
  }

  runTests() {
    this.getRoomDescriptionElement();

    let value =
      "It is a beautiful day outside. The room is full of sunshine. You decide to go out, and explore the surroundings.";
    this.assert(
      "Room Description Validation",
      this.roomDescriptionElement,
      value
    );

    let newRoomDescription =
      "You chose to go to the creative side of the realm.";
    this.testAction("left", newRoomDescription);

    newRoomDescription =
      "It is a beautiful day outside. The room is full of sunshine. You decide to go out, and explore the surroundings.";
    this.testAction("return", newRoomDescription);

    let responseReply = "What would you like to talk about?";
    this.testNPCAction("dragon", "talk", responseReply);

    responseReply = "Nice joke!";
    this.testNPCAction("dragon", "say a joke", responseReply);
  }
}
