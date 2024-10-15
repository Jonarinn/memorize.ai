const state = {
  isOn: true,
  isProcessing: false,
};
const results = document.getElementById("results");

if (results === null) {
  throw Error("unable to find results div");
}
const generateMindMap = (input) => {
  results.innerHTML = `Genrating mindmap with input: ${input}`;
};
const generateTimeline = (input) => {
  results.innerHTML = `Genrating timeline with input: ${input}`;
};

const timeline = document.getElementById("timeline_button");
const mindMap = document.getElementById("mind_map_button");

timeline.addEventListener("click", (event) => generateTimeline(event));
mindMap.addEventListener("click", (event) => generateMindMap(event));

const printResponse = async (input) => {
  const { available, defaultTemperature, defaultTopK, maxTopK } =
    await ai.assistant.capabilities();

  if (available !== "no") {
    const session = await ai.assistant.create();

    const stream = session.promptStreaming(input);
    for await (const chunk of stream) {
      console.log(chunk);
    }
  }
};

const addToMindMap = (heading) => {
  console.log(heading);
};

const sendMessage = (functionName, curState) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: functionName, state: curState },
      (response) => {
        console.log(response);
      }
    );
  });
};

const statusButton = document.getElementById("status");

statusButton.addEventListener("click", () => {
  if (state.isOn) {
    state.isOn = false;
    statusButton.innerHTML = "OFF";
  } else {
    state.isOn = true;
    statusButton.innerHTML = "ON";
  }
});

const mindMapButton = document.getElementById("mind_map_button");

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   if (state.isOn) {
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       { action: "startProcess" },
//       (response) => {
//         state.isProcessing = true;
//       }
//     );
//   }
// });
