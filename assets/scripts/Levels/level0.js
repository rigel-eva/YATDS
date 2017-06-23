/*
 These JS files are ment to set up the engine for a particular level.
So you can resonably expect all of the engine scripts to be loaded. Just as a
reminder, these variables are more than likely available to read or write
▪️ var enemies - Our enemy handler. You should push any new enemies to
                enemies.enemies.
▪️ var tickNum - Which tick we are on, which is handy when editing ...
▪️ var spawns  - This is an array with all the spawns we are doing with the
                index set to when we should be spawning in that enemy
And here are some rather helpful functions
▪️ function loadPaths(file) - Gets rid of existing paths and puts in new ones!
  🔹 Argument: file - Name of the svg to load
▪️ function stop()          - Pauses the game, gives you time to place stuff
▪️ function start()         - Restarts our loop!
▪️ stars.generateRow()      - generates the next row of our starfield
With all of that said, happy coding!
*/
function startLevel(){
  console.log("Setting up Level 0")
  stop();//Just so we can load in stuff without ticking up
  loadPaths("./assets/curves/enemyPath.svg")
  var roundImg=document.getElementById("ballEnemy")//Setting our Enemy image (you could feasably do this by adding an element to the DOM, but having it there in the first place makes it easier)
  var spawnBasic_Path=function(){//Our basic enemy
   enemies.enemies.push(new bezierEnemy($("#Basic_x5F_Path")[0].getAttribute("d"),0.001,ballEnemy))
  }
  var spawnQuick_Left=function(){
    enemies.enemies.push(new bezierEnemy($("#Quick_x5F_Left")[0].getAttribute("d"),0.001,ballEnemy))
  }
  var spawnQuick_Right=function(){
    enemies.enemies.push(new bezierEnemy($("#Quick_x5F_Right")[0].getAttribute("d"),0.001,ballEnemy))
  }
  var spawnQuick_Both=function(){
    enemies.enemies.push(new bezierEnemy($("#Quick_x5F_Left")[0].getAttribute("d"),0.001,ballEnemy))
    enemies.enemies.push(new bezierEnemy($("#Quick_x5F_Right")[0].getAttribute("d"),0.001,ballEnemy))
  }
  //Shoving our spawns into spawns
  for(var i=1;i<30+tickNum;i++){
    spawns[i*30+1+tickNum]=spawnBasic_Path
  }
  for(var i=1;i<40+tickNum;i++){
    spawns[i*30+1+tickNum+2500]=spawnQuick_Both
    spawns[i*30+1+tickNum+4500]=spawnQuick_Both
  }
  for(var i=0; i<480; i++){
    stars.generateRow()
  }
  start();//
}
startLevel();
