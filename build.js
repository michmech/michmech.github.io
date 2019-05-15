const md=require('markdown-it')({html: true}); //https://www.npmjs.com/package/markdown-it
const attrs=require('markdown-it-attrs'); md.use(attrs); //https://www.npmjs.com/package/markdown-it-attrs
const fs=require("fs");
const path=require("path");

const isDirectory=source => fs.lstatSync(source).isDirectory();
const getDirectories=source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

buildIndex();

function buildIndex(){
  var years={};
  addPubs(years);
  addArts(years);
  var body=`<div class='years'>`;
  var yearsOrdered=[]; for(var year in years) yearsOrdered.push(year); yearsOrdered.sort(false);
  for(var i=yearsOrdered.length-1; i>-1; i--){
    var year=yearsOrdered[i];
    body+=`<div class="year">`;
    body+=`<h2>${year}</h2>`;
    years[year].pubs.map(pub => { body+=pub; });
    if(years[year].arts.length>0){
      body+=`<div class="boxtitle"><span>BLOG</span></div>`;
      body+=`<div class="arts">`;
      years[year].arts.map(art => { body+=art; });
      body+=`</div>`;
    }
    body+=`</div>`;
  }
  body+=`</div>`;
  var html=fs.readFileSync("./index.html", "utf8");
  html=html.replace(/(<!--begin body-->\n).*(<!--end body-->)/s, function(m, $1, $2){ return $1+body+$2; });
  fs.writeFileSync("./index.html", html, "utf8");
}

function addPubs(years){
  var pubs=JSON.parse(fs.readFileSync("./My publications.json", "utf8")); //exported from Zotero as "CSL JSON"
  pubs.map(pub => {
    var year=pub.issued["date-parts"][0][0];
    var html=`<div class="item">`;
    html+=`<div class="tagline">`;
      if(pub.type=="book") html+=`<span class="type">BOOK</span>`;
      else if(pub.type=="paper-conference") html+=`<span class="type">CONFERENCE PAPER</span>`;
      else if(pub.type=="speech") html+=`<span class="type">TALK</span>`;
      else if(pub.type=="article-magazine") html+=`<span class="type">MAGAZINE ARTICLE</span>`;
      else if(pub.type=="manuscript") html+=`<span class="type">MANUSCRIPT</span>`;
      else if(pub.type=="report") html+=`<span class="type">REPORT</span>`;
      else if(pub.type=="thesis") html+=`<span class="type">DISSERTATION</span>`;
      //else console.log(pub.type);
      html+=printCoauthors(pub);
    html+=`</div>`;
    if(pub.URL){
      html+=`<h3 class="title"><a href="${pub.URL}">${pub.title}</a>&nbsp;<a class="biblink" href="${pub.id}">BIB</a></h3>`;
    } else {
      html+=`<h3 class="title">${pub.title}&nbsp;<a class="biblink" href="${pub.id}">BIB</a></h3>`;
    }
    var data=``;
    if(pub["event"]){
      data+=`<div><span class='intro'>EVENT</span> `;
      data+=`${pub["event"]}`;
      if(pub["event-place"]) data+=`, ${pub["event-place"]}`;
      data+=`</div>`;
    }
    if(pub["container-title"]){
      data+=`<div><span class='intro'>PUBLISHED IN</span> `;
      data+=`${pub["container-title"]}`;
      data+=`</div>`;
    }
    if(pub["publisher"]){
      data+=`<div><span class='intro'>PUBLISHER</span> `;
      data+=`${pub["publisher"]}`;
      if(pub["publisher-place"]) data+=`, ${pub["publisher-place"]}`;
      data+=`</div>`;
    }
    if(pub["ISBN"]){
      data+=`<div><span class='intro'>ISBN</span> `;
      data+=`${pub["ISBN"]}`;
      data+=`</div>`;
    }
    if(data!="") html+=`<div class="data">${data}</div>`;
    if(pub.abstract) html+=`<div class="blurb">${pub.abstract}</div>`;
    html+=`</div>`;
    if(!years[year]) years[year]={pubs: [], arts: []};
    years[year].pubs.push(html);
  });
}
function printCoauthors(pub){
  var names=[];
  pub.author.map(auth => {
    if(auth.family && auth.given){
      if(auth.family!="Měchura") names.push(auth.given+" "+auth.family);
    }
  });
  var ret="";
  if(names.length>0){
    ret+=` <span class="coauthors">with`;
    for(var i=0; i<names.length; i++) {
      if(i>0 && i<names.length-1) ret+=","; else if(names.length>1 && i==names.length-1) ret+=" and";
      ret+=" "+names[i];
    }
    ret+=` </span>`;
  }
  return ret;
}

function addArts(years){
  getDirectories("./").map(dir => {
    if(dir!="zzz" && fs.existsSync("./"+dir+"/index.md")){
      var metadata=buildArticle(dir);
      if(metadata.published){
        var year=metadata.published.substring(0, 4);
        var html=`<div class="item article">`;
        html+=`<h3 class="title"><a href="./${dir}/">${metadata.title}&nbsp;»</a></h3>`;
        if(metadata.blurb) html+=`<div class="blurb">${metadata.blurb}</div>`;
        html+=`</div>`;
        if(!years[year]) years[year]={pubs: [], arts: []};
        years[year].arts.push(html);
      }
    }
  });
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
  var html=fs.readFileSync("./zzz/index.html", "utf8");
  html=html.replace(/(<!--begin metatags-->\n).*(<!--end metatags-->)/s, function(m, $1, $2){ return $1+metatags+$2; });
  html=html.replace(/(<!--begin body-->\n).*(<!--end body-->)/s, function(m, $1, $2){ return $1+body+$2; });
  if(metadata.published){
    html=html.replace(/(<!--begin date-->).*(<!--end date-->)/, function(m, $1, $2){ return $1+metadata.published+", "+$2; });
  }
  if(metadata.myrole){
    html=html.replace(/(<!--begin myrole-->).*(<!--end myrole-->)/, function(m, $1, $2){ return $1+metadata.myrole+$2; });
  }
  fs.writeFileSync(dir+"/index.html", html, "utf8");
  return metadata;
}
function doMarkdown(str){
  //markup images in my own way:
  str=str.replace(/\!\[([^\]]*)\]\(([^\)]+)\)\s*(\{\.(([^\}]+))\})?/g, function(m, caption, filename, x, className){
    return `<figure class="${className}"><div><img src="${filename}" alt=""></div><figcaption>${caption}</figcaption></figure>\n\n`;
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
