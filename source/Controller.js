$(document).ready(function() {
	controller = new Controller();
});

function Controller() {
	this.model = new Model();
	this.view = new View();
	
	this.$pageHook = this.findPageHook();	
	this.view.produceGUI(this.$pageHook);
	this.setup();
	this.attachHandlers();
};

Controller.prototype = {	
	findPageHook: function() {
		return $("#textEditor");
	},
	
	setup: function() {
		richTextContent.document.designMode = 'On';
	},
	
	updatePlainTextArea: function() {
		$("#plainTextContent").val(this.extractRichText());
	},
	
	updateRichTextArea: function() {
		$(richTextContent.document.body).html(this.extractPlainText());
	},
	
	orderedList: function() {
		richTextContent.document.execCommand("insertOrderedList");
		$("#richTextContent").focus();
	},
	
	unorderedList: function() {
		richTextContent.document.execCommand("insertUnorderedList");
		$("#richTextContent").focus();
	},
	
	createLink: function() {
		var link = prompt("Enter link: ", "http://");
		richTextContent.document.execCommand("createLink", false, link);
		$("#richTextContent").focus();
	},
	
	attachHandlers: function() {
		$("#submit").click(this.submitPost.bind(this));
		$("#orderedListButton").click(this.orderedList);
		$("#unorderedListButton").click(this.unorderedList);
		$("#createLinkButton").click(this.createLink);
		$(richTextContent.document.body).keyup(this.updatePlainTextArea.bind(this));
		$("#plainTextContent").keyup(this.updateRichTextArea.bind(this));
	},
	
	submitPost: function() {
		console.log(this.extractRichText());
	},
	
	extractPlainText: function() {
		return $("#plainTextContent").val();
	},
	
	extractRichText: function() {
		return $(richTextContent.document.body).html();
	},
};