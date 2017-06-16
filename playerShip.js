class playerShip{
  constructor(stateMachine,cWidth,cHeight,sprite){
    this.stateMachine=stateMachine;
    this.cWidth=cWidth;
    this.cHeight=cHeight;
    this.sprite=sprite;
    this.x=this.cWidth/2-this.sprite.width/2;
    this.y=this.cHeight/6*5;
    this.shotsFired=[];
    this.shotLimiter=40
  }
  step(){
    if(this.stateMachine.up){
      if(this.y>0){
          this.y-=1;
      }
    }else if(this.stateMachine.down){
      if(this.y+this.sprite.height<this.cHeight){
          this.y+=1;
      }
    }
    if(this.stateMachine.right){
      if(this.x+this.sprite.width<this.cWidth){
        this.x+=1;
      }
    }else if(this.stateMachine.left){
      if(this.x>0){
        this.x-=1;
      }
    }
    if(this.stateMachine.fire&&this.shotLimiter>39){
      this.shotsFired.push(new playerBullet(this.x+(this.sprite.width/2),this.y-2));
      this.shotLimiter=0;
    }
    for(var i=0; i<this.shotsFired.length;i++){
      this.shotsFired[i].step();
    }
    this.shotLimiter++;
  }
  draw(canvasContext){
    //Then, let's actually render our ship
    canvasContext.drawImage(this.sprite,this.x,this.y);
    for(var i=0; i<this.shotsFired.length;i++){
      this.shotsFired[i].draw(canvasContext);
    }
  }
  checkHurt(xPos,yPos){
    return xPos>=this.xPos&&xPos<=this.width+this.xPos&&yPos>=this.yPos&&yPos<=this.yPos+this.height;
  }
}
class playerBullet{
  constructor(xPos, yPos){
    this.xPos=xPos;
    this.yPos=yPos;
  }
  step(){
    this.yPos-=2;
  }
  draw(canvasContext){
    canvasContext.beginPath();
    canvasContext.moveTo(this.xPos,this.yPos+10);
    canvasContext.lineTo(this.xPos,this.yPos);
    canvasContext.strokeStyle="green";
    canvasContext.lineWidth=5;
    canvasContext.stroke();
  }
}
