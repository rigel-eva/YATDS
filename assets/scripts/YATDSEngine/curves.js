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
//Should add function for a pursuit curve: http://mathworld.wolfram.com/PursuitCurve.html
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
function svgPathToVectorLists(data){
  var aOfAOfV=[]//Array of array of vectors
  //First of all I'm not assuming clean data
  /*
  UPPERCASE COMMAND: all absolute values
  lowercase command: all delta values
  */
  var myData=data.replace(/\s/g,'').  //Eliminates the whitespace that might be lurking in the command string
        replace(/(\d)-/g,"$1,-").//Fixes the issue of having weird lack of commas which makes further processing more difficult
        replace(/(M|C|Q|S|V|L|m|c|q|s|v|l)/g,"🕹️$1").//Sets up our split so we don't actually delete the commmand we are looking for
        split("🕹️")                      //runs the actual split!
  myData.splice(0,1)
  for(var i=0; i<myData.length;i++){//Next we are seperating them out into coordinates
    var commandChar=myData[i].charAt(0)
    var relative=commandChar.toLowerCase()==commandChar//Checks if our command is going to be relative
    myData[i]=myData[i].substr(1).split(',')
    if(commandChar.toLowerCase()=="s"){//ok special case for smooth splines
      //Grab the last known control point
      var lastControlPoint=aOfAOfV[aOfAOfV.length-1][aOfAOfV[aOfAOfV.length-1].length-2]
      if(!relative){//Ok if it isn't relative we need to make it relative
        lastControlPoint=lastControlPoint.subtraction(aOfAOfV[aOfAOfV.length-1][aOfAOfV[aOfAOfV.length-1].length-1])
      }
      lastControlPoint=lastControlPoint.scalarMultiply(-1)
      if(!relative){//And wwe are going to undo anything that we may have screwed up
        lastControlPoint=lastControlPoint.addition(aOfAOfV[aOfAOfV.length-1][aOfAOfV[aOfAOfV.length-1].length-1])
      }
      //Multiply it by -1 (giving it's inverse)
      //and splice that into our mysData
      myData[i].unshift(String(lastControlPoint.y1))
      myData[i].unshift(String(lastControlPoint.x1))
    }
    else if(commandChar=="v"){
      myData[i].unshift("0")
    }
    else if(commandChar=="V"){
      myData[i].unshift(myData[i-1][myData[i-1].length-2])
    }
    else if(commandChar=="h"){
      myData[i].push(0)
    }
    else if(commandChar=="H"){
      myData[i].unshift(myData[i-1][myData[i-1].length-1])
    }
    aOfAOfV.push([])//Push a fresh array
    for(var j=0;j<myData[i].length;j+=2){
      //And let's go ahead and start pushing our vectors into the array
      aOfAOfV[aOfAOfV.length-1].push(new vector2D(parseFloat(myData[i][j]),parseFloat(myData[i][j+1])))
      if(relative){//And our delta check
        aOfAOfV[aOfAOfV.length-1][aOfAOfV[aOfAOfV.length-1].length-1]=
          aOfAOfV[aOfAOfV.length-1][aOfAOfV[aOfAOfV.length-1].length-1].//Grab the vector2D that we just pushed on
          addition(aOfAOfV[aOfAOfV.length-2][aOfAOfV[aOfAOfV.length-2].length-1])//and add it to the last vector2D of the previous array
      }
    }
  }
  return aOfAOfV
}
function svgPathToBezierSpline(data){
  //And finally let's go ahead and give our new spline a home.
  return new bezierSpline(svgPathToVectorLists(data))
}
