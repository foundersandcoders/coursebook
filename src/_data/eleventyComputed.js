module.exports = {
  layout: (data) => {
    if (data.page.url.includes("starter-files")) return false;
    if (data.layout) return data.layout;
    return "default";
  },
};
