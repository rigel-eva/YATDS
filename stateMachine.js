class stateMachine{
  constructor(){
    this.up=false;
    this.down=false;
    this.left=false;
    this.right=false;
    window.onkeydown=this.updateState.bind(this)
    window.onkeyup=this.updateState.bind(this)
  }
  updateState(e){
    var myState=(e.type=="keydown");
    console.log(myState);
    switch(e.keyCode){
      case 37:
        this.left=myState;
        break;
      case 38:
        this.up=myState;
        break;
      case 39:
        this.right=myState;
        break;
      case 40:
        this.down=myState;
        break;
      default:
        console.log("wat.jpg")
        break;
    }
    console.log("up: "+this.up+" left: "+this.left+" down: "+this.down+" right: "+this.right)
  }
}
