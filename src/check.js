const depcheck = require('depcheck');
const path = require('path');

async function check(projectPath, options) {
  const fullPath = path.join(__dirname, projectPath);
  const ignoreFiles = new RegExp(
    options.ignoreFiles.join('|'),
  );

  return depcheck(fullPath, options, (data) => {
    const critical = [];

    for (const name in data.missing) {
      if (data.missing.hasOwnProperty(name)) {
        const files = data.missing[name]
          .filter((filePath) => !options.ignoreFiles.length || !(ignoreFiles.test(filePath)))
          .map((filePath) => filePath.replace(fullPath, ''));

        if (files.length > 0) {
          critical.push({ name, files });
        }
      }
    }

    critical.forEach(({ name, files }) => {
      console.log(
        '\n\x1b[41m\x1b[37m%s\x1b[0m',
        ' Error: ',
        '\x1b[31m',
        `Dependency "${name}" should be in "${path.join(projectPath, '/package.json')}", because it is used in:`,
        '\x1b[0m',
      );
      files.forEach((filePath) => {
        console.log(
          `   - ${filePath}`,
        );
      });
    });

    if (critical.length) {
      process.exit(1);
    }
  }).catch(() => {
    process.exit(1);
  });
}

module.exports = check;
