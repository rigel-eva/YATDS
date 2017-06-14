
/*jslint indent: false, asi:true*/
/*jshint esversion: 6*/
console.log("Enemy Loaded!")
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
}
class basicEnemy extends enemy{
  // Just making a basic enemy who moves from left to right down the screen
  constructor(xPos,yPos){
    super(xPos,yPos)
    this.width = 40
    this.height = 40
    this.move = 1
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
}
class enemyHandler{
  constructor(){
    this.enemies=[]
    this.enemies.push(new basicEnemy(0,0))
  }
  step(){
    for(var i=0; i<this.enemies.length;i++){
      this.enemies[i].step()
      if(this.enemies[i].yPos>height){
        //Do deletion stuff
      }
    }
  }
  draw(canvasContext){
    for(var i=0; i<this.enemies.length; i++){
      this.enemies[i].draw(canvasContext)
    }
  }
}
