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
		if(frameCount % 60 === 0){
			for(j = 0; j < towers.length; j++){
				if(towers[j].detect(enemy[i])){
					projectile = new Projectile(towers[j]);
					projectiles.push(projectile);
				}
			}
		}
		for(k = 0; k < projectiles.length; k++){
			projectiles[k].show();
			projectiles[k].move(enemy[i]);
		}
	}


	for(i = 0; i < tiles.length; i++){
		tiles[i].show();
	}

	for(i = 0; i < towers.length; i++){
		towers[i].show();
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