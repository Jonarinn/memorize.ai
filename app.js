const results = document.getElementById("results");

if(results !== null) {
    const generateMindMap = (input) => {
        results.innerHTML = `Genrating mindmap with input: ${input}`;
    }
    const generateTimeline = (input) => {
        results.innerHTML = `Genrating timeline with input: ${input}`;
    }
    
    
    const timeline = document.getElementById("timeline_button");
    const mindMap = document.getElementById("mind_map_button");

    timeline.addEventListener("click", event => generateTimeline(event));
    mindMap.addEventListener("click", event => generateMindMap(event));

}


console.log("hello");