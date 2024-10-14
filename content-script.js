// Put a stylesheet to the current page
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = chrome.runtime.getURL("page.css");
document.head.appendChild(link);

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

// Add click event listeners to all <p> elements
document.querySelectorAll("p").forEach(function (p) {
  p.addEventListener("click", function () {
    AIQueue.enQueue(p);
    console.log(AIQueue.toArray());
  });
});
