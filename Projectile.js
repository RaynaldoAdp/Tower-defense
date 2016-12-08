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

	this.setVelocity = function(enemy){
		this.directionX = (this.x - enemy.x) / 50;
		this.directionY = (this.y - enemy.y) / 50;
	}

	this.update = function(){
		this.x -= this.directionX;
		this.y -= this.directionY;
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