function solution(content) {
  return /*html*/ `
<details class="disclosure flow pad-md border-xl border-400">
  <summary class="button">Toggle answer</summary>
  ${content}
</details>
  `;
}

module.exports = { solution };
