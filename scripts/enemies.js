/*jslint indent: false, asi:true*/
/*jshint esversion: 6*/
//Ok, Going to be lazy with the Bezier curves and just import a library
import * as bezier from './bezier.js'
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
    this.move = .5
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
class parametricEnemy extends basicEnemy{
  constructor(xPos,yPos,xFunc,yFunc,stepMultiplyer,img){
    super(xPos,yPos)
    this.width=20
    this.height=20
    this.stepMultiplyer=stepMultiplyer
    this.xFunc=xFunc
    this.yFunc=yFunc
    this.tick=0
    this.img=img
  }
  step(){
    this.tick++
    this.xPos=this.xFunc(this.tick*this.stepMultiplyer)
    this.yPos=this.yFunc(this.tick*this.stepMultiplyer)
  }
  draw(canvasContext){
    if(!this.img){
      canvasContext.fillStyle="#7f7f00"
      canvasContext.fillRect(this.xPos,this.yPos,this.width,this.height)
    }else{
      canvasContext.drawImage(this.img,this.xPos,this.yPos)
    }
  }
  hit(xPos,yPos){
    super.hit(xPos,yPos)
  }
  dead(){
    return this.shot||this.yPos>height
  }
}
class beizerEnemy extends parametricEnemy{
  constructor(curveData,stepMultiplyer,img){
    var curveData="M10 10 C 20 20, 40 20, 50 10"
    //Ok, I think we can reasonably assume that the first part of our data is going to be a moveto, and the second part is going to be the actual curve
    curveData=curveData.toUpperCase().split("C")
    var xPos=curveData[0].split("M").
    var xBeizer=function(tick){

    }
    var yBeizer=function(tick){

    }
    super(xPos,yPos,,,stepMultiplyer,img)
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
