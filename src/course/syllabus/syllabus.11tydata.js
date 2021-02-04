module.exports = {
  layout: "syllabus",
  eleventyComputed: {
    topic: (data) => {
      // get whatever comes after syllabus in path. e.g. /syllabus/{this}/stuff
      const [, topic] = data.page.inputPath.match(/\/syllabus\/(.+)\//);
      return titleCase(topic);
    },
    section: (data) => {
      const paths = data.page.filePathStem.split("/");
      const fileName = paths[paths.length - 1];
      return fileName === "index" ? "Introduction" : titleCase(fileName);
    },
    title: (data) => `${data.section} | ${data.topic}`,
  },
};

function titleCase(s) {
  return s.split("-").map(capitalise).join(" ");
}

function capitalise(s) {
  return s[0].toUpperCase() + s.slice(1);
}
