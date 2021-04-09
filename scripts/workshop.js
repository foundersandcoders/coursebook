#! /usr/bin/env node

// USAGE:
// ./scripts/workshop.js import my-username/my-repo
// OR:
// ./scripts/workshop.js create my-workshop

const { join } = require("path");
const { pathExists, outputFile, ensureDir } = require("fs-extra");
const fetch = require("node-fetch");

const [, , COMMAND, REPO] = process.argv;

const commands = {
  async import(repo) {
    try {
      const [, filename] = repo.split("/");
      const path = await getPath(filename);
      const README = `https://api.github.com/repos/${repo}/readme`;
      const accept = "application/vnd.github.VERSION.raw";
      const original = await fetch(README, { headers: { accept } }).then(
        (res) => {
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          return res.text();
        }
      );
      // replace first line (i.e. h1) with our own metadata
      const contents = original.replace(/^#\s(.*)$/m, (_, titleWithoutHash) =>
        frontmatter(titleWithoutHash)
      );
      await writeWorkshop(path, contents);
      console.log(`Repo '${repo}' successfully imported`);
    } catch (error) {
      console.error(`Failed to import repo '${repo}'\n\n`, error);
      process.exit(1);
    }
  },
  async create(filename) {
    try {
      const path = await getPath(filename);
      const contents = frontmatter(filename);
      await writeWorkshop(path, contents);
      console.log(`Workshop '${filename}' successfully created`);
    } catch (error) {
      console.error(`Failed to create workshop '${filename}'\n\n`, error);
      process.exit(1);
    }
  },
  help() {
    console.log(`
Usage: workshop [command] [path]

Either imports an existing workshop from GitHub or scaffolds a new workshop.

Available commands:

import  Takes a GitHub path like username/repo and copies the README
create  Takes a filename and scaffolds an empty new workshop file
`);
  },
};

const fn = commands[COMMAND];

if (fn) {
  fn(REPO);
} else {
  console.error(`Command '${COMMAND}' not valid. Try 'import' or 'create'`);
  process.exit(1);
}

async function getPath(filename) {
  const path = join(__dirname, "..", "src", "workshops", filename);
  const exists = await pathExists(path);
  if (exists) throw new Error(`Workshop '${filename}' already exists`);
  return path;
}

async function writeWorkshop(path, contents) {
  await ensureDir(join(path, "starter-files"));
  return outputFile(join(path, "index.md"), contents);
}

function frontmatter(title) {
  return `---
title: ${title}
description:
tags:
  - workshop
keywords:
---`;
}
