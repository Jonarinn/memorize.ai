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

const h1 = document.querySelectorAll("h1");
const h2 = document.querySelectorAll("h2");
const h3 = document.querySelectorAll("h3");

const p = document.querySelectorAll("p");

const allHeadings = [...h1, ...h2, ...h3];

const addToMindMap = (heading) => {
  console.log(heading);
};

p.forEach((paragraph) => {
  paragraph.addEventListener("click", () => {
    printResponse(`summarize this paragraph, ${paragraph.innerHTML}`);
  });
});

const mindMapButton = document.getElementById("mind_map_button");

allHeadings.forEach((heading) => {
  heading.addEventListener("mouseenter", () => {
    heading.innerHTML.concat(heading.innerHTML, mindMapButton);
  });
  heading.addEventListener("mouseleave", () => {
    heading.innerHTML.replace(mindMapButton, "");
  });
});
