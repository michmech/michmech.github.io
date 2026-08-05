$(document).ready(function(){

  //prevent insightly jump-up or jump-down of page content after lingo change:
  var height=$("#bio div.blurb div.version:visible").outerHeight(true);
  $("#bio div.blurb").css("min-height", height+"px");

  //language change:
  $("#bio h1.name span.lingo").on("click", function(e){
    var $lingo=$(e.delegateTarget);
    var lang=$lingo.attr("lang");
    //update language changed ovals:
    $("#bio h1.name span.lingo").removeClass("current");
    $("#bio h1.name span.lingo[lang='"+lang+"']").addClass("current");
    //show/hide blurb:
    $("#bio div.blurb div.version").hide();
    $("#bio div.blurb div.version[lang='"+lang+"']").fadeIn();
    //show/hide titles:
    $("h2.overvanity").hide();
    $("h2.overpubs").hide();
    $("h2.overvanity[lang='"+lang+"']").fadeIn();
    $("h2.overpubs[lang='"+lang+"']").fadeIn();
    //show/hide vanity titles and subtitles:
    $("div.vanity span[lang]").hide();
    $("div.vanity span[lang='"+lang+"']").fadeIn();
  });

});
