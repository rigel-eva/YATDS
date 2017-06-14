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
var stopAnimating=false
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
  //setting up our game objects
  console.log("Making Starfield")
  stars=new starfield(width, height)
  console.log(stars)
  //Any other things we need to do goes below
  var img=new Image();
  enemies=new enemyHandler();
  img.src="./Player_Ship_Standin.png";
  /*img.onload = function() {
    console.log("Assembling Ship")
    ship=new playerShip(sm,width,height,img)
    redrawScreen()
  }//*/
  redrawScreen()
  window.setInterval(step,10)
}
function step(){//Handles steping our state
  enemies.step()
  //ship.step()
}
function redrawScreen(){
  //console.log("Redrawed!")
  //Doing a basic screen clear
  canvasContext.fillStyle="#000000";
  canvasContext.fillRect(0,0,width, height)
  //Drawing our stuff
  stars.draw(canvasContext)
  enemies.draw(canvasContext)
  //ship.draw(canvasContext)
  if(!stopAnimating){
    window.requestAnimationFrame(redrawScreen)
  }
}
