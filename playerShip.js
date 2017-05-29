class playerShip{
  constructor(stateMachine,cWidth,cHeight,sprite){
    this.stateMachine=stateMachine;
    this.width=width;
    this.height=height;
    this.sprite=sprite
    this.x=0;
    this.y=this.width/2
  }
  draw(canvasContext){
    //First, let's get the state of the state machine, and determine how we should update
    //Then, let's actually render our ship
    canvasContext.drawImage(this.sprite,this.x,this.y)
  }
}
Console.log("boop!")
