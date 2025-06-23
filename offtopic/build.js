const md=require('markdown-it')({html: true});
const attrs=require('markdown-it-attrs'); md.use(attrs);
const deflist=require('markdown-it-deflist'); md.use(deflist);
const fs=require("fs");
const path=require("path");

const isDirectory=source => fs.lstatSync(source).isDirectory();
const getDirectories=source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

buildIndex();

function buildIndex(){
    var years={};
    addArts(years);
    var body=`<div class='years'>`;
    var yearsOrdered=[]; for(var year in years) yearsOrdered.push(year); yearsOrdered.sort();
    for(var i=yearsOrdered.length-1; i>-1; i--){
        var year=yearsOrdered[i];
        body+=`<div class="year">`;
        body+=`<h3>${year}</h3>`;
        years[year].pubs.map(pub => { body+=pub; });
        if(years[year].arts.length>0){
            body+=`<div class="arts">`;
            years[year].arts.map(art => { body+=art; });
            body+=`</div>`;
        }
        body+=`</div>`;
    }
    body+=`</div>`;
    var html=fs.readFileSync("./index.html", "utf8").replace(/\r/g, "");
    html=html.replace(/(<!--begin body-->\n).*(<!--end body-->)/s, function(m, $1, $2){ return $1+body+$2; });
    fs.writeFileSync("./index.html", html, "utf8");
}

function addArts(years){
    getDirectories("./").map(dir => {
        if(dir!="zzz" && dir!="offtopic" && fs.existsSync("./"+dir+"/index.md")){
            var metadata=buildArticle(dir);
            if(metadata.published){
                var year=metadata.published.substring(0, 4);
                var html=`<div class="item article">`;
                html+=`<a href="./${dir}/" class="image" style="background-image: url(${dir}/${metadata.image})"></a>`;
                if(metadata.rubric) html+=`<div class="rubric"><span>${metadata.rubric}</span></div>`;
                if(metadata.originalAuthor) {
                  html+=`<h3 class="title"><a href="./${dir}/"><span class="inside">${metadata.title}</span> <span class="originalAuthor">${metadata.originalAuthor}</span></a></h3>`;
                } else {
                  html+=`<h3 class="title"><a href="./${dir}/">${metadata.title}</a></h3>`;
                }
                if(metadata.blurb) html+=`<div class="blurb">${metadata.blurb}</div>`;
                html+=`</div>`;
                if(!years[year]) years[year]={pubs: [], arts: []};
                years[year].arts.push(html);
            }
        }
    });
}

function buildArticle(dir){
    var raw=fs.readFileSync(dir+"/index.md", "utf8").replace(/\r/g, "");
    var metadata={};
    raw=raw.replace(/^(.*?)\n---\n/s, function(m, $1){
        $1.split("\n").map(line => {
            line.replace(/^([^:]+): (.*)$/, function(m, $1, $2){
                metadata[$1]=htmlEncode($2);
            });
        });
        return "";
    });
    var body=`<div class="markdown" lang="${metadata.lang}">`+doMarkdown(raw)+"</div>\n";
    if(metadata.rubric){
      body = `<div class="rubric"><span>${metadata.rubric}</span></div>\n`+body;
    }
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
    if(metadata.image){
        metatags+=`<meta property="og:image" content="http://www.lexiconista.com/offtopic/${dir}/${metadata.image}" />\n`;
    }
    body = body.replace(/<a href="http/g, "<a target=\"_blank\" href=\"http");
    var html=fs.readFileSync("./zzz/index.html", "utf8").replace(/\r/g, "");
    html=html.replace(/(<!--begin metatags-->\n).*(<!--end metatags-->)/s, function(m, $1, $2){ return $1+metatags+$2; });
    html=html.replace(/(<!--begin body-->\n).*(<!--end body-->)/s, function(m, $1, $2){ return $1+body+$2; });
    if(metadata.published){
        html=html.replace(/(<!--begin date-->).*(<!--end date-->)/, function(m, $1, $2){ return $1+metadata.published+$2; });
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
