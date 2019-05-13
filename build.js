const markdown=require("markdown").markdown; //https://www.npmjs.com/package/markdown
const fs=require("fs");

buildIndex();

function buildIndex(){
  var message=fs.readFileSync("./index.md", "utf8").trim();
  var html=fs.readFileSync("./index.html", "utf8");
  html=html.replace(/(<!--begin message-->).*(<!--end message-->)/s, function(m, $1, $2){ return $1+message+$2; });
  fs.writeFileSync("./index.html", html, "utf8");
}
