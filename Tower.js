var Tower = function(x, y){
	this.x = x;
	this.y = y;

	this.show = function(){
		fill(215,8,8);	
		ellipse(this.x, this.y , 30, 30);
	}

	this.detect = function(enemy){
		var d = dist(this.x, this.y, enemy.x, enemy.y);
		if(d < 114){
			return true;
		}
		else{
			return false;
		}
	}
}