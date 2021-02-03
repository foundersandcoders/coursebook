const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const slugify = require("@sindresorhus/slugify");
const markdownItTaskLists = require("markdown-it-task-lists");
const markdownItTitle = require("markdown-it-title");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const options = {
  dir: {
    output: "_site",
  },
};

module.exports = (config) => {
  // Delete old output dir before building new one
  config.on("beforeBuild", clean);

  // re-run the build when source CSS files change
  config.addWatchTarget("styles");

  // copy fonts & styles straight to output
  config.addPassthroughCopy("assets");

  // merges directory-level data with template-specific data when keys clash
  config.setDataDeepMerge(true);

  const md = markdownIt({
    html: true, // passthrough raw html in md files
    linkify: true, // auto-link URLs
    typographer: true, // smartquotes, other nicer symbols
  });

  md.use(markdownItAnchor, {
    slugify, // nicer url slugs
    permalink: true, // show link to headings
    permalinkSymbol: anchorIcon,
    permalinkClass: "heading-anchor",
    level: [2], // only h2
  });

  // GitHub style checkbox lists
  md.use(markdownItTaskLists, { enabled: true, label: true });

  // set first title in .md files as data.title
  md.use(markdownItTitle);

  config.addPlugin(syntaxHighlight);

  config.setLibrary("md", md);

  config.addFilter("markdown", (s) => md.render(s));

  return options;
};

function clean() {
  fs.rmdirSync(options.dir.output, { recursive: true, force: true });
  console.log(`Deleted old ${options.dir.output} directory`);
}

const html = String.raw;

const anchorIcon = html`
  <svg
    viewBox="0 0 32 32"
    width="20"
    height="20"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
  >
    <path
      d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15"
    ></path>
  </svg>
`;
