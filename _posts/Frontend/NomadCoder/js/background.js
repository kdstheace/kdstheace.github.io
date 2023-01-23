const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];

const chosenImg = images[Math.floor(Math.random() * images.length)];

const backgroundImg = document.createElement("img");

backgroundImg.src = `img/${chosenImg}`;

document.body.prepend(backgroundImg);
