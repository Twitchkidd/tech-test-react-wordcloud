#!/usr/bin/env node

const bannedStrings = require("./bannedStrings");
const async = require("async");
const fs = require("fs");
const fsPromises = fs.promises;
const keyword_extractor = require("keyword-extractor");
