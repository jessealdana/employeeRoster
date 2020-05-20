// This file was modeled on the htmlRenderer file and renders a style.css file after the application is run
const path = require("path");
const fs = require("fs");

// This path calls back to the templates directory so that the styles can access the appropriate classes and ids
const templatesDir = path.resolve(__dirname, "../templates");

const renderCSS = function() {
    return  fs.readFileSync(path.resolve(templatesDir, "style.css"), "utf8");

  };

  module.exports = renderCSS;