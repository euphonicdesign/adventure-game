import { Game } from "../app.js";
import { removeWhiteSpacesAndAddDashes } from "../utils.js";

export class Tester {
  contentElement;
  roomDescriptionElement;
  testCasesArray;
  constructor() {
    this.game = new Game();
    this.game.displayCurrentRoom();
    this.contentElement = this.game.getContentElement();
    this.loadTestsFromCSV("./utils/test_cases.csv");
  }

  async loadTestsFromCSV(url) {
    try {
      const response = await fetch(url);
      const data = response.text();
      this.testCasesArray = this.parseCSV(await data);
      this.runTests();
    } catch (error) {
      console.log("Error fetching CSV:", error);
    }
  }

  parseCSV(str) {
    const arr = [];
    let quote = false; // 'true' means we're inside a quoted field

    // Iterate over each character, keep track of current row and column (of the returned array)
    for (let row = 0, col = 0, c = 0; c < str.length; c++) {
      let cc = str[c],
        nc = str[c + 1]; // Current character, next character
      arr[row] = arr[row] || []; // Create a new row if necessary
      arr[row][col] = arr[row][col] || ""; // Create a new column (start with empty string) if necessary

      // If the current character is a quotation mark, and we're inside a
      // quoted field, and the next character is also a quotation mark,
      // add a quotation mark to the current column and skip the next character
      if (cc == '"' && quote && nc == '"') {
        arr[row][col] += cc;
        ++c;
        continue;
      }

      // If it's just one quotation mark, begin/end quoted field
      if (cc == '"') {
        quote = !quote;
        continue;
      }

      // If it's a comma and we're not in a quoted field, move on to the next column
      if (cc == "," && !quote) {
        ++col;
        continue;
      }

      // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
      // and move on to the next row and move to column 0 of that new row
      if (cc == "\r" && nc == "\n" && !quote) {
        ++row;
        col = 0;
        ++c;
        continue;
      }

      // If it's a newline (LF or CR) and we're not in a quoted field,
      // move on to the next row and move to column 0 of that new row
      if (cc == "\n" && !quote) {
        ++row;
        col = 0;
        continue;
      }
      if (cc == "\r" && !quote) {
        ++row;
        col = 0;
        continue;
      }

      // Otherwise, append the current character to the current column
      arr[row][col] += cc;
    }
    return arr;
  }

  assert(testName, gameElement, value) {
    if (gameElement && gameElement.innerText !== value) {
      throw new Error(`Test failed: ${gameElement.classList} !== ${value}`);
    }
    console.log(`Test passed: ${testName} (${gameElement?.innerText})`);
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

    for (let i = 1; i < this.testCasesArray.length; i++) {
      console.log(this.testCasesArray[i]);
      const [
        testNumber,
        actionType,
        destination,
        npcName,
        npcAction,
        newRoomDescription,
        npcResponseReply,
      ] = this.testCasesArray[i];
      if (actionType === "action") {
        this.testAction(destination, newRoomDescription);
      }
      if (actionType === "npc-action") {
        this.testNPCAction(npcName, npcAction, npcResponseReply);
      }
    }
  }
}
