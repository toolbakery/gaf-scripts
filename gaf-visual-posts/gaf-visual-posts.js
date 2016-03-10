// ==UserScript==
// @name        NeoGAF visual posts
// @namespace   com.github.toolbakery
// @description NeoGAF visual posts
// @include     http://*.neogaf.com/forum/showthread.php?*
// @version     1
// @run-at      document-start|document-end
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


var categories = {
    posts: [{
        name: 'anime',
        keywords: ['anime', 'jojo', 'naruto', 'gintama'],
        color: 'blue',
    }, {
        name: 'wrestling',
        keywords: ['wrestling', 'hogan', 'cena', 'new day', 'xavier', 'McMahon'],
        color: 'green',
    }, {
        name: 'Max Payne',
        keywords: ['payne', 'MP3'],
        color: 'red',
    }, ],
    poster: [{
        name: 'GB Staff',
        keywords: ['rudds', 'bionicpuppy', 'wreckthelaw', 'monsterdunk', 'danryckert'],
        color: 'yellow',
    }, ]
};

function modifyElement(elem, category) {
    descriptiveText = "[" + category.name.toUpperCase() + "]";
    var catNameSpan;
    gvpElements = elem.getElementsByClassName("gvp");
    if (gvpElements.length > 0) {
        // span already exists
        catNameSpan = gvpElements[0];
    } else {
        catNameSpan = document.createElement("span");
        catNameSpan.classList.add("gvp");
        elem.insertBefore(catNameSpan, elem.firstChild);
    }
    // rather add category name as class and define global css with the desired properties
    elem.style.backgroundColor = category.color;
    if (String(catNameSpan.innerHTML).indexOf(descriptiveText) == -1) {
        catNameSpan.appendChild(document.createTextNode(descriptiveText));
    }
}

function highlight(elements, definitions) {
    for each(elem in elements) {
        var textToAnalyze = String(elem.innerHTML).toLowerCase();
        for each(category in definitions) {
            for each(keyword in category.keywords) {
                if (textToAnalyze.indexOf(keyword.toLowerCase()) > -1) {
                    modifyElement(elem, category);
                    // one keyword matched, no need to check others
                    break;
                }
            }
        }
    };

}

function highlight_categories() {
    highlight(document.getElementsByClassName('postbit-details-username'), categories.poster);
    highlight(document.getElementsByClassName('post'), categories.posts);
}

(function() {
    highlight_categories();
})();
