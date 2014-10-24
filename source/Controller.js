$(document).ready(function() {
	new Controller();
});

function Controller() {
	this.model = new Model();
	this.view = new View();
	//add post input fields
	this.view.producePostInformationTextField("Title", {"id": "title", "name": "title", "value": "Test"});
	this.view.producePostInformationTextField("Author", {"id": "author", "name": "author", "value": "the Ronin"});
	this.view.producePostInformationTextField("Date", {"id": "title", "name": "title", "value": "test"});
	
	//add toolbar buttons
	this.view.produceToolbarButton("OL", this.orderedList.bind(this));
	this.view.produceToolbarButton("UL", this.unorderedList.bind(this));
	this.view.produceToolbarButton("Link", this.createLink.bind(this));
	this.view.produceToolbarButton("TidyHTML", this.updatePlainTextArea.bind(this));
	this.view.produceToolbarButton("Submit", this.submitPost.bind(this));
	
	this.view.assembleGUI();
	
	this.iframeDoc = this.view.richTextArea.get(0).contentWindow.document;
	this.iframeDoc.designMode = 'On';
	
	this.view.plainTextArea.on("input", this.updateRichTextArea.bind(this));
	$(this.iframeDoc).on("input", this.updatePlainTextArea.bind(this));
};

Controller.prototype = {
	updatePlainTextArea: function() {
		var html = this.extractRichText();
		html = html_beautify(html, {
			'indent_inner_html': false,
			'indent_size': 2,
			'indent_char': ' ',
			'wrap_line_length': 78,
			'brace_style': 'expand',
			'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u'],
			'preserve_newlines': true,
			'max_preserve_newlines': 5,
			'indent_handlebars': false
		  });
		this.view.plainTextArea.val(html);
	},
	
	extractRichText: function() {
		return $(this.iframeDoc.body).html();
	},
	
	updateRichTextArea: function() {
		$(this.iframeDoc.body).html(this.extractPlainText());
	},
	
	extractPlainText: function() {
		return this.view.plainTextArea.val();
	},
	
	orderedList: function() {
		this.iframeDoc.execCommand("insertOrderedList");
		$(this.view.richTextArea).focus();
	},
	
	unorderedList: function() {
		this.iframeDoc.execCommand("insertUnorderedList");
		$(this.view.richTextArea).focus();
	},
	
	createLink: function() {
		var link = prompt("Enter link: ", "http://");
		this.iframeDoc.execCommand("createLink", false, link);
		$(this.view.richTextArea).focus();
	},
	
	submitPost: function() {
		console.log(this.extractPlainText());
	},
};