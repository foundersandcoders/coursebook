const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");

// location of the postcss entrypoint file
const inputPath = "./index.css";

exports.data = () => {
  const filePath = path.join(__dirname, inputPath);
  return {
    // tell 11ty to write the compiled css to assets/ so we can use
    permalink: `assets/css/styles.css`,
    // otherwise it'll get the default HTML wrapper layout
    layout: false,
    filePath,
    // read the postcss input string from the _includes directory
    rawCss: fs.readFileSync(filePath),
  };
};

exports.render = async ({ rawCss, filePath }) => {
  const prod = process.env.ELEVENTY_ENV === "production";
  const plugins = [
    postcssPresetEnv(),
    postcssImport(),
    // only minify in prod
    // prod && cssnano,
  ].filter(Boolean);

  return postcss(plugins)
    .process(rawCss, { from: filePath })
    .then((result) => result.css);
};
