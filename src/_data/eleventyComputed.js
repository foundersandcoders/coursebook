module.exports = {
  layout: (data) => {
    if (data.page.url.includes("starter-files")) return false;
    switch (data.layout) {
      case undefined:
      case null:
      case "":
        return "default";
      default:
        return data.layout;
    }
  },
};
