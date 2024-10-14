// Put a stylesheet to the current page
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = chrome.runtime.getURL("page.css");
document.head.appendChild(link);

// Add click event listeners to all <p> elements
document.querySelectorAll("p").forEach(function (p) {
  p.addEventListener("click", function () {
    console.log("Paragraph clicked:", p.textContent);
  });
});
