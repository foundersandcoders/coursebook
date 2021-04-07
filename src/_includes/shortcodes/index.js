function solution(content) {
  return /*html*/ `
<details class="disclosure flow">
  <summary class="button">Toggle answer</summary>
  ${content}
</details>
  `;
}

function tryit(content) {
  return /*html*/ `<div class="box box-primary content flow">${content}</div>`;
}

module.exports = { solution, tryit };
