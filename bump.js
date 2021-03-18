var pkg = require("./package.json");
var { execSync } = require("child_process");

var versions = JSON.parse(
  execSync(`npm show ${pkg.name} versions`).toString().replace(/'/g, '"')
);

if (versions[versions.length - 1] === pkg.version) {
  var results = execSync(`npm version patch`);
  console.log(results.toString());
}
