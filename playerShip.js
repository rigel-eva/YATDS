class playerShip{
  constructor(stateMachine,cWidth,cHeight,sprite){
    this.stateMachine=stateMachine;
    this.cWidth=cWidth;
    this.cHeight=cHeight;
    this.sprite=sprite
    this.x=this.cWidth/2-this.sprite.width/2;
    this.y=this.cHeight/6*5
  }
  step(){
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
  }
  draw(canvasContext){
    //Then, let's actually render our ship
    canvasContext.drawImage(this.sprite,this.x,this.y)
  }
  checkHurt(xPos,yPos){
    return xPos>=this.xPos&&xPos<=this.width+this.xPos&&yPos>=this.yPos&&yPos<=this.yPos+this.height
  }
}
