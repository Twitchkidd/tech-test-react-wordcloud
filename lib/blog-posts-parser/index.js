#!/usr/bin/env node

const fs = require("fs");
const fsPromises = fs.promises;

function sluggify(contents) {
  return contents.filter((text) => text !== ".DS_Store");
}

function filenameify(basePath, directorySlugs) {
  return directorySlugs.map((slug) => `${basePath}${slug}/index.md`);
}

async function init() {
  const blogPostsFolder = "../../projects/gareth/gfcom/content/blog/";
  const blogPostsAllFiles = await fsPromises.readdir(blogPostsFolder);
  const blogPostsSlugs = sluggify(blogPostsAllFiles);
  const blogPostFilenames = filenameify(blogPostsFolder, blogPostsSlugs);
  const firstFileContents = await fsPromises.readFile(
    blogPostFilenames[0],
    "utf8"
  );
  // firstFileContents[11] is the first character of the title
  // firstFileContents.indexOf("\n", 4)
  // console.log(firstFileContents[15]);
  console.log(firstFileContents.slice(11, firstFileContents.indexOf("\n", 4)));
}

init().catch(console.error);

/*
  1) List of every file path to read

  Each blog post has a folder at ../../projects/gareth/gfcom/content/blog/:slug
  Every folder in ../../projects/gareth/gfcom/content/blog/ (let's not do that again) is a blog post
  Each folder has an index.md
*/

/*
  2) Read each file

  Every index.md starts with forematter, that looks like this:

  ---
  title: Better Than No French
  date: "2020-05-22T10:16:13.711Z"
  description: "Un petit peu."
  ---

  Every word in the title, description, and then after the second `---` should be read
  For each word, add it to the accumulator array
  Yo, what if you figured out how many words it was reading per second and displayed like every howevermany would take whatever a frame would be?
*/

/*
  3) Create complete file

  Create file
  Pump in array ... JSON?
  Console.log it :)
*/

/*
  4) Top 72 to a file.
*/

/*
  5) Profit.
*/

/*

- To get a list of every file path to read
- Read each file, below a certain point word for word and add a point for each word to a set of words used, with the quanitity of each
- Create a file from the complete set for shits and giggles,
- Also create a file from a truncated version of the set (72)
- Print this was a triumph to the console

*/

// async function print(path) {
//   const files = await fsPromises.readdir(path);
//   for (const file of files) {
//     console.log(file);
//   }
// }
