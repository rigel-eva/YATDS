
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
class shape{
  constructor(){

  }
  func(t){
    return new vector2D(0,0)
  }
  xFunc(t){
    return func(t).x1
  }
  yFunc(t){
    return func(t).y1
  }
}
class linearBezier extends shape{
  constructor(v1,v2){//Ok, only doing vectors here just to make the code easier later
    super()
    this.v1=v1
    this.v2=v2
  }
  func(t){//Takes in a scalar in [0,1] Returns a vector
    return this.v2.subtraction(this.v1).scalarMultiply(t).addition(this.v1)
  }
}
class bezier extends shape{
  constructor(vectors){
    super()
    this.bezier0=new shape()
    this.bezier1=new shape()
    console.log(vectors.length)
    if(vectors.length==3){
      this.bezier0=new linearBezier(vectors[0],vectors[1])
      this.bezier1=new linearBezier(vectors[1],vectors[2])
    }
    else{
      var vectors0=vectors.slice()
      var vectors1=vectors.slice()
      vectors0.splice(vectors0.length-1,1)
      vectors1.splice(0,1)
      //It's Beziers all the way down
      this.bezier0=new bezier(vectors0)
      this.bezier1=new bezier(vectors1)
    }

  }
  func(t){
    return this.bezier0.func(t).scalarMultiply(1-t).addition(this.bezier1.func(t).scalarMultiply(t))
  }
}
