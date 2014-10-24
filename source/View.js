function View() {
	this.postInformationDiv = this.produceSimpleDiv("postInfo");
	this.plainTextArea = this.producePlainTextArea();
	this.toolBar = this.produceSimpleDiv("toolBar");
	this.richTextArea = this.produceRichTextArea();
};

View.prototype = {
	assembleGUI: function() {
		var mainDiv = $("#textEditor");
		mainDiv.append(this.postInformationDiv);
		mainDiv.append(this.plainTextArea);
		mainDiv.append(this.toolBar);
		mainDiv.append(this.richTextArea);
		mainDiv.append(this.produceFooter());
	},
	
	produceSimpleDiv: function(id) {
		var divElement = $("<div id='"+id+"'></div>");
		return divElement;
	},
	
	producePostInformationTextField: function(label, inputAttributes) {
		var divElement = $("<div></div>");
		var labelElement = $("<label for='"+inputAttributes.id+"'>"+label+": </label>");
		var inputElement = $("<input>");
		inputElement.attr(inputAttributes);
		
		divElement.append(labelElement);
		divElement.append(inputElement);
		this.postInformationDiv.append(divElement);
	},
	
	producePlainTextArea: function(value) {
		var textAreaElement = $("<textarea id='plainTextArea' name='plainTextArea' style='width: 700px; height: 300px;'></textarea>");
		return textAreaElement;
	},
	
	produceToolbarButton: function(label, handler) {
		var button = $("<button>"+label+"</button>");
		button.click(handler);
		$(this.toolBar).append(button);
	},
	
	produceRichTextArea: function() {
		var iFrameElement = $("<iframe id='richTextContent' style='border: 1px solid black; width: 700px; height: 300px;'></iframe>");
		return iFrameElement;
	},
	
	produceFooter: function() {
		var paragraph = $("<p>Thanks to Nochum Sossonko and the JS Beautifier team for the html beautifier. <br>\n\
							The source code for that is available <a href='https://github.com/beautify-web/js-beautify'>here</a><br>\n\
							(double thanks, for teaching me some new Javscript syntax!)</p>");
		return paragraph;
	}
};