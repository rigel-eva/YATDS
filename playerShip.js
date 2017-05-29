class playerShip{
  constructor(stateMachine,cWidth,cHeight,sprite){
    this.stateMachine=stateMachine;
    this.cWidth=cWidth;
    this.cHeight=cHeight;
    this.sprite=sprite
    this.x=this.cWidth/2-this.sprite.width/2;
    this.y=this.cWidth/2//Technicly this works for now ... though I would like to change it ...
  }
  draw(canvasContext){
    //First, let's get the state of the state machine, and determine how we should update
    if(this.stateMachine.up){
      if(this.y>0){
          this.y-=1
      }
    }else if(this.stateMachine.down){
      if(this.y+this.sprite.height<this.cHeight){
          this.y+=1
      }
    }
    if(this.stateMachine.right){
      if(this.x+this.sprite.width<this.cWidth){
        this.x+=1
      }
    }else if(this.stateMachine.left){
      if(this.x>0){
        this.x-=1
      }
    }
    //Then, let's actually render our ship
    canvasContext.drawImage(this.sprite,this.x,this.y)
  }
}
Console.log("boop!")
