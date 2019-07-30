"use strict";
const runAll = require("npm-run-all");

runAll(["build:dev", "upload:watch"], {
  parallel: true,
  stdout: process.stdout,
  stdin: process.stdin
}).catch(({ results }) => {
  console.log(results)
  results
    .filter(({ code }) => code)
    .forEach(({ name }) => {
      console.log(`"npm run ${name}" failed`);
    });
});
