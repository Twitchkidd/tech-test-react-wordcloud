#!/usr/bin/env node

const bannedStrings = require("./bannedStrings");
const async = require("async");
const fs = require("fs");
const fsPromises = fs.promises;
const keyword_extractor = require("keyword-extractor");

function filenameify(basePath, directorySlugs) {
  return directorySlugs.map((slug) => `${basePath}${slug}/index.md`);
}

function wordsQuantitiesReducer(accumulator, currentWord, i) {
  let newAccumulator = accumulator;
  if (i === 0) {
    newAccumulator = [{ string: currentWord, quantity: 1 }];
    return newAccumulator;
  }
  let increment = false;
  let index = undefined;
  newAccumulator.forEach((wordQuantity, i) => {
    if (wordQuantity.string === currentWord) {
      increment = true;
      index = i;
      return;
    }
  });
  if (increment) {
    newAccumulator[index].quantity++;
    return newAccumulator;
  }
  return [...newAccumulator, { string: currentWord, quantity: 1 }];
}

function wordsQuantitiesReducerWithInitialEntry(accumulator, currentWord) {
  let newAccumulator = accumulator;
  let increment = false;
  let index = undefined;
  newAccumulator.forEach((wordQuantity, i) => {
    if (wordQuantity.string === currentWord) {
      increment = true;
      index = i;
      return;
    }
  });
  if (increment) {
    newAccumulator[index].quantity++;
    return newAccumulator;
  }
  return [...newAccumulator, { string: currentWord, quantity: 1 }];
}

function wordsQuantitiesArrayReducer(accumulator, currentWordsQuanties, i) {
  let newAccumulator = accumulator;
  if (i === 0) {
    newAccumulator = currentWordsQuanties;
    return newAccumulator;
  }
  // So now we need to take each wordQuantity and look for it in the accumulator
  // and either bump one up or tack it on
}

function sanitize(array, bannedStrings) {
  return array.map((word) => {
    let newWord = word;
    bannedStrings.forEach((bannedString) => {
      if (newWord.includes(bannedString)) {
        newWord = newWord.replace(bannedString, "");
      }
    });
    return newWord;
  });
}

function sluggify(contents) {
  return contents.filter((text) => text !== ".DS_Store");
}

async function init() {
  const blogPostsFolder = "../../projects/gareth/gfcom/content/blog/";
  const blogPostsAllFiles = await fsPromises.readdir(blogPostsFolder);
  const blogPostsSlugs = sluggify(blogPostsAllFiles);
  const blogPostFilenames = filenameify(blogPostsFolder, blogPostsSlugs);
  let test = false;
  let wordsQuantitiesArray = [];
  async.eachSeries(
    blogPostFilenames,
    function (filename, cb) {
      fs.readFile(filename, "utf8", function (err, fileContents) {
        if (!err) {
          const TITLE_FIRST_CHAR_INDEX = 11;
          const newlineTwoIndex = fileContents.indexOf("\n", 4);
          const fileTitle = fileContents.slice(
            TITLE_FIRST_CHAR_INDEX,
            newlineTwoIndex
          );
          const fileDescriptionStart = fileContents.indexOf("description") + 14;
          const fileDescriptionEnd = fileContents.indexOf(
            '"',
            fileDescriptionStart
          );
          const fileDescription = fileContents.slice(
            fileDescriptionStart,
            fileDescriptionEnd
          );
          const fileBodyStart = fileContents.indexOf(
            "\n",
            fileDescriptionEnd + 2
          );
          const fileBody = fileContents.slice(
            fileBodyStart + 1,
            fileContents.length
          );
          const fileTargetText = sanitize(
            [
              ...fileTitle.split(" "),
              ...fileDescription.split(" "),
              ...fileBody.split(" "),
            ],
            bannedStrings
          ).filter((word) => word !== "");
          const fileTargetTextSansStops = keyword_extractor.extract(
            fileTargetText.join(" "),
            {
              language: "english",
              remove_digits: true,
              return_changed_case: true,
              remove_duplicates: false,
            }
          );
          const fileWordsQuantities = fileTargetTextSansStops.reduce(
            wordsQuantitiesReducer,
            null
          );
          wordsQuantitiesArray.push(fileWordsQuantities);
          // * End of iterator function
        }
        cb(err);
      });
    },
    function (err) {
      if (err) {
        console.error(err);
      } else {
        const wordsQuantities = wordsQuantitiesArray.reduce(
          wordsQuantitiesArrayReducer,
          []
        );
        test = true;
        console.log(
          wordsQuantitiesArray[0].sort((a, b) => b.quantity - a.quantity)
        );
        // .sort, .topTen, .file, all that stuff
      }
    }
  );
  console.log(test);
}

init().catch(console.error);
