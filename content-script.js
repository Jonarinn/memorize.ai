// Put a stylesheet to the current page
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = chrome.runtime.getURL("page.css");
document.head.appendChild(link);

// Define a linked list node
class Node {
  /**
   * @param {HTMLParagraphElement} key
   */
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  /**
   * Add a new node to the linked list
   * @param {HTMLParagraphElement} key
   */
  enQueue(key) {
    key.classList.add("selected");
    if (this.head === null) {
      this.head = new Node(key);
      this.tail = this.head;
    } else {
      this.tail.next = new Node(key);
      this.tail = this.tail.next;
    }
  }
  deQueue() {
    if (this.head === null) {
      return null;
    }
    const key = this.head.key;
    this.head = this.head.next;
    return key;
  }

  /**
   * Convert the linked list to an array for better debugging
   * @returns {Array<HTMLParagraphElement>}
   */
  toArray() {
    const array = [];
    let current = this.head;
    while (current !== null) {
      array.push(current.key);
      current = current.next;
    }
    return array;
  }
}

/**
 * @type {Queue}
 */
const AIQueue = new Queue();
const AIResponseArray = [];
const summarizedParagraphs = new Set();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const processQueue = async () => {
  while (AIQueue.head !== null) {
    const paragraph = AIQueue.deQueue();
    summarizedParagraphs.add(paragraph);
    await FakeAIResponse(paragraph.innerHTML);
    paragraph.classList.add("completed");
    paragraph.classList.remove("selected");
  }
};

const AIResponse = async (input) => {
  const { available, defaultTemperature, defaultTopK, maxTopK } =
    await ai.assistant.capabilities();

  if (available !== "no") {
    const session = await ai.assistant.create();

    const stream = session.promptStreaming(input);
    for await (const chunk of stream) {
      AIResponseArray.push(chunk);
    }
  }
};
const FakeAIResponse = async (input) => {
  await delay(1000);
  AIResponseArray.push(input);
  console.log(AIResponseArray);
};

const paragraphHandler = (event) => {
  if (state.isOn) {
    const paragraph = event.target;
    if (summarizedParagraphs.has(paragraph)) {
      return;
    }
    AIQueue.enQueue(paragraph);
  }
};

const paragraphs = document.querySelectorAll("p");
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startProcess") {
    processQueue();
    sendResponse({ status: "Process started" });
  }
  if (request.action === "toggle") {
    state.isOn = !state.isOn;
    sendResponse({ status: state.isOn });
    if (state.isOn) {
      // Add click event listeners to all <p> elements
      paragraphs.forEach(function (p) {
        p.addEventListener("click", paragraphHandler);
      });
    } else {
      // Remove click event listeners from all <p> elements
      paragraphs.forEach(function (p) {
        p.removeEventListener("click", paragraphHandler);
      });
    }
  }
});
