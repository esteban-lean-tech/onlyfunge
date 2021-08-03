#!/usr/local/bin/node

const { inlineSource } = require("inline-source");
const fs = require("fs");
const path = require("path");
<<<<<<< HEAD
const htmlpath = path.resolve("./out/index.html");
=======
const htmlpath = path.resolve("./index.html");
>>>>>>> wip

inlineSource(htmlpath, {
  compress: true,
  attribute: false,
<<<<<<< HEAD
  rootpath: process.cwd() + "/out",
=======
>>>>>>> wip
  // Skip all css types and png formats
  ignore: ["png", "ico"],
})
  .then((html) => {
<<<<<<< HEAD
    fs.writeFileSync("./out/packaged.html", html);
=======
    fs.writeFileSync("./build/index.html", html);
>>>>>>> wip
  })
  .catch((err) => {
    console.log(err);
    exit(1);
  });
