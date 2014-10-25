function Model() {
	this.title;
	this.author;
	this.date;
	this.content;
	
	
};

Model.prototype = {
	
};

var Car = (function () {
	function Car() {};	
	
	// Private func/vars
	var private = {
		color: 'red',
		changeColor: function(newcolor) {
			this.color = newcolor;
		}
	};
	
	
	// Public func/vars
	Car.prototype = {
		trickColor: "blue",
		newColor: function (color) {
			private.changeColor(color);
		},
		getColor: function () {
			return private.color
		}
	};

	return Car;
})();

var myCar = new Car();
myCar.newColor("green");
console.log(myCar);
