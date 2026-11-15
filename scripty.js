var text = ""
const fileReader = new FileReader();
// detect upload

fileReader.onload = (e) => {
  text = e
  parsetext()
}
document.getElementById("fileInput").addEventListener("change", async (event) => {
  const file = event.files[0];
  if (!file) return;
  reader.readAsText(file);
})

function parsetext() { }
