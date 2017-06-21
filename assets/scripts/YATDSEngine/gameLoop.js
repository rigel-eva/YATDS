/*jslint indent: false, asi:true*/
var sm;           //Our State machine
var c;            //Our Base Canvas
var width;        //width of our canvas
var height;       //height of our canvas
var canvasContext;//Canvas Context
var stars;        //our stars
var ship;         //The Player Ship
var img;          //Image
var enemies;
var iv;
var tickNum;
var spawns;
var stopAnimating=false
function loadPaths(file){
  //First let's go ahead and and remove any extranious paths
  $("svg").children().remove()
  //Then let's go ahead and grab the paths from the file, and just put it in the svg!
  $.get(file,function(data){
    $("svg").append($(data).find("path"))
  })
}
function init(){
  //Setting up our canvas
  console.log("Preping Canvas")
  c=document.getElementsByTagName("canvas")[0]
  canvasContext=c.getContext("2d")
  //Getting our canvas width & height
  console.log("Fetching Widths and height")
  width=parseInt(c.getAttribute("width"))
  height=parseInt(c.getAttribute("height"))
  //Next up, setting up our state machine
  console.log("Shattering Splines")
  sm=new stateMachine();
  //Setting our tick count
  tickNum=0;
  //setting up our game objects
  console.log("Making Starfield")
  stars=new starfield(width, height)
  console.log(stars)
  //Spawning our Player
  console.log("Assembling Ship")
  var img=document.getElementById("player")
  ship=new playerShip(sm,width,height,img)
  //Setting up our enemies
  enemies=new enemyHandler();
  spawns=[]
  iv=window.setInterval(step,5)
  redrawScreen()
  $.getScript("assets/scripts/levels/level0.js")
}
function isFunction(functionToCheck) {//Taken from: https://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
function step(){//Handles steping our state
  //First, let's check to see if either our guy is hit, or an enemy is height
  for(var i=0; i<ship.shotsFired.length;i++){
    for(var j=0; j<enemies.enemies.length;j++){
      enemies.enemies[j].hit(ship.shotsFired[i].xPos,ship.shotsFired[i].yPos)
      if(enemies.enemies[j].dead()){//Ok if the current enemy we are checking is dead
        enemies.enemies.splice(j,1);//Remove the Enemy
        ship.shotsFired.splice(i,1);//And the bullet
        break;
      }
    }
  }
  //Next let's step our enemies, and our ship
  enemies.step()
  ship.step()
  //Then we are going to execute anything in spawns
  if(isFunction(spawns[tickNum])){
    spawns[tickNum]();
  }
  //Finally, we are going to increment our tick count
  tickNum++;
}
function stop(){
  clearInterval(iv)
  iv=false
  stopAnimating=true
}
function start(){
  stopAnimating=false
  redrawScreen()
}
function redrawScreen(){
  //console.log("Redrawed!")
  //Doing a basic screen clear
  canvasContext.fillStyle="#000000";
  canvasContext.fillRect(0,0,width, height)
  //Drawing our stuff
  stars.draw(canvasContext)
  enemies.draw(canvasContext)
  ship.draw(canvasContext)
  if(!stopAnimating){
    window.requestAnimationFrame(redrawScreen)
    if(!iv){
      iv=window.setInterval(step,10)
    }
  }
}
