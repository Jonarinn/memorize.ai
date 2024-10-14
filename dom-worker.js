const p = document.querySelectorAll("p");

if (p.length > 0) {
  const text = p[0].textContent;
  const words = text.split(" ");
  const wordCount = words.length;
  console.log(wordCount);
}
