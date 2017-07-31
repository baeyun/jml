/*
 * JML v1.0 (beta)
 * Description: A super-lightweight (~2.18kB) JavaScript markup language
 * Author: Bukhari Muhammad (bukharim96@gmail.com)
 * Contributors:  Abdullahi Muhammad (alimohamuda80@gmail.com)
 */

(function() {
	var elements = ['a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdi','bdo','bgsound','big','blink','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','command','content','data','datalist','dd','del','details','dfn','dialog','dir','div','dl','dt','element','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i','iframe','image','img','input','ins','isindex','kbd','keygen','label','legend','li','link','listing','main','map','mark','marquee','menu','menuitem','meta','meter','multicol','nav','nobr','noembed','noframes','noscript','object','ol','optgroup','option','output','p','param','picture','plaintext','pre','progress','q','rp','rt','rtc','ruby','s','samp','script','section','select','shadow','slot','small','source','spacer','span','strike','strong','style','sub','summary','sup','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','tt','u','ul','var','video','wbr','xmp'],
		forbiddenElements = ['html','head','meta','title','link','body'],
		jml = {
			modal: function() {
				var modals = document.querySelectorAll('[jmlModal]');

				modals.forEach(function(modal) {
					modal.oninput = function(e) {
						e.preventDefault();

						var modalVar = modal.attributes.jmlModal.value;

						window[modalVar] = modal.value;
						document.querySelectorAll('[jmlBind="' + modalVar + '"]').forEach(function(bind) {
							bind.innerHTML = modal.value;
						});
					};
				});
			},
			interpretElement: function(elName, elArgs) {
				var el = document.createElement(elName);

				for (key in elArgs) {
					if (elArgs[key].constructor == Object) { // attr
						for (k in elArgs[key]) {
							el.setAttribute(k, elArgs[key][k]);
						}
					} else {
						el.innerHTML += elArgs[key];
					}
				}

				return el.outerHTML;
			},
			initElements: function() {
				document.querySelectorAll('jml').forEach(function(el) {
					el.setAttribute('hidden', true);
				});
				
				elements.forEach(function(el) {
					window['$' + el] = function() {
						var elName = el,
							elArgs = arguments;

						return jml.interpretElement(elName, elArgs);
					};
				});
			},
			initConditionals: function() {
				window['$if'] = function(c, cTrue, cFalse) {
					if (c) {
						return cTrue;
					} else {
						if (cFalse)
							return cFalse;
					};
				};
			},
			// THE LOOPS AINT' GOING WELL
			initLoops: function() {
				// @todo - allow edit of the conditions
				window['$for'] = function(toIterate) {
					var iteration = null;

					for (var i = 0; i < 5; i++) {
						if (!iteration) {
							iteration = toIterate;
						} else {
							iteration += toIterate;
						};
					};

					return iteration;
				};
				
				// @todo - figure it out!
				window['$while'] = function(c, toIterate) {
					var iteration = null;

					while(c) {
						if (!iteration) {
							iteration = toIterate;
						} else {
							iteration += toIterate;
						};
					}

					return iteration;
				};
			},
			interpret: function() {
				document.querySelectorAll('jml').forEach(function(el) {
					if (el.hasAttribute('replace')) {
						el.outerHTML = eval(el.textContent);
					} else {
						el.innerHTML = eval(el.textContent);
					};
					
					el.removeAttribute('hidden');
				});
			},
			run: function() {

				// Initialize JML Conditionals
				jml.initConditionals();

				// Initialize JML Conditionals
				jml.initLoops();

				// Initialize JML HTML Elements
				jml.initElements();
				
				// Live data update like mostache.js
				jml.modal();

				// Interpret the <jml> tag
				jml.interpret();
			}
		};

	// Run JML
	jml.run();
})();