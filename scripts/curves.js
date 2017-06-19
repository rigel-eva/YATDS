//Ok, now then, let's go ahead and implement a few vectors things ...
class point{
  constructor(x,y){
    this.x1=x
    this.y1=y
  }
  func(t){
    return this
  }
  xFunc(t){
    return this.x1
  }
  yFunc(t){
    return this.y1
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
  vectorAt(t){
    return this
  }
}
class shape{
  constructor(){

  }
  vectorAt(t){
    return new vector2D(0,0)
  }
  xFunc(t){
    return this.vectorAt(t).x1
  }
  yFunc(t){
    return this.vectorAt(t).y1
  }
}
class bezier extends shape{
  constructor(vectors){
    super()
    this.bezier0=new shape()
    this.bezier1=new shape()
    if(vectors.length==2){
      this.bezier0=vectors[0]
      this.bezier1=vectors[1]
    }
    else{
      //Need to duplicate these array into these variables otherwise it doesn't quite work ...
      var vectors0=vectors.slice()
      var vectors1=vectors.slice()
      vectors0.splice(vectors0.length-1,1)
      vectors1.splice(0,1)
      //It's Beziers all the way down
      this.bezier0=new bezier(vectors0)
      this.bezier1=new bezier(vectors1)
    }

  }
  vectorAt(t){
    return this.bezier0.vectorAt(t).scalarMultiply(1-t).addition(this.bezier1.vectorAt(t).scalarMultiply(t))
  }
}

class bezierSpline extends shape{
  //Ok, we are going to expect an array of arrys of vectors2D so, something like this:
  /*
    [[<0,0>],               //Initial value is always going to be equivilant to a move to
      [<32,32>],            //This will cause a line to be generated
      [<32,64>,<0,0>],       //This will cause a quadradic beziers to be genereated
      [<128,0>,<264,0>,<264,264>],//And this will cause a cubic bezier to be generated
      [<128,32>,<265,0>,<32,32>,<16,16>]]//And this will draw a fourth degree polynomial
  */
  constructor(arraysof){
    super()
    this.beziers=[]
    for(var i=1; i<arraysof.length; i++){
      arraysof[i].unshift(arraysof[i-1][arraysof[i-1].length-1])//ok, let's
      this.beziers.push(new bezier(arraysof[i]))
    }
    this.length=this.beziers.length
  }
  vectorAt(t){
    //TODO: I should probably set it up so the domain of this is from 0 to 1 like a standard bezier, but for the moment I'm going to just get the code out of the way ...
    return this.beziers[Math.floor(t)].vectorAt(t%1);
  }
}
function svgPathToBezierSpline(data){
  var aOfAOfV=[]//Array of array of vectors
  //First of all I'm not assuming clean data
  data=data.replace(/\s/g,'').toUpperCase().split(/M|C|Q/)// FIXME: I need to add a way to deal with svgs putting in digits that are negative like this 10-30,23 without affecting other code
  data.splice(0,1)//Getting rid of that first empty case
  for(var i=0; i<data.length;i++){//Next we are seperating them out into coordinates
    data[i]=data[i].split(',')
    aOfAOfV.push([])//Push a fresh array
    for(var j=0;j<data[i].length;j+=2){
      //And let's go ahead and start pushing our vectors into the array
      aOfAOfV[aOfAOfV.length-1].push(new vector2D(parseFloat(data[i][j]),parseFloat(data[i][j+1])))
    }
  }
  //And finally let's go ahead and give our new spline a home.
  return new bezierSpline(aOfAOfV)
}
