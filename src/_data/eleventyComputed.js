module.exports = {
  permalink: (data) => {
    // README.md should always be the homepage
    // this is so we can avoid having frontmatter in the readme
    // since this would show up on GitHub and look weird
    // https://www.11ty.dev/docs/data-computed/
    if (data.page.fileSlug === "README") {
      return "/about/index.html";
    } else {
      return data.permalink;
    }
  },
  layout: (data) => {
    if (data.page.url.includes("starter-files")) return false;
    if (data.layout) return data.layout;
    return "default";
  },
};
