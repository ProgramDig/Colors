import("./index.html");
import("./index.scss");

const column = document.querySelectorAll(".col");
const textColor = document.querySelectorAll(".color");

textColor.forEach((element) => {
  element.addEventListener("click", () => {
    document.execCommand("copy"); // obsolete
  });
  element.addEventListener("copy", (e) => {
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.setData("text/plain", element.textContent);
      alert("copy " + e.clipboardData.getData("text"));
    }
  });
});

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code.toLocaleLowerCase() === "space") {
    setColor();
  }
});

document.querySelectorAll(".btn").forEach((element) => {
  element.addEventListener("click", () => {
    const item = element.querySelector("i");
    if (item.classList.value === "fa-solid fa-lock-open") {
      item.classList.value = "fa-solid fa-lock";
    } else if (item.classList.value === "fa-solid fa-lock") {
      item.classList.value = "fa-solid fa-lock-open";
    }
  });
});

function setColor(isLoaded) {
  let colorsArray = isLoaded ? getColorsFromHash() : [];

  column.forEach((element, index) => {
	  const text = element.querySelector(".color")
    if (
      element.querySelector("i").classList.value === "fa-solid fa-lock-open"
    ) {
		 const button = element.querySelector(".btn");
		 const color = isLoaded ? colorsArray[index] ? colorsArray [index] : chroma.random() : chroma.random();

      text.textContent = color;
      element.style.background = color;

		if(!isLoaded) {
			colorsArray.push(color);
		}

      setTextColor(text, button, color);
    } else {
		colorsArray.push(text.textContent)
	 }
  });
  console.log(getColorsFromHash())
  updeteColorHash(colorsArray);
}

function setTextColor(text, button, color) {
  const luminance = chroma(color).luminance();
  const varColor = luminance > 0.5 ? "black" : "white";

  text.style.color = varColor;
  button.style.color = varColor;
}

function updeteColorHash(colors = []) {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}
setColor(true);
