const md=require('markdown-it')({html: true}); //https://www.npmjs.com/package/markdown-it
const attrs=require('markdown-it-attrs'); md.use(attrs); //https://www.npmjs.com/package/markdown-it-attrs
const fs=require("fs");

//buildIndex();
buildArticle("sample-article");
buildArticle("minority-languages-machine-translation");
buildArticle("retrodigitization");
buildArticle("sub-specie-aeternitatis");
buildArticle("tir-faoi-bhlath");
buildArticle("feabhas-ar-ghaeilge");
buildArticle("maru-na-muice");
buildArticle("support-don-ghaeilge");

function buildIndex(){
  var raw=fs.readFileSync("./index.md", "utf8");
  var body=doMarkdown(raw)+"\n";
  var html=fs.readFileSync("./index.html", "utf8");
  html=html.replace(/(<!--begin body-->\n).*(<!--end body-->)/s, function(m, $1, $2){ return $1+body+$2; });
  fs.writeFileSync("./index.html", html, "utf8");
}

function buildArticle(dir){
  var raw=fs.readFileSync(dir+"/index.md", "utf8");
  var metadata={};
  raw=raw.replace(/^(.*?)\n---\n/s, function(m, $1){
    $1.split("\n").map(line => {
      line.replace(/^([^:]+): (.*)$/, function(m, $1, $2){
        metadata[$1]=htmlEncode($2);
      });
    });
    return "";
  });
  var body=doMarkdown(raw)+"\n";
  var metatags="";
  if(metadata.title){
    metatags+=`<title>${metadata.title}</title>\n`;
    metatags+=`<meta itemprop="name" content="${metadata.title}"/>\n`;
    metatags+=`<meta name="og:title" content="${metadata.title}"/>\n`;
  }
  if(metadata.blurb){
    metatags+=`<meta name="description" content="${metadata.blurb}"/>\n`;
    metatags+=`<meta itemprop="description" content="${metadata.blurb}"/>\n`;
    metatags+=`<meta name="og:description" content="${metadata.blurb}"/>\n`;
  }
  if(metadata.author){
    metatags+=`<meta name="article:author" content="${metadata.author}"/>\n`;
  }
  if(metadata.published){
    metatags+=`<meta name="article:published_time" content="${metadata.published}"/>\n`;
  }
  if(metadata.modified){
    metatags+=`<meta name="article:modified_time" content="${metadata.modified}"/>\n`;
  }
  var html=fs.readFileSync("./sample-article/index.html", "utf8");
  html=html.replace(/(<!--begin metatags-->\n).*(<!--end metatags-->)/s, function(m, $1, $2){ return $1+metatags+$2; });
  html=html.replace(/(<!--begin body-->\n).*(<!--end body-->)/s, function(m, $1, $2){ return $1+body+$2; });
  fs.writeFileSync(dir+"/index.html", html, "utf8");
}

function doMarkdown(str){
  //markup images in my own way:
  str=str.replace(/\!\[([^\]]*)\]\(([^\)]+)\)\s*(\{\.(([^\}]+))\})?/g, function(m, caption, filename, x, className){
    return `<figure class="${className}"><img src="${filename}" alt=""><figcaption>${caption}</figcaption></figure>`;
  });
  //markdown to HTML:
  str=md.render(str);
  return str;
}

function htmlEncode(s){
  s=s.replace(/\</g, "&lt;");
  s=s.replace(/\>/g, "&gt;");
  s=s.replace(/\"/g, "&quot;");
  s=s.replace(/\'/g, "&apos;");
  return s;
}
