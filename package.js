#!/usr/local/bin/node

const { inlineSource } = require("inline-source");
const fs = require("fs");
const path = require("path");
const htmlpath = path.resolve("./out/index.html");

inlineSource(htmlpath, {
  compress: true,
  attribute: false,
  rootpath: process.cwd() + "/out",
  // Skip all css types and png formats
  ignore: ["png", "ico"],
})
  .then((html) => {
    fs.writeFileSync("./out/packaged.html", html);
  })
  .catch((err) => {
    console.log(err);
    exit(1);
  });
