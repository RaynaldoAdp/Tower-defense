/*var gameArray = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,'Goal'],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],						
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	['Start',0,0,0,0,0,0,0,0,0,0,0,0,0,0],							
];*/

//gameArray 15 x 15 along with starting and endpoint for the game
var gameArray = [];
for(i = 0; i < 15; i++){
	gameArray[i] = [];
	for (j = 0; j < 15; j++){
		gameArray[i][j] = "Empty";
	}
}
gameArray[0][0] = "Start";
gameArray[14][14] = "Goal";

var path = [];
var enemy = [];
var tiles = [];
var towers = [];
var projectiles = [];
var mode = 255;
var towerMode = false;
var currentFrameCount;

function detectButtons(){
	$('#1').click(function(){
		event.preventDefault();
		mode = 255;
	});
	$('#3').click(function(){
		mode = 0;
	});
	$('#2').click(function(){
		mode = 125;
	});
	$('#begin').click(function(){
		var y = 0;
		currentFrameCount = frameCount;
		path = findShortestPath([0,0]);
/*		for(i = 0; i < 10; i++){*/
			var newEnemy = new Enemy(y);
			enemy.push(newEnemy);
			y += 20;
/*		}*/
	});
	$('#tower').click(function(){
		if(!towerMode){
			towerMode = true;
		}
		else{
			towerMode = false;
		}
	});
}

$(document).ready(function(){
	detectButtons();
});

function setup() {
  createCanvas(600, 600);
  frameRate(20);
}

function draw() {
	background(0);
	for(i = 0; i < enemy.length; i++){
		enemy[i].show();

		enemy[i].update(path, frameCount, currentFrameCount);
		for(j = 0; j < towers.length; j++){
			if(frameCount % 20 === 0){
				if(towers[j].detect(enemy[i])){
					projectile = new Projectile(towers[j]);
					projectile.setVelocity(enemy[i]);
					projectiles.push(projectile);
				}
			}
		}
		for(k = 0; k < projectiles.length; k++){ // multiple ks detect one i; THATS THE FUCKING PROBLEM ASDFADSFADF
			projectiles[k].show();
			projectiles[k].update(); // the more the enemies it gets updated more times; If enemy = 1, updates once. if enemy = 2, updates twice and so on!
			if (projectiles[k].hit(enemy[i])){
				projectiles[k].disappear();
				enemy[i].minusHp();
			}
		}
	}

	for(i = 0; i < projectiles.length; i++){
		projectiles[i].update();
	}

	for(i = projectiles.length -1; i >= 0; i--){
		if(projectiles[i].toDelete){
			projectiles.splice(i,1);
		}
	}

	for(i = enemy.length -1; i >= 0; i--){
		if(enemy[i].toDelete){
			enemy.splice(i,1);
		}
	}

	for(i = 0; i < tiles.length; i++){
		tiles[i].show();
	}

	for(i = 0; i < towers.length; i++){
		towers[i].show();
	}

/*	for(i = 0; i < enemy.length; i++){
		for(j = 0; j < tiles.length; j++){
			var indexX = tiles[j].x/40;
			var indexY = tiles[j].y/40;
			if(enemy[i].detectTop(tiles[j])){
				movementLogicForTop(enemy[i], tiles[j], indexX, indexY);
			}
			else if(enemy[i].detectBottom(tiles[j])){
				movementLogicForBottom(enemy[i], tiles[j], indexX, indexY);
			}
			else if(enemy[i].detectRight(tiles[j])){
				movementLogicForRight(enemy[i], tiles[j], indexX, indexY);
			}
			else if(enemy[i].detectLeft(tiles[j])){
				movementLogicForLeft(enemy[i], tiles[j], indexX, indexY);
			}						
		}
	}
*/
}

function mouseClicked(){
	var pixelPositionX = division1(mouseX);
	var pixelPositionY = division1(mouseY);
	var positionX = division2(mouseX);
	var positionY = division2(mouseY);
	//create Tiles
	tile = new Tile(pixelPositionX, pixelPositionY, mode);
	tiles.push(tile);
	gameArray[14- positionY][positionX] = mode;

	//create Towers
	if(towerMode){
		tower = new Tower(pixelPositionX+20, pixelPositionY+20);
		towers.push(tower);
	}
}

function division1(position){
	var positionBot = position / 40;
	var positionResult = Math.floor(positionBot) * 40; 
	return positionResult;
}

function division2(position){
	var positionBot = position / 40;
	var positionResult = Math.floor(positionBot);
	return positionResult;
}

// This section is for enemy movement logic using the BFS algorithm. Credit goes to Greg Trowbridge.

// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
var findShortestPath = function(startCoordinates) {
  var distanceFromBottom = startCoordinates[1];
  var distanceFromLeft = startCoordinates[0];

  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  var location = {
    distanceFromBottom: distanceFromBottom,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start'
  };

  // Initialize the queue with the start location already inside
  var queue = [location];

  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    var currentLocation = queue.shift();

    // Explore North
    var newLocation = exploreInDirection(currentLocation, 'North');
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore East
    var newLocation = exploreInDirection(currentLocation, 'East');
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore South
    var newLocation = exploreInDirection(currentLocation, 'South');
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore West
    var newLocation = exploreInDirection(currentLocation, 'West');
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
  }

  // No valid path found
  return false;


};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function(location) {
  var gridSize = gameArray.length;
  var dfb = location.distanceFromBottom;
  var dfl = location.distanceFromLeft;

  if (location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= gridSize ||
      location.distanceFromBottom < 0 ||
      location.distanceFromBottom >= gridSize) {

    // location is not on the grid--return false
    return 'Invalid';
  } else if (gameArray[dfb][dfl] === 'Goal') {
    return 'Goal';
  } else if (gameArray[dfb][dfl] !== 'Empty') {
    // location is either an obstacle or has been visited
    return 'Blocked';
  } else {
    return 'Valid';
  }
};


// Explores the grid from the given location in the given
// direction
var exploreInDirection = function(currentLocation, direction) {
  var newPath = currentLocation.path.slice();
  newPath.push(direction);

  var dfb = currentLocation.distanceFromBottom;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === 'North') {
    dfb += 1;
  } else if (direction === 'East') {
    dfl += 1;
  } else if (direction === 'South') {
    dfb -= 1;
  } else if (direction === 'West') {
    dfl -= 1;
  }

  var newLocation = {
    distanceFromBottom: dfb,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown'
  };
  newLocation.status = locationStatus(newLocation);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    gameArray[newLocation.distanceFromBottom][newLocation.distanceFromLeft] = 'Visited';
  }

  return newLocation;
};


/*function traversingArrayInDelay(path, enemy){
 (function theLoop (i) {
   setTimeout(function () {
   		console.log(path[i]);
		if(path[Math.abs(i - path.length)] === "North"){
		enemy.velocityX = 0;
		enemy.velocityY = 2/3;
		}
		else if(path[Math.abs(i - path.length)] === "East"){
			enemy.velocityX = 2/3;
			enemy.velocityY = 0;
		}
		else if(path[Math.abs(i - path.length)] === "South"){
			enemy.velocityX = 0;
			enemy.velocityY = -2/3;
		}
		else if(path[Math.abs(i - path.length)] === "West"){
			enemy.velocityX = -2/3;
			enemy.velocityY = 0;
		}						
     	if (--i) {          // If i > 0, keep going
       		theLoop(i);       // Call the loop again, and pass it the current value of i
    	}
   }, 1000);
 })(path.length);
}*/

function enemyMovementLogic(path, enemy){

/*	for(i = 0; i < path.length; i++){
		setTimeout(function(){console.log(path[i]);}, 1000);*/
		
/*		var count = frameCount;
		var newCount = count + 1000;
		if(frameCount < newCount){
			if(path[i] === "North"){
				enemy.velocityX = 0;
				enemy.velocityY = 1;
			}
			else if(path[i] === "East"){
				enemy.velocityX = 1;
				enemy.velocityY = 0;
			}
			else if(path[i] === "South"){
				enemy.velocityX = 0;
				enemy.velocityY = -1;
			}
			else if(path[i] === "West"){
				enemy.velocityX = -1;
				enemy.velocityY = 0;
			}						
		}
		else{
			console.log("logic failed");
		}
	}*/
}