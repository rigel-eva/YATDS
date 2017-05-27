class starfield{

  constructor(width, height){
    this.width=width;
    this.height=height;
    this.starArray=[]
    for(var i=0;i<width*height;i++){
      this.starArray.push(false)
    }
  }
  draw(canvasContext){
    console.log(this.width+" "+this.height)
    var imageData=canvasContext.createImageData(this.width,this.height)
    //First: let's draw our array
    for(var i=0;i<this.starArray.length;i++){
      if(this.starArray[i]){
        //setting that pixel to white
        imageData[i*4]=255
        imageData[i*4+1]=255
        imageData[i*4+2]=255
        imageData[i*4+3]=255
      }

    }
    //And putting our image data to the canvas
    canvasContext.getImageData(0,0,width,height)
    //first we need to move our stars down by 1
    for(var i=this.height-1; i>1; i--){//This increments our height
      for(var j=this.width-1; j>0; j--){//and this increments our width
        this.starArray[i*this.width+j]=this.starArray[(i*this.width-1)+j]
      }
    }
    //and finally, lets generate our next row
    for(var i=0; i<this.width;i++){
      this.starArray[i]=1==Math.floor(Math.random()*20)//making it so there is a 1 in 20 chance for a star being generated
      if(this.starArray[i]){
        console.log(1)
      }
    }
  }
}
