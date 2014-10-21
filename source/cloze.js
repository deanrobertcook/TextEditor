/**
 * 
 */
$(document).ready(function() {
	
	
	/*var options = {
			endings 	: false,
			nouns 		: false,
			adjectives 	: false,
			verbs 		: false,
	};*/
	
	var wordsToChange = {
			"ein"	: /\bm?d?s?k?eine?(en)?(er)?(es)?(em)?\b/gi, //regexes don't need quotes
			"der" : /\bd(er)?(ie)?(as)?(en)?(em)?(es)?\b/gi,
			"jeder" : /\bjede?(en)?(er)?(es)?(em)?\b/gi,
			"dies" : /\bdiese?(en)?(er)?(es)?(em)?\b/gi,
			"unser" : /\bunsere?(en)?(er)?(es)?(em)?\b/gi,
			"euer" : /\beue?re?(en)?(er)?(es)?(em)?\b/gi,
			"ihr" : /\bihre?(en)?(er)?(es)?(em)?\b/gi,
	};

	/*$('.options').click(function() {
		var $this = $(this);
		
		if ($this.is(':checked')) {
			options[$this.attr('id')] = true;
		} else {
			options[$this.attr('id')] = false;
		}
	});*/
	
	$("#generateButton").click(function() {
		var text = $("#mainTextArea").val();
		var wordsRemoved = Array();
		var wordsRemovedIndex = 0;
		
		for ( var word in wordsToChange) {
			var amountToLeave;
			switch (word) {
			case "dies":
				amountToLeave = 4;
				break;
			case "jeder":
				amountToLeave = 3;
				break;
			case "euer":
				amountToLeave = 2;
				break;
			case "ihr":
				amountToLeave = 3;
				break;
			case "unser":
				amountToLeave = 5;
				break;
			default:
				amountToLeave = 1;
				break;
			}
			
			var regex = wordsToChange[word];
			
			var subWords = text.match(regex);
			
			console.log(subWords);
			
			if (subWords != null) {
				for (var i = 0; i < subWords.length; i++) {
					text = text.replace(subWords[i], 
							'<span class="someWord" id="wordIndex' + wordsRemovedIndex + '">' + subWords[i].substr(0, amountToLeave) + "__</span>");
					wordsRemovedIndex++;
					wordsRemoved.push(subWords[i]);
				}
			}
		}
		
		console.log(wordsRemoved);
		$("#mainTextArea").replaceWith(
				'<div id="testArea">' + text + '</div>'
		);
		
		$(document).on('click', '.someWord', function() {
			var id = $(this).attr("id");
			id = id.substring(9, id.length);
			console.log(id);
			$(this).replaceWith(wordsRemoved[id]);
		});
	});
});


