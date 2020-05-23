  /*
  const blogPostsReducer = (accumulator, currentBlogPostFilename, i) => {
    let newAccumulator = accumulator;
    const fileContents = await fsPromises.readFile(
      currentBlogPostFilename,
      "utf8"
    );
    const TITLE_FIRST_CHAR_INDEX = 11;
    const newlineTwoIndex = fileContents.indexOf("\n", 4);
    const fileTitle = fileContents.slice(
      TITLE_FIRST_CHAR_INDEX,
      newlineTwoIndex
    );
    const fileDescriptionStart = fileContents.indexOf("description") + 14;
    const fileDescriptionEnd = fileContents.indexOf('"', fileDescriptionStart);
    const fileDescription = fileContents.slice(
      fileDescriptionStart,
      fileDescriptionEnd
    );
    const fileBodyStart = fileContents.indexOf("\n", fileDescriptionEnd + 2);
    const fileBody = fileContents.slice(fileBodyStart + 1, fileContents.length);
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
    const fileWordsQuantitiesReducer = (accumulator, currentWord, i) => {
      let newAccumulator = accumulator;
      if (i === 0) {
        newAccumulator = [{ string: currentWord, quantity: 1 }];
        return newAccumulator;
      }
      let action = "";
      let index = undefined;
      newAccumulator.forEach((wordQuantity, i) => {
        if (wordQuantity.string === currentWord) {
          action = "increment";
          index = i;
          return;
        }
      });
      if (action === "increment") {
        newAccumulator[index].quantity++;
        return newAccumulator;
      }
      return [...newAccumulator, { string: currentWord, quantity: 1 }];
    };
    const fileWordsQuantities = currentBlogPostFilename.reduce(
      fileWordsQuantitiesReducer,
      null
    );
    if (i === 0) {
      return fileWordsQuantities;
    }
    /*
      Else, how do we take [{string: "hey", quantity: 3}, {string: "ho", quantity: 2}] and merge it with [{string: "hey", quantity: 1}, {string: "ho", quantity: 2}, {string: "ayy!", quantity: 1}]?
    */
  };
  // const wordQuantities = blogPostFilenames.reduce(blogPostsReducer, null);
  //////////////////////////////////////////////////////////////////////////////
  /*
  const firstFileContents = await fsPromises.readFile(
    blogPostFilenames[0],
    "utf8"
  );
  const TITLE_FIRST_CHAR_INDEX = 11;
  const newlineTwoIndex = firstFileContents.indexOf("\n", 4);
  const firstFileTitle = firstFileContents.slice(
    TITLE_FIRST_CHAR_INDEX,
    newlineTwoIndex
  );
  const firstFileDescriptionStart =
    firstFileContents.indexOf("description") + 14;
  const firstFileDescriptionEnd = firstFileContents.indexOf(
    '"',
    firstFileDescriptionStart
  );
  const firstFileDescription = firstFileContents.slice(
    firstFileDescriptionStart,
    firstFileDescriptionEnd
  );
  const firstFileBodyStart = firstFileContents.indexOf(
    "\n",
    firstFileDescriptionEnd + 2
  );
  const firstFileBody = firstFileContents.slice(
    firstFileBodyStart + 1,
    firstFileContents.length
  );
  const bannedStrings = [
    "\n",
    ",",
    "...",
    "###",
    "##",
    "#",
    "{",
    "}",
    "(",
    ")",
    "[",
    "]",
    "`",
    "=",
    "?",
    "!",
    "<",
    ">",
    "_",
    "*",
    "///",
    "//",
  ];
  const firstFileTargetText = sanitize(
    [
      ...firstFileTitle.split(" "),
      ...firstFileDescription.split(" "),
      ...firstFileBody.split(" "),
    ],
    bannedStrings
  ).filter((word) => word !== "");
  const firstFileTargetTextSansStops = keyword_extractor.extract(
    firstFileTargetText.join(" "),
    {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    }
  );
//////////////////////////////////////////////////////////////////////////////
  const firstFileWordsQuantitiesReducer = (accumulator, currentWord, i) => {
    let newAccumulator = accumulator;
    if (i === 0) {
      newAccumulator = [{ string: currentWord, quantity: 1 }];
      return newAccumulator;
    }
    let action = "";
    let index = undefined;
    newAccumulator.forEach((wordQuantity, i) => {
      if (wordQuantity.string === currentWord) {
        action = "increment";
        index = i;
        return;
      }
    });
    if (action === "increment") {
      newAccumulator[index].quantity++;
      return newAccumulator;
    }
    return [...newAccumulator, { string: currentWord, quantity: 1 }];
  };
  const firstFileWordsQuantities = firstFileTargetTextSansStops
    .reduce(firstFileWordsQuantitiesReducer, null)
    .sort((a, b) => b.quantity - a.quantity);
  console.log(firstFileWordsQuantities)
  */
}

/*
  1) List of every file path to read

  Each blog post has a folder at ../../projects/gareth/gfcom/content/blog/:slug
  Every folder in ../../projects/gareth/gfcom/content/blog/ is a blog post
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
