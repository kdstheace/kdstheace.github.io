const h1Text = document.querySelector("h1");
const body = document.querySelector("body");

h1Text.style.color = "white";

const onResizeWindow = (event) => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 1300) {
    // body.style.backgroundColor = "yellow";
    body.classList.add("big");
    body.classList.remove("small");
    body.classList.remove("middle");
  } else if (windowWidth > 800) {
    // body.style.backgroundColor = "purple";
    body.classList.remove("big");
    body.classList.remove("small");
    body.classList.add("middle");
  } else {
    //body.style.backgroundColor = "blue";

    body.classList.remove("big");
    body.classList.add("small");
    body.classList.remove("middle");
  }
  console.log(window.innerWidth);
};

window.addEventListener("resize", onResizeWindow);
