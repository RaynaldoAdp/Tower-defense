var Projectile = function(tower){
	this.x = tower.x;
	this.y = tower.y;
	this.r = 4;
	this.toDelete = false;
	this.directionX = 0;
	this.directionY = 0;

	this.show = function(){
		fill(255);	
		ellipse(this.x, this.y , this.r * 2, this.r * 2);
	}

	this.move = function(enemy){
		this.directionX = this.x - enemy.x;
		this.directionY = this.y - enemy.y;
		this.x -= this.directionX/10;
		this.y -= this.directionY/10;
	}

	this.hit = function(enemy){
		var distance = dist(this.x, this.y, enemy.x, enemy.y);
		if(distance < this.r + enemy.r) {
			return true;
		}
		else{
			return false;
		}

	}

	this.disappear = function(enemy){
		this.toDelete = true;
	}

}