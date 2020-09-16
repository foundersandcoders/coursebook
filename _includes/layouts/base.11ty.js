const html = String.raw;

exports.render = (data) => {
  const nav = data.collections.nav[0].templateContent;
  if (data.page.fileSlug === "README") console.log(data.page.url);
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${data.title} | FAC Curriculum</title>
        <link
          rel="preload"
          href="/assets/fonts/GT-Eesti-Text-Light-subset.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link href="/assets/styles.css" rel="stylesheet" />
        <style>
          .global-nav ul a[href="${data.page.url}"] {
            font-weight: 500;
            color: var(--text-dark);
            background-color: var(--active-bg);
          }
        </style>
      </head>
      <body>
        <div class="page-wrapper">
          <button id="toggleNav" class="toggle-nav">
            <svg viewBox="0 0 20 20" width="24" height="24" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <nav id="globalNav" class="global-nav">
            <a href="/" aria-label="Home">${Logo()}</a>
            ${nav}
          </nav>
          <main id="main">
            <div class="main-wrapper">${data.content}</div>
          </main>
        </div>
        <script>
          const main = document.querySelector("#main");
          const globalNav = document.querySelector("#globalNav");
          const toggleNav = document.querySelector("#toggleNav");
          const closeNav = () => {
            globalNav.classList.remove("active");
          };

          toggleNav.addEventListener("click", () => {
            globalNav.classList.toggle("active");
            if (globalNav.classList.contains("active")) {
              main.addEventListener("click", closeNav, { once: true });
              document.addEventListener(
                "keydown",
                (event) => event.key === "Escape" && closeNav(),
                { once: true }
              );
            }
          });
        </script>
      </body>
    </html>
  `;
};

function Logo() {
  return html`
    <div>
      <svg
        viewBox="-1 0 301 141"
        fill="none"
        width="140"
        class="site-logo"
        stroke-width="1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="diagonalHatch"
            patternUnits="userSpaceOnUse"
            width="5"
            height="5"
          >
            <path
              d="M-1,1 l2,-2 M0,5 l5,-5 M4,6 l2,-2"
              stroke="black"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <g id="square">
          <rect width="100" height="100" stroke="black" />
          <rect width="100" height="50" fill="black" />
          <rect
            width="50"
            height="50"
            x="50"
            y="50"
            fill="url(#diagonalHatch)"
          />
        </g>

        <g id="triangle" transform="translate(8, 0)">
          <polygon points="100,100 150,0 200, 100" stroke="black" />
          <polygon points="100,100 125,50 150,100" fill="black" />
          <polygon points="150, 100 175,50, 200,100" fill="black" />
          <polygon points="125,50 150,100 175,50" fill="url(#diagonalHatch)" />
        </g>

        <g id="circle">
          <ellipse cx="250" cy="50" rx="50" ry="50" stroke="black" />
          <ellipse
            cx="250"
            cy="50"
            rx="22"
            ry="22"
            fill="url(#diagonalHatch)"
          />
          <path d="M250,0 a1,1 0 0,1 0,100" fill="black" />
        </g>
        <text
          x="0"
          y="128"
          text-length="301"
          length-adjust="spacingAndGlyphs"
          stroke="none"
          fill="black"
          style="font-size: 26px; text-transform: uppercase;"
        >
          Founders and coders
        </text>
      </svg>
    </div>
  `;
}
