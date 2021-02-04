const { html } = require("htm/preact");

exports.data = {
  layout: "standalone",
  title: "FAC Curriculum",
};

exports.render = () => html`
  <header class="stripes pad-xxl">
    <div class="vstack ji-center tac">
      <h1 class="highlight">Founders and Coders Curriculum</h1>
      <p class="highlight fz-lg">
        Learn to code with our free open-source web development resources
      </p>

      <nav class="switcher jc-center js-stretch">
        <a
          class="button hstack gap-sm jc-center fz-lg"
          href="/course/introduction/"
        >
          Course
          <svg
            width="20"
            height="20"
            fill="var(--body-bg)"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </a>
        <a
          class="button primary hstack gap-sm jc-center fz-lg"
          href="/resources/introduction/"
        >
          Resources
          <svg
            width="20"
            height="20"
            fill="var(--body-bg)"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </a>
        <a class="button hstack gap-sm jc-center fz-lg" href="/about/">
          About
          <svg
            width="20"
            height="20"
            fill="var(--body-bg)"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </a>
      </nav>
    </div>
  </header>
`;
