#!/usr/bin/env node

const getInput = require('./get-input');
const check = require('./check');

const PATH = getInput('PATH') || '.';
const IGNORE_PACKAGES = getInput('IGNORE_PACKAGES') || [];
const IGNORE_FILES = getInput('IGNORE_FILES') || [];

const main = async () => {
  const options = {
    ignoreMatches: IGNORE_PACKAGES,
    ignoreFiles: IGNORE_FILES,
  };

  try {
    await check(PATH, options);
  } catch(e) {
    console.log(e && e.message);
    process.exit(1);
  }

  console.log(
    '\x1b[42m\x1b[30m%s\x1b[0m',
    ' DONE: ',
    '\x1b[32m',
    'All dependencies are set correctly',
    '\x1b[0m',
  );
};

main();
