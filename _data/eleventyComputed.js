module.exports = {
  permalink: (data) => {
    // README.md should always be the homepage
    // this is so we can avoid having frontmatter in the readme
    // since this would show up on GitHub and look weird
    // https://www.11ty.dev/docs/data-computed/
    if (data.page.fileSlug === "README") {
      return "/";
    } else {
      return data.permalink;
    }
  },
};
