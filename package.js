#!/usr/local/bin/node

const { inlineSource } = require("inline-source");
const fs = require("fs");
const path = require("path");
const htmlpath = path.resolve("./index.html");

inlineSource(htmlpath, {
  compress: true,
  attribute: false,
  // Skip all css types and png formats
  ignore: ["png", "ico"],
})
  .then((html) => {
    fs.writeFileSync("./build/index.html", html);
  })
  .catch((err) => {
    console.log(err);
    exit(1);
  });
