$(document).ready(function() {
	new Controller();
});

var Controller = (function() {
	//constructor
	function Controller() {
		//add post input fields
		private.view.producePostInformationTextField("Title", {"id": "title", "name": "title", "value": "Test"});
		private.view.producePostInformationTextField("Author", {"id": "author", "name": "author", "value": "the Ronin"});
		private.view.producePostInformationTextField("Date", {"id": "title", "name": "title", "value": "test"});

		//add plain toolbar buttons
		private.view.produceToolbarButton("plain", "TidyHTML", this.updatePlainTextArea.bind(this));

		//add rich toolbar buttons
		private.view.produceToolbarButton("rich", "Fsize", this.setFontSize.bind(this));
		private.view.produceToolbarButton("rich", "Fcolor", this.setFontColor.bind(this));
		private.view.produceToolbarButton("rich", "OL", this.orderedList.bind(this));
		private.view.produceToolbarButton("rich", "UL", this.unorderedList.bind(this));
		private.view.produceToolbarButton("rich", "Just.", this.justify.bind(this));
		private.view.produceToolbarButton("rich", "Table", this.enableInlineTableEditing.bind(this));
		private.view.produceToolbarButton("rich", "Link", this.createLink.bind(this));
		private.view.produceToolbarButton("rich", "Submit", this.submitPost.bind(this));
		private.view.produceToolbarButton("rich", "Add Word", this.markWordUnknown.bind(this));

		private.view.assembleGUI();

		private.iframeDoc = private.view.richTextArea.get(0).contentDocument;
		this.setupIframe();

		private.view.plainTextArea.on("input", this.updateRichTextArea.bind(this));
		$(private.iframeDoc).on("input", this.updatePlainTextArea.bind(this));
	};
	
	//private
	var private = {
		model: new Model(),
		view: new View(),
		iframeDoc: null,
		newWords: [],
	};
	
	//public
	Controller.prototype = {
		setupIframe: function() {
			private.iframeDoc.designMode = 'On';
			$(private.iframeDoc.body).css({
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
			private.view.plainTextArea.val(html);
		},

		extractRichText: function() {
			return $(private.iframeDoc.body).html();
		},

		updateRichTextArea: function() {
			$(private.iframeDoc.body).html(this.extractPlainText());
		},

		extractPlainText: function() {
			return private.view.plainTextArea.val();
		},
		
		enableInlineTableEditing: function() {
			private.iframeDoc.execCommand("enableInlineTableEditing");
			$(private.view.richTextArea).focus();
		},

		bold: function() {
			private.iframeDoc.execCommand("bold");
			$(private.view.richTextArea).focus();
		},
		
		getFontSize: function() {
			var size = private.iframeDoc.queryCommandValue("FontSize");
			return size;
		},

		setFontSize: function(size) {
			if (!size || size instanceof jQuery.Event) {
				size = prompt("Enter font-size: ");
			}
			private.iframeDoc.execCommand("fontSize", false, size);
			$(private.view.richTextArea).focus();
		},
		
		incrementFontSize: function() {
			var currSize = this.getFontSize();
			this.setFontSize(+currSize + 1);
		},
		
		decrementFontSize: function() {
			var currSize = this.getFontSize();
			this.setFontSize(+currSize - 1);
		},

		setFontColor: function(color) {
			if (!color || color instanceof jQuery.Event) {
				color = prompt("Enter font-color: ");
			}
			private.iframeDoc.execCommand("foreColor", false, color);
			$(private.view.richTextArea).focus();
		},

		orderedList: function() {
			private.iframeDoc.execCommand("insertOrderedList");
			$(private.view.richTextArea).focus();
		},

		unorderedList: function() {
			private.iframeDoc.execCommand("insertUnorderedList");
			$(private.view.richTextArea).focus();
		},

		justify: function() {
			private.iframeDoc.execCommand("justifyFull");
			$(private.view.richTextArea).focus();
		},

		createLink: function() {
			var link = prompt("Enter link: ", "http://");
			private.iframeDoc.execCommand("createLink", false, link);
			$(private.view.richTextArea).focus();
		},

		insertImage: function() {
			var link = prompt("Enter image fileName: ");
			private.iframeDoc.execCommand("insertImage", false, link);
			console.log(link);
			$(private.view.richTextArea).focus();
		},

		submitPost: function() {
			console.log(this.extractPlainText());
		},
		
		insertText: function() {
			
		},
		
		removeFormat: function () {
			private.iframeDoc.execCommand("removeFormat");
			$(private.view.richTextArea).focus();
		},
		
		findAllUnknownWords: function() {
			var words = [];
			$(private.iframeDoc).find("[data-word~='unknown']").each(function() {
				var text = $(this).html() + "<br>";
				words.push(text);
			});
			return words;
		},

		markWordUnknown: function() {
			var selection = private.iframeDoc.getSelection();
			this.markSelectionWithDataAttribute("word", "unknown", selection);
			private.view.appendNewWords(this.findAllUnknownWords());
			$(private.view.richTextArea).focus();
		},
		
		markSelectionWithDataAttribute: function(dataAtribute, dataValue, selection) {
			var html = "<span data-"+dataAtribute+"='"+dataValue+"'>"+selection+"<sup>"+ (this.findAllUnknownWords().length + 1) +"</sup></span>";
			private.iframeDoc.execCommand("insertHTML", false, html);
		},
	};
	return Controller;
})();