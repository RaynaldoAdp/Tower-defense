var Enemy = function(y){
	this.y = 620 + y;
	this.x = 20;
	this.r = 10;
	this.hp = 3;
	this.toDelete = false;
	this.velocityX = 0;
	this.velocityY = 2/3;

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
}