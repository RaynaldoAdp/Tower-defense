var gameArray = [
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
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],							
];

var enemy = [];
var tiles = [];
var towers = [];
var projectiles = [];
var mode = 255;
var towerMode = false;

function lalala(){
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
	lalala();
});

function setup() {
  createCanvas(600, 600);
}

function draw() {
	background(0);
	frameRate(60);

	for(i = 0; i < enemy.length; i++){
		enemy[i].show();
		for(j = 0; j < towers.length; j++){
			if(frameCount % 60 === 0){
				if(towers[j].detect(enemy[i])){
					projectile = new Projectile(towers[j]);
					projectiles.push(projectile);
				}
			}
		}
		for(k = 0; k < projectiles.length; k++){
			projectiles[k].show();
			projectiles[k].move(enemy[i]);
			if (projectiles[k].hit(enemy[i])){
				projectiles[k].disappear();
				enemy[i].minusHp();
			}
		}
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

	for(i = 0; i < enemy.length; i++){
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

}

function mouseClicked(){
	var pixelPositionX = division1(mouseX);
	var pixelPositionY = division1(mouseY);
	var positionX = division2(mouseX);
	var positionY = division2(mouseY);
	//create Tiles
	tile = new Tile(pixelPositionX, pixelPositionY, mode);
	tiles.push(tile);
	gameArray[positionX][positionY] = mode;	

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

function movementLogicForTop(enemy, tile, indexX, indexY){
	if(gameArray[indexX - 1][indexY + 1] === 255){
		if(enemy.velocityY !== 0){
			enemy.velocityX = 0;
			enemy.velocityY = -1;
		}
		else{
			enemy.velocityX = 1;
			enemy.velocityY = 0;
		}
	}
	else if(gameArray[indexX + 1][indexY + 1] === 255){
		if(enemy.velocityY !== 0){
			enemy.velocityX = 0;
			enemy.velocityY = -1;
		}
		else{
			enemy.velocityX = -1;
			enemy.velocityY = 0;			
		}
	}
	else{
		enemy.velocityX = 1;
		enemy.velocityY = 0;
		console.log(enemy.velocityX);
	}
}

function movementLogicForBottom(enemy, tile, indexX, indexY){
	if(gameArray[indexX - 1][indexY - 1] === 255){
		if(enemy.velocityX !== 0){
			enemy.velocityX = 0;
			enemy.velocityY = 1;
		}
		else{
			enemy.velocityX = 1;
			enemy.velocityY = 0;
		}
	}
	else if(gameArray[indexX + 1][indexY - 1] === 255){
		if(enemy.velocityY !== 0){ //confusing af
			enemy.velocityX = 0;
			enemy.velocityY = 1;
		}
		else{
			enemy.velocityX = -1;
			enemy.velocityY = 0;			
		}
	}
/*	else{
		enemy.velocityX = 1;
		enemy.velocityY = 0;
	}*/
}

function movementLogicForRight(enemy, tile, indexX, indexY){
	if(gameArray[indexX - 1][indexY + 1] === 255){
		if(enemy.velocityX !== 0){
			enemy.velocityX = 0;
			enemy.velocityY = -1;
		}
		else{
			enemy.velocityX = -1;
			enemy.velocityY = 0;
		}
	}
	else if(gameArray[indexX - 1][indexY - 1] === 255){
		if(enemy.velocityX !== 0){
			enemy.velocityX = 0;
			enemy.velocityY = 1;
		}
		else{
			enemy.velocityX = -1;
			enemy.velocityY = 0;			
		}
	}
/*	else{
		enemy.velocityX = 0;
		enemy.velocityY = 1;
	}*/
}

function movementLogicForLeft(enemy, tile, indexX, indexY){
	if(gameArray[indexX + 1][indexY + 1] === 255){
		if(enemy.velocityX !== 0){
			enemy.velocityX = 0;
			enemy.velocityY = -1;
		}
		else{
			enemy.velocityX = 1;
			enemy.velocityY = 0;
		}
	}
	else if(gameArray[indexX + 1][indexY - 1] === 255){
		if(enemy.velocityX !== 0){
			enemy.velocityX = 0;
			enemy.velocityY = -1;
		}
		else{
			enemy.velocityX = 1;
			enemy.velocityY = 0;			
		}
	}
/*	else{
		enemy.velocityX = 1;
		enemy.velocityY = 0;
	}*/
}