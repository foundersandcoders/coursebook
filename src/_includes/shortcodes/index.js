function solution(content) {
  return /*html*/ `
<details class="disclosure flow">
  <summary class="button">Toggle answer</summary>
  ${content}
</details>
  `;
}

const types = {
  default: "box-default",
  success: "box-success",
  error: "box-error",
};
function box(content, type = "default") {
  return /*html*/ `<div class="box ${types[type]} content flow">${content}</div>`;
}

module.exports = { solution, box };
