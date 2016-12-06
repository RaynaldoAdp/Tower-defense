var Projectile = function(tower){
	this.x = tower.x;
	this.y = tower.y;

	this.show = function(){
		fill(255);	
		ellipse(this.x, this.y , 8, 8);
	}

	this.move = function(enemy){
		var directionX = this.x - enemy.x;
		var directionY = this.y - enemy.y;
		this.x -= directionX/10;
		this.y -= directionY/10;
	}
}