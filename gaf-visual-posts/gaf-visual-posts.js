// ==UserScript==
// @name        NeoGAF visual posts
// @namespace   com.github.toolbakery
// @description NeoGAF visual posts
// @include     http://*.neogaf.com/forum/showthread.php?*
// @version     1
// @run-at	document-start|document-end
// @grant       none
// ==/UserScript==

/*
###
## NeoGAF post highlighter
##
## colors posts about a specific topic
##
###
*/


var categories = [
    {
    	name : 'anime',
    	keywords : ['anime', 'jojo', 'naruto', 'gintama'],
    	color : 'blue',
    },
    {
    	name : 'wrestling',
    	keywords : ['wrestling', 'hogan', 'cena', 'new day', 'xavier', 'McMahon'],
    	color : 'green',
    },
    {
    	name : 'Max Payne',
    	keywords : ['payne', 'MP3'],
    	color : 'red',
    }
];

/**
 * unused function
 */
function getKeywordDict(cats){
	var dict = {};
	for each (category in cats) {
		for each (keyword in category.keywords) {
			dict[keyword] = category.color;
		}
	}
	return dict;
}

function highlight_categories(){
	for each (elem in document.getElementsByClassName('post')) {
		var post = String(elem.innerHTML).toLowerCase();
		for each (category in self.categories) {
			var modifiedStyleValue = "background-color:"+ category.color + ";";
			for each (keyword in category.keywords) {
				if (post.indexOf(keyword.toLowerCase()) > -1) {
					// rather add category name as class and define global css with the desired properties
					elem.style.backgroundColor = category.color;
					var catNameSpan = document.createElement("span");
					catNameSpan.appendChild(document.createTextNode("[" + category.name.toUpperCase() + "] "));
					elem.insertBefore(catNameSpan, elem.firstChild);
					break;
				}
			}
		}
	};
}

(function() {	
	highlight_categories();
})();
