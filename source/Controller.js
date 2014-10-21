$(document).ready(function() {
	controller = new Controller();
});

function Controller() {
	this.model = new Model();
	this.view = new View();
	
	this.$pageHook = this.findPageHook();	
	this.view.produceGUI(this.$pageHook);
	this.attachHandlers();
};

Controller.prototype = {
	findPageHook: function() {
		return $("#textEditor");
	},
	
	attachHandlers: function() {
		$("#submit").click(this.submitPost);
	},
	
	submitPost: function() {
		console.log("post submitted");
	},
};