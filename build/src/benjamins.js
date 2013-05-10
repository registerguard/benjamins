(function($, window, document, undefined) {
	
	/**
	 * Function-level strict mode syntax.
	 *
	 * @see rgne.ws/XcZgn8
	 */
	
	'use strict';
	
	//--------------------------------------------------------------------------
	//
	// Local "globals":
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Javascript console.
	 *
	 * @see rgne.ws/12p2bvl
	 */
	
	var console = window.console || { log : function() {}, warn : function() {} },
	
	//----------------------------------
	
	/**
	 * The plugin namespace.
	 */
	
	NS = 'benjies',
	
	//--------------------------------------------------------------------------
	//
	// Defaults and settings:
	//
	//--------------------------------------------------------------------------
	
	defaults = {
		
		api     : 'http://advertising.registerguard.com/manager/',
		parent  : '',
		section : '',
		page    : ''
		
	}, // defaults
	
	//--------------------------------------------------------------------------
	//
	// Public methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Methods object.
	 *
	 * @type { object }
	 */
	
	methods = {
		
		init : function(options) {
			
			var settings = $.extend({}, defaults, options);
			
			if (settings.api && settings.section) {
				
				// Add '&cache=busted' to the end of the uri for testing newly added ads:
				// var uri = settings.api + (settings.parent ? settings.parent + ':' : '') + settings.section + '/' + (settings.page ? settings.page + '/' : '') + '?callback=?&cache=busted';
				
				// For [TEST]ing:
				var uri = '../demo/js/news.jsonp';
				
				if ($.jsonp) {
					
					/**
					 * Use @jaubourg's jQuery-JSONP plugin.
					 *
					 * @see rgne.ws/OEYxY2
					 */
					
					$.jsonp({
						url : uri,
						cache : true,
						callback: 'caller', // <-- for [TEST]ing
						success : function (json) {
							success(settings, json);
						}
					});
					
				} else {
					
					/**
					 * Use jQuery's $.getJSON.
					 *
					 * @see rgne.ws/S7EsQY
					 */
					
					$.getJSON(uri, function (json) {
						success(settings, json);
					});
					
				}
				
			} else {
				
				console.warn('Options "api" and "section" are requried.');
				
			}
			
		}
		
	},
	
	success = function(settings, json) {
		
		(function () {
			
			var flag = 1;
			
			if (window.matchMedia) {
				
				// Establishing media match at [C]harlie
				var mqC = window.matchMedia('only screen and (min-width: 1005px)');
				
				// Call the breakpoint change? function
				breakChange(mqC);
				
				// Add a listener to [C]harlie breakpoint
				mqC.addListener(breakChange);
				
			} else{
				
				console.warn('MatchMedia is not supported');
				
			}
			
			function breakChange (mqC) {
				
				var one, two, three, four = '',
				a     = 'alpha',
				b     = 'bravo',
				c     = 'charlie',
				d     = 'delta';
				
				!mqC.matches ? (one = a, two = b, three = c, four = d) : (one = c, two = d, three = a, four = b);
				
				if (flag <= 2){
					
					var OX_ads = OX();
					
					$.each(json.target, function(key, target) {
						
						OX_ads.addPage(target.ad_group[0].aug_id);
						
						$.each(target.ad_group[0].ad, function(k, ad) {
							
							var screen = ad.ad_type[0].screen[0];
							
							if (screen[a] && screen[b] && screen[c] && screen[d] && flag ==1){
								
								if ($('#' + ad.ad_type[0].slug).length){ OX_ads.setAdUnitSlotId(ad.id, ad.ad_type[0].slug); }
								
							} else{
								
								if (screen[one] && screen[two] && !screen[three] && !screen[four]){
									
									if ($('#' + ad.ad_type[0].slug).length){ OX_ads.setAdUnitSlotId(ad.id, ad.ad_type[0].slug); }
									
								}
								
							} // screen check
							
						}); // ad loop
						
					}); // target loop
					
					OX_ads.load();
					
				}
				
				flag++;
				
			}
			
		})();
		
	};
	
	$.ad_manager = function(method) {
		
		if (methods[method]) {
			
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if ((typeof method === 'object') || ( ! method)) {
			
			return methods.init.apply(this, arguments);
			
		} else {
			
			$.error('Method ' + method + ' does not exist on jQuery.ad_manager.');
			
		}
		
	};
	
}(jQuery, window, document));
