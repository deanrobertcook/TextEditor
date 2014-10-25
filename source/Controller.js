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
	
	//add plain toolbar buttons
	this.view.produceToolbarButton("plain", "TidyHTML", this.updatePlainTextArea.bind(this));
	
	//add rich toolbar buttons
	this.view.produceToolbarButton("rich", "Fsize", this.fontSize.bind(this));
	this.view.produceToolbarButton("rich", "Fcolor", this.fontColor.bind(this));
	this.view.produceToolbarButton("rich", "OL", this.orderedList.bind(this));
	this.view.produceToolbarButton("rich", "UL", this.unorderedList.bind(this));
	this.view.produceToolbarButton("rich", "Just.", this.justify.bind(this));
	this.view.produceToolbarButton("rich", "Table", this.enableInlineTableEditing.bind(this));
	this.view.produceToolbarButton("rich", "Link", this.createLink.bind(this));
	this.view.produceToolbarButton("rich", "Submit", this.submitPost.bind(this));
	
	this.view.assembleGUI();
	
	this.iframeDoc = this.view.richTextArea.get(0).contentDocument;
	this.setupIframe();
	
	this.view.plainTextArea.on("input", this.updateRichTextArea.bind(this));
	$(this.iframeDoc).on("input", this.updatePlainTextArea.bind(this));
};

Controller.prototype = {
	setupIframe: function() {
		this.iframeDoc.designMode = 'On';
		$(this.iframeDoc.body).css({
			border: "0",
			margin: "0",
			padding: "8px",
			"word-wrap": "break-word",
		});
	},
	
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
	
	enableInlineTableEditing: function() {
		this.iframeDoc.execCommand("enableInlineTableEditing");
		$(this.view.richTextArea).focus();
	},
	
	fontSize: function() {
		var size = prompt("Enter font-size: ");
		this.iframeDoc.execCommand("fontSize", false, size);
		$(this.view.richTextArea).focus();
	},
	
	fontColor: function() {
		var color = prompt("Enter font-color: ");
		this.iframeDoc.execCommand("foreColor", false, color);
		$(this.view.richTextArea).focus();
	},
	
	orderedList: function() {
		this.iframeDoc.execCommand("insertOrderedList");
		$(this.view.richTextArea).focus();
	},
	
	unorderedList: function() {
		this.iframeDoc.execCommand("insertUnorderedList");
		$(this.view.richTextArea).focus();
	},
	
	justify: function() {
		this.iframeDoc.execCommand("justifyFull");
		$(this.view.richTextArea).focus();
	},
	
	createLink: function() {
		var link = prompt("Enter link: ", "http://");
		this.iframeDoc.execCommand("createLink", false, link);
		$(this.view.richTextArea).focus();
	},
	
	insertImage: function() {
		var link = prompt("Enter image fileName: ");
		this.iframeDoc.execCommand("insertImage", false, link);
		console.log(link);
		$(this.view.richTextArea).focus();
	},
	
	submitPost: function() {
		console.log(this.extractPlainText());
	},
};