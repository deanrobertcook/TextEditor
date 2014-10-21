function View() {
	this.fieldHooks = [];
};

View.prototype = {
	produceGUI: function($pageHook) {
		$pageHook.append(this.produceInputTextField("title", "Title: "));
		$pageHook.append(this.produceInputTextField("author", "Author: "));
		$pageHook.append(this.produceTextArea());
		$pageHook.append(this.produceToolBar());
		$pageHook.append(this.produceIFrame());
		$pageHook.append(this.produceSubmitButton());
	},
	
	produceInputTextField: function(id, label, value) {
		value = value || "";
		this.fieldHooks.push("#" + id);
		
		var html = [
			'<div>',
				'<label for="'+id+'">'+label+'</label>',
				'<input id="'+id+'" name="'+id+'" type="text" value="'+value+'">',
			'</div>'
		].join('\n');
		
		return html;
	},
	
	produceToolBar: function() {
		var html = [
			'<div>',
				'<button id="orderedListButton">OL</button>',
				'<button id="unorderedListButton">UL</button>',
				'<button id="createLinkButton">Link</button>',
			'</div>'
		].join('\n'); 
		return html;
	},
	
	produceTextArea: function(value) {
		value = value || "";
		var id = "plainTextContent";
		this.fieldHooks.push("#" + id);
		return	"<textarea id='"+id+"' name='"+id+"' style='width: 700px; height: 300px;'>" +
				"</textarea>";
	},
	
	produceIFrame: function() {
		var id = "richTextContent";
		this.fieldHooks.push("#content");
		return	"<iframe id='"+id+"' name='"+id+"' style='border: 1px solid black; width: 700px; height: 300px;'></iframe>";
	},
	
	produceSubmitButton: function() {
		var id = "submit";
		this.fieldHooks.push("#content");
		var html = [
				'<input id="'+id+'" name="'+id+'" type="button" value="Submit Data">'
		].join('\n');
		return html;
	}
};