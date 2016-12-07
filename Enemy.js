var Enemy = function(y){
	this.y = 600 + y;
	this.x = 60;
	this.r = 10;
	this.hp = 3;
	this.toDelete = false;
	this.velocityX = 0;
	this.velocityY = 1;

	this.show = function(){
		fill(255);
		ellipse(this.x, this.y , this.r * 2, this.r * 2);
		this.y -= this.velocityY;	
		this.x += this.velocityX;
	}

	this.minusHp = function(){
		this.hp -= 1;
		if(this.hp === 0){
			this.disappear();
		}
	}

	this.disappear = function(){
		this.toDelete = true;
	}

	this.detectTop = function(tile){
		var distanceY = this.y - tile.y;
		var distanceX = this.x - tile.x;
		if(distanceY === 60 && distanceX === 20){
			return true;
		}
		else{
			return false;
		}
	}

	this.detectRight = function(tile){
		var distanceY = this.y - tile.y;
		var distanceX = this.x - tile.x;
		if(distanceY === 20 && distanceX === -20){
			return true;
		}
		else{
			return false;
		}
	}

	this.detectLeft = function(tile){
		var distanceY = this.y - tile.y;
		var distanceX = this.x - tile.x;
		if(distanceY === 20 && distanceX === 60){
			return true;
		}
		else{
			return false;
		}
	}

	this.detectBottom = function(tile){
		var distanceY = this.y - tile.y;
		var distanceX = this.x - tile.x;
		if(distanceY === -20 && distanceX === 20){
			return true;
		}
		else{
			return false;
		}
	}

/*	this.movementLogic = function(tile1, tile2, tile3){
		if(this.detectTop(tile1) && this.detectLeft(tile2) && this.detectRight(tile3)){
			this.velocityX = 0;
			this.velocityY = -1;
		}
		else if(this.detectTop(tile1) && this.detectBottom(tile2) && this.detectRight(tile3)){
			this.velocityX = -1;
			this.velocityY = 0;
		}
		else if(this.detectTop(tile1) && this.detectBottom(tile2) && this.detectLeft(tile3)){
			this.velocityX = 0;
			this.velocityY = 1;
		}
		else if(this.detectLeft(tile1) && this.detectBottom(tile2) && this.detectRight(tile3)){
			this.velocityX = 1;
			this.velocityY = 0;
		}
		else if(this.detectTop(tile1) && this.detectLeft(tile2)){
			this.velocityX = 1;
			this.velocityY = 0;
		}
		else if(this.detectTop(tile1) && this.detectRight(tile2)){
			this.velocityX = -1;
			this.velocityY = 0;
		}
		else if(this.detectBottom(tile1) && this.detectLeft(tile2)){
			this.velocityX = 1;
			this.velocityY = 0;
		}
		else if(this.detectBottom(tile1) && this.detectRight(tile2)){
			this.velocityX = -1;
			this.velocityY = 0;
		}
		else if(this.detectTop(tile1)){
			this.velocityX = 1;
			this.velocityY = 0;
		}	
		else if(this.detectRight(tile1)){
			this.velocityX = 0;
			this.velocityY = 1;
		}
		else if(this.detectLeft(tile1)){
			this.velocityX = 0;
			this.velocityY = 1;
		}																			
	}*/			
}