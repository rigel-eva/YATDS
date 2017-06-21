
//First let's go ahead and and remove any extranious paths
$("svg").children().remove()
//Then let's go ahead and grab the paths from the file, and just put it in the svg!
$.get( "./enemyPath.svg",function(data){
  $("svg").append($(data).find("path"))
})
