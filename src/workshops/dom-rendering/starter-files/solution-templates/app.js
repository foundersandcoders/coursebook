import dogs from "./dogs.js";

const cardTemplate = document.querySelector("#cardTemplate");

const dogElements = dogs.map((dog) => {
  const clone = cardTemplate.content.cloneNode(true);
  clone.querySelector("h2").append(dog.name);
  clone.querySelector("img").src = dog.image;
  return clone;
});

const pageTemplate = document.querySelector("#pageTemplate");
const clone = pageTemplate.content.cloneNode(true);
clone.querySelector("ul").append(...dogElements);

document.querySelector("#app").append(clone);
