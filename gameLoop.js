var sm;           //Our State machine
var c;            //Our Base Canvas
var canvasContext;//Canvas Context
function init(){
  //Setting up our canvas
  c=document.getElementsByTagName("canvas")[0]
  canvasContext=c.getContext("2d")
  redrawScreen()
  //Next up, setting up our state machine
  sm=new stateMachine();
  //Any other things we need to do goes below
  var img=new Image();
  img.src="./Player_Ship_Standin.png";
  img.onload = function() {
    canvasContext.drawImage(img, 20,20);
  }
}
function redrawScreen(){
  canvasContext.fillStyle="#000000";
  canvasContext.fillRect(0,0,parseInt(c.getAttribute("width")), parseInt(c.getAttribute("height")))
}
