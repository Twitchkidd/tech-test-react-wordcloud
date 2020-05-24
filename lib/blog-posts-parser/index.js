const bannedStrings = require("./bannedStrings");
const async = require("async");
const fs = require("fs");
const fsPromises = fs.promises;
const keyword_extractor = require("keyword-extractor");

const filenameify = (basePath, folderNames) =>
  folderNames.map((name) => `${basePath}${name}/index.md`);

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

function wordQuantityReducer(accumulator, currentWord, i) {
  let newAccumulator = accumulator;
  if (i === 0) {
    newAccumulator = [{ text: currentWord, value: 1 }];
    return newAccumulator;
  }
  let increment = false;
  let index = undefined;
  newAccumulator.forEach((wordQuantity, i) => {
    if (wordQuantity.text === currentWord) {
      increment = true;
      index = i;
      return;
    }
  });
  if (increment) {
    newAccumulator[index].value++;
    return newAccumulator;
  }
  return [...newAccumulator, { text: currentWord, value: 1 }];
}

async function init() {
  const postsFolder = "../../projects/gareth/gfcom/content/blog/";
  const allFolderFilenames = await fsPromises.readdir(postsFolder);
  const allFolderNames = allFolderFilenames.filter(
    (entry) => entry !== ".DS_Store"
  );
  const filenames = filenameify(postsFolder, allFolderNames);
  let words = [];
  async.eachSeries(
    filenames,
    (filename, cb) => {
      fs.readFile(filename, "utf8", (err, contents) => {
        if (!err) {
          const titleStart = 11;
          const secondNewline = contents.indexOf("\n", 4);
          const title = contents.slice(titleStart, secondNewline);
          const descriptionStart = contents.indexOf("description") + 14;
          const descriptionEnd = contents.indexOf('"', descriptionStart);
          const description = contents.slice(descriptionStart, descriptionEnd);
          const bodyStart = contents.indexOf("\n", descriptionEnd + 2);
          const body = contents.slice(bodyStart + 1, contents.length);
          const text = sanitize(
            [
              ...title.split(" "),
              ...description.split(" "),
              ...body.split(" "),
            ],
            bannedStrings
          ).filter((word) => word !== "");
          const targetText = keyword_extractor.extract(text.join(" "), {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: false,
          });
          words = [...words, ...targetText];
        }
        cb(err);
      });
    },
    function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Hooray!");
      }
    }
  );
  setTimeout(() => {
    const quantities = words.reduce(wordQuantityReducer, []);
    const quantitiesDescending = quantities.sort((a, b) => b.value - a.value);
    const top = (num) => quantitiesDescending.slice(0, num);
    console.log(top(72));
  }, 200);
}

init().catch(console.error);
