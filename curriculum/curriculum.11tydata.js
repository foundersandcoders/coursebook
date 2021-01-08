module.exports = {
  tags: "curriculum",
  layout: "curriculum",
  eleventyComputed: {
    week: (data) => {
      const paths = data.page.inputPath.split("/");
      if (paths.length === 4) {
        const weekName = paths[paths.length - 2];
        return titleCase(weekName);
      }
    },
    section: (data) => {
      const paths = data.page.filePathStem.split("/");
      const fileName = paths[paths.length - 1];
      return fileName === "index" ? "Introduction" : titleCase(fileName);
    },
    title: (data) => `${data.section} | ${data.week}`,
  },
};

function titleCase(s) {
  return s.split("-").map(capitalise).join(" ");
}

function capitalise(s) {
  return s[0].toUpperCase() + s.slice(1);
}
