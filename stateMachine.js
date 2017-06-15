class stateMachine{
  constructor(){
    this.up=false;
    this.down=false;
    this.left=false;
    this.right=false;
    this.fire=false;
    window.onkeydown=this.updateState.bind(this);
    window.onkeyup=this.updateState.bind(this);
  }
  updateState(e){
    var myState=(e.type=="keydown");
    //console.log(myState);
    switch(e.keyCode){
      case 37:
      case 65:
        this.left=myState;
        break;
      case 38:
      case 87:
        this.up=myState;
        break;
      case 39:
      case 68:
        this.right=myState;
        break;
      case 40:
      case 83:
        this.down=myState;
        break;
      case 32:
      case 90:
        this.fire=myState;
        break;
      default:
        break;
    }
  }
}
