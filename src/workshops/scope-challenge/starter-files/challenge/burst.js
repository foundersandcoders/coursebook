if (randomRange) {
  const getRandomHue = randomRange(0, 360);
}

const { clientX, clientY } = event;
document.addEventListener("mousedown", (event) => {
  let mousedown = true;

  function createBurst(x, y) {
    const el = document.createElement("div");
    el.classList.add("burst");

    el.style.setProperty("--hue", hue);
    const hue = getRandomHue();

    const top = x - 4;
    const left = y - 4;
    el.style.setProperty("top", top + "px");
    el.style.setProperty("left", left + "px");

    let size = 1;
    requestAnimationFrame(grow);
    return el;
  }

  const burst = createBurst(clientX, clientY);
  document.body.appendChild(burst);
});

document.addEventListener("mouseup", (event) => {
  mousedown = false;
});

function grow() {
  size += 1;
  el.style.setProperty("transform", `scale(${size})`);
  if (mousedown) {
    requestAnimationFrame(grow);
  }
}
