var text = "";
var ratio = 0.5;
const fileReader = new FileReader();

// detect upload

fileReader.onload = (e) => {
  text = e.target.result;
  console.log(e);
  parsetext();
};

document.addEventListener("DOMContentLoaded", (e) => {
  document
    .getElementById("fileInput")
    .addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      fileReader.readAsText(file);
    });
  editor = document
    .getElementById("text")
    .querySelector(':scope > [data-shown="true"]')
    .focus();
  editor.focus();
});

function parsetext() {
  let paragraph = document.getElementById("text");
  paragraph.innerHTML = "";
  let split = text.split(/(\s)/);
  let noise = split.map((o) => ({
    contents: o,
    filled: Math.random() < ratio,
  }));
  var elems = noise.map((o) => {
    
    var elem = document.createElement("span");
if (!/[^\s]/.test(o.contents)) {
      console.log(o.contents);
      elem.innerText = o.contents;
      return elem 
    }
    elem.dataset.goal = o.contents;
    elem.dataset.shown = o.filled;
    if (o.filled) {
      elem.innerText = o.contents;
      elem.style.backgroundColor = "";
    } else {
      elem.style.backgroundColor = "yellow";
      elem.innerText = "_";
    }
    return elem;
  });
  let firstElem = elems.find(
    (el) => el instanceof HTMLElement && el.dataset.shown === "false",
  );
  paragraph.append(...elems)
  if (firstElem) {
    addFocus(firstElem);
  }
}

function addFocus(element) {
  element.style.backgroundColor = "coral";
  element.contentEditable = true;
  element.innerText=""
  element.addEventListener("input", (e) => {
    verifyText(e);
  });
  element.focus();
}

function removeFocus(element) {
  element.style.backgroundColor = "darkgreen";
  element.contentEditable = false;
  element.dataset.shown = true;
  element.removeEventListener("click", (e) => verifyText(e));
}
function verifyText(event) {
  let elem = event.srcElement;
  if ((elem.innerText == elem.dataset.goal)) {
    removeFocus(elem);
    let next = document
      .getElementById("text")
      .querySelector(':scope > [data-shown="false"]');
    if (next) {
      addFocus(next);
    } else {
      win();
    }
  }
}
function win() {}
