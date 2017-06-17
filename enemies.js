/*jslint indent: false, asi:true*/
/*jshint esversion: 6*/

class enemy{
  constructor(xPos,yPos){
    this.xPos = xPos
    this.yPos = yPos
  }
  step(){
    // Do standard steping stuff
  }
  draw(){

  }
  checkHurt(xPos,yPos){

  }
  requestShot(){
    return false;
  }
  hit(xPos, yPos){

  }
  dead(){
    return true;
  }
}
class basicEnemy extends enemy{
  // Just making a basic enemy who moves from left to right down the screen
  constructor(xPos,yPos){
    super(xPos,yPos)
    this.width = 40
    this.height = 40
    this.move = 1
    this.shot=false
  }
  step () {
    this.xPos += this.move
      if (this.xPos + this.width > 640 || this.xPos < 0) {
        this.yPos += 40
        this.move = this.move * -1
        this.xPos+=this.move
      }
  }
  draw(canvasContext){
    canvasContext.fillStyle="#FF0000"
    canvasContext.fillRect(this.xPos,this.yPos,this.width,this.height)
  }
  hit(xPos, yPos){
    if(yPos>=this.yPos&&
      yPos<this.yPos+this.height&&
      xPos>=this.xPos&&
      xPos<this.xPos+this.width){
      this.shot=true
    }
  }
  dead(){
    return this.shot||this.yPos>height
  }
}
class enemyHandler{
  constructor(){
    this.enemies=[]
  }
  step(){
    for(var i=0; i<this.enemies.length;i++){
      this.enemies[i].step()
    }
  }
  draw(canvasContext){
    for(var i=0; i<this.enemies.length; i++){
      if(this.enemies[i].dead()){
        this.enemies.splice(i,1)
        i--;
        continue;
      }
      this.enemies[i].draw(canvasContext)
    }
  }
}
