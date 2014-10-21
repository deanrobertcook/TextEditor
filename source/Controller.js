$(document).ready(function() {
	controller = new Controller();
});

function Controller() {
	this.model = new Model();
	this.view = new View();
	
	this.$pageHook = this.findPageHook();	
	this.view.produceGUI(this.$pageHook);
};

Controller.prototype = {
	findPageHook: function() {
		return $("#textEditor");
	},
	
	submitPost: function() {
		console.log("post submitted");
	}
};