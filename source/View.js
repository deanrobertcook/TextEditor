function View() {
	this.postInfoFields = [];
	this.plainTextArea = this.producePlainTextArea();
	this.plainToolBar = this.produceSimpleDiv("plainToolBar");
	this.richToolBar = this.produceSimpleDiv("richToolBar");
	this.richTextArea = this.produceRichTextArea();
	this.newWordsArea = this.produceSimpleDiv("newWordsArea");
};

View.prototype = {
	assembleGUI: function() {
		var mainDiv = $("#textEditor");
		mainDiv.append(this.producePostInfoDiv());
		
		var plainEditColumn = $("<div id='plainEditColumn'></div>");
		plainEditColumn.append(this.plainToolBar);
		plainEditColumn.append(this.plainTextArea);
		mainDiv.append(plainEditColumn);
		
		var richEditColumn = $("<div id='richEditColumn'></div>");
		richEditColumn.append(this.richToolBar);
		richEditColumn.append(this.richTextArea);
		mainDiv.append(richEditColumn);
		
		mainDiv.append(this.newWordsArea);
		
		mainDiv.append(this.produceFooter());
	},
	
	produceSimpleDiv: function(id) {
		var divElement = $("<div id='"+id+"'></div>");
		return divElement;
	},
	
	producePostInfoDiv: function() {
		var fields = this.postInfoFields;
		var leftColumn = this.produceSimpleDiv("postInfoLeft");
		var rightColumn = this.produceSimpleDiv("postInfoRight");
		for (var i = 0; i < fields.length; i ++) {
			if (i < fields.length/2) {
				leftColumn.append(fields[i]);
			} else {
				rightColumn.append(fields[i]);
			}
		}
		var postInfoDiv = this.produceSimpleDiv("postInfo");
		postInfoDiv.append(leftColumn);
		postInfoDiv.append(rightColumn);
		return postInfoDiv;
	},
	
	producePostInformationTextField: function(label, inputAttributes) {
		var divElement = $("<div></div>");
		var labelElement = $("<label for='"+inputAttributes.id+"'>"+label+": </label>");
		var inputElement = $("<input>");
		inputElement.attr(inputAttributes);
		
		divElement.append(labelElement);
		divElement.append(inputElement);
		this.postInfoFields.push(divElement);
	},
	
	produceToolbarButton: function(toolbar, label, handler) {
		var button = $("<button>"+label+"</button>");
		button.click(handler);
		$(this[toolbar+"ToolBar"]).append(button);
	},
	
	producePlainTextArea: function(value) {
		var textAreaElement = $("<textarea id='plainTextArea' name='plainTextArea'></textarea>");
		return textAreaElement;
	},
	
	produceRichTextArea: function() {
		var iFrameElement = $("<iframe id='richTextArea'></iframe>");
		return iFrameElement;
	},
	
	produceFooter: function() {
		var paragraph = $("<div id='footer'><p>Thanks to Nochum Sossonko and the JS Beautifier team for the html beautifier. <br>\n\
							The source code for that is available <a href='https://github.com/beautify-web/js-beautify'>here</a><br>\n\
							(double thanks, for teaching me some new Javscript syntax! - the IIFE)</p></div>");
		return paragraph;
	},
	
	appendNewWords: function(wordsList) {
		this.newWordsArea.empty();
		$(wordsList).each(function(index, word) {
			this.newWordsArea.append(word);
		}.bind(this));
	},	
};