
class oldCurve{
  constructor(pathData){
    pathData=pathData.toUpperCase().split("C")//Splitting up on cubic curves
    pathData[0]=pathData[0].split("M")[1]//Doing a bit of processing for our starting oint
    for(var i=0; i<pathData.length;i++){//And creating subarrays for the points on each of our curves
      pathData[i]=pathData[i].split(",")
    }
    this.pathData=pathData
  }
  xFunc(t){
    var arrayAt=Math.floor(t)+1
    t=t%1
    return (1-t)**3*this.pathData[arrayAt-1][this.pathData[arrayAt-1].length-2]+3*(1-t)**2*t*this.pathData[arrayAt][0]+3*(1-t)*t**2**this.pathData[arrayAt][2]+t**3*this.pathData[arrayAt][4]
  }
  yFunc(t){
    var arrayAt=Math.floor(t)+1
    if(t>this.pathData.length-2){
      this.shot=true
      return 100//Someplace guranteed to be off screen
    }
    t=t%1
    return (1-t)**3*this.pathData[arrayAt-1][this.pathData[arrayAt-1].length-1]+3*(1-t)**2*t*this.pathData[arrayAt][1]+3*(1-t)*t**2*this.pathData[arrayAt][3]+t**3*this.pathData[arrayAt][5]
  }
}
//Ok, now then, let's go ahead and implement a few vectors things ...
class point{
  constructor(x,y){
    this.x1=x
    this.y1=y
  }
}
//Just naming this right so any Math(s) professors don't kill me
class vector2D extends point{
  constructor(x,y){
    super(x,y)
  }
  addition(vector){
    return new vector2D(this.x1+vector.x1,this.y1+vector.y1)
  }
  subtraction(vector){
    return new vector2D(this.x1-vector.x1,this.y1-vector.y1)
  }
  scalarMultiply(scalar){
    return new vector2D(this.x1*scalar,this.y1*scalar)
  }
}
class linearBezier{
  constructor(v1,v2){//Ok, only doing vectors here just to make the code easier later
    this.v1=v1
    this.v2=v2
  }
  func(t){//Takes in a scalar in [0,1] Returns a vector
    return this.v2.subtraction(this.v1).scalarMultiply(t).addition(this.v1)
  }
  xFunc(t){
    return func(t).x1
  }
  yFunc(t){
    return func(t).y1
  }
}
//HERE LIES KRAKENS
class quadradicBezier extends linearBezier{
  constructor(v1,v2,v3){
    super(v1,v2)
    this.v3=v3
    //this.lBezier1=new linearBezier(v1,v2)
    //this.lBezier2=new linearBezier(v2,v3)
  }
  func(t){// BUG: Alright, this isn't generating the appropriate vaules for the function ... need to look into that
    //B(t)=(1-t)*[(1-t)*p0+t*p1]+t*[(1-t)*p1+t*P2]
    //Just seperating these out just for sanity's sake
    var tempVec1=this.v1.scalarMultiply(1-t).addition(this.v2.scalarMultiply(t))
    var tempVec2=this.v2.scalarMultiply(1-t).addition(this.v3.scalarMultiply(t))
    return tempVec1.addition(tempVec2)
  }
}
class cubicBezier extends quadradicBezier{
  constructor(v1,v2,v3,v4){
    super(v1,v2,v3)
    this.v4=v4
    //These are here to ease calculation
    this.qBezier1 = new quadradicBezier(this.v1,this.v2,this.v3)
    this.qBezier2 = new quadradicBezier(this.v2,this.v3,this.v4)
  }
  func(t){
    return this.qBezier1.func(t).scalarMultiply(1-t).addition(this.qBezier2.func(t).scalarMultiply(t))
  }
}
