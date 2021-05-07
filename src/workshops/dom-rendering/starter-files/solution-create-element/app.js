import createEl from "./create-element.js";
import dogs from "./dogs.js";

// Using our custom createEl function
//
// ---
//
const dogElements = dogs.map((dog) => {
  const h2 = createEl("h2", {}, dog.name);
  const img = createEl("img", {
    src: dog.image,
    alt: "",
    width: 500,
    height: 300,
  });
  return createEl("li", { className: "card" }, h2, img);
});

const title = createEl("h1", {}, "All the dogs");
const list = createEl("ul", {}, ...dogElements);

document.querySelector("#app").append(title, list);

// Using document.createElement directly
//
// ---
//
// const dogElements = dogs.map((dog) => {
//   const li = document.createElement("li");
//   const h2 = document.createElement("h2");
//   h2.textContent = dog.name;
//   const img = document.createElement("img");
//   img.src = dog.image;
//   img.alt = "";
//   li.append(h2, img);
//   return li;
// });

// const title = document.createElement("h1");
// title.textContent = "All the dogs";
//
// const list = document.createElement("ul");
// list.append(...dogElements);
//
// document.querySelector("#app").append(title, list);
