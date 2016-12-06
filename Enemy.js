var Enemy = function(y){
	this.y = 600 + y;
	this.x = 20;

	this.show = function(){
		fill(255);
		ellipse(this.x, this.y , 20, 20);
		this.y -= 1;	
	}
}