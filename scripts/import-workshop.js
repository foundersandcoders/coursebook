#! /usr/bin/env node

// usage: ./scripts/import-workshop.js my-username/my-repo
// copies repo README into workshops/my-repo/index.md

const fetch = require("node-fetch");
const { join } = require("path");
const { outputFile, ensureDir } = require("fs-extra");

const REPO = process.argv[2];
const README = `https://api.github.com/repos/${REPO}/readme`;
const accept = "application/vnd.github.VERSION.raw";

fetch(README, { headers: { accept } })
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.text();
  })
  .then(async (original) => {
    // replace first line (i.e. h1) with our own metadata
    const contents = original.replace(/^(.*)$/m, frontmatter);
    const [, filename] = REPO.split("/");
    const path = join(__dirname, "..", "src", "workshops", filename);
    await ensureDir(join(path, "starter-files"));
    return outputFile(join(path, "index.md"), contents);
  })
  .then(() => console.log(`Repo '${REPO}' successfully imported`))
  .catch((error) => {
    console.error(`Failed to import repo '${REPO}'\n\n`, error);
    process.exit(1);
  });

function frontmatter(title) {
  return `---
title: ${title.slice(2)}
description:
tags:
  - workshop
keywords:
---`;
}
