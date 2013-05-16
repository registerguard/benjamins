//----------------------------------

// Notes to self:
//console.profile('profile foo');
// ... code here ...
//console.profileEnd('profile foo');
// ... or:
// console.time('timing foo');
// ... code here ...
// console.timeEnd('timing foo');

//----------------------------------

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
		
		/**
		 * Init constructor.
		 *
		 * @type { function }
		 * @param { object } opts Options object literal.
		 * @this { object.jquery }
		 * @return { object.jquery } Returns target object(s) for chaining purposes.
		 */
		
		init : function(options) {
			
			console.log('init called');
			
			//----------------------------------
			// Loop & return each this:
			//----------------------------------
			
			return this.each(function() {
				
				//----------------------------------
				// Declare/initialize:
				//----------------------------------
				
				var $this = $(this),        // Target object.
				    data  = $this.data(NS), // Namespace instance data.
				    settings;
				
				//----------------------------------
				// Data?
				//----------------------------------
				
				if ( ! data) {
					
					//----------------------------------
					// Initialize:
					//----------------------------------
					
					settings  = $.extend({}, defaults, options); // Merge defaults and options.
					
					//----------------------------------
					// Namespaced instance data:
					//----------------------------------
					
					$this.data(NS, {
						
						init     : false,
						settings : settings,
						target   : $this
						
					});
					
					//----------------------------------
					// Easy access:
					//----------------------------------
					
					data = $this.data(NS);
					
				}
				
				//----------------------------------
				// Data initialization check:
				//----------------------------------
				
				if ( ! data.init) {
					
					//----------------------------------
					// Call main:
					//----------------------------------
					
					_main.call($this, data);
					
				} else {
					
					//----------------------------------
					// Ouch!
					//----------------------------------
					
					console.warn('jQuery.' + NS, 'thinks it\'s already initialized on', this);
					
					//return this; // Needed?
					
				}
				
			});
			
		}, // init
		
		//----------------------------------
		
		/**
		 * Removes plugin from element.
		 *
		 * @type { function }
		 * @this { object.jquery }
		 * @return { object.jquery } Returns target object(s) for chaining purposes.
		 */
		
		destroy : function() {
			
			//----------------------------------
			// Loop & return each this:
			//----------------------------------
			
			return this.each(function() {
				
				//----------------------------------
				// Declare/initialize:
				//----------------------------------
				
				var $this = $(this),
				    data  = $this.data(NS);
				
				//----------------------------------
				// Data?
				//----------------------------------
				
				if (data) {
					
					// Remove setups here.
					
					//----------------------------------
					// Namespaced instance data:
					//----------------------------------
					
					$this.removeData(NS); // Move along. Nothing to see here.
					
				}
				
			});
			
		} // destroy
		
	}, // methods
	
	//--------------------------------------------------------------------------
	//
	// Private methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Called after plugin initialization.
	 *
	 * @private
	 * @type { function }
	 * @this { object.jquery }
	 */
	
	_main = function(data) {
		
		//----------------------------------
		// Data?
		//----------------------------------
		
		if (typeof data == 'undefined') {
			
			//----------------------------------
			// Attempt to determine data:
			//----------------------------------
			
			data = this.data(NS);
			
		}
		
		//----------------------------------
		// Data?
		//----------------------------------
		
		if (data) {
			
			//----------------------------------
			// Yup!
			//----------------------------------
			
			data.init = true; // Data initialization flag.
			
			//----------------------------------
			// Callback:
			//----------------------------------
			
			data.settings.onInit.call(data.target);
			
			// Do stuff here ... For example:
			
			if (data.settings.api && data.settings.section) {
				
				// Add '&cache=busted' to the end of the uri for testing newly added ads:
				// var uri = settings.api + (settings.parent ? settings.parent + ':' : '') + settings.section + '/' + (settings.page ? settings.page + '/' : '') + '?callback=?&cache=busted';
				
				// For [TEST]ing:
				var uri = '../../demo/js/news.jsonp';
				
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
							console.log('json success');
							_success(data.settings, json);
						}
					});
					
				} else {
					
					/**
					 * Use jQuery's $.getJSON.
					 *
					 * @see rgne.ws/S7EsQY
					 */
					
					$.getJSON(uri, function (json) {
						_success(data.settings, json);
					});
					
				}
				
			} else {
				
				console.warn('Options "api" and "section" are requried.');
				
			}
			
			//----------------------------------
			// Callback:
			//----------------------------------
			
			data.settings.onAfterInit.call(data.target);
			
		}
		
	}, // _main
	
	_breakChange = function(mqC, json) {
		
		var one, two, three, four = '',
		    a      = 'alpha',
		    b      = 'bravo',
		    c      = 'charlie',
		    d      = 'delta',
		    OX     = [],
		    OX_ads = OX(),
		    flag   = 1;
		
		if ( !mqC.matches ) { one = a, two = b, three = c, four = d;}
		else {one = c, two = d, three = a, four = b; }
		
		if (flag <= 2){
			
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
		
	}, // breakChange
	
	_success = function(data, json) {
		
		console.log('success called');
		
		if (window.matchMedia) {
			
			// Establishing media match at [C]harlie
			var mqC = window.matchMedia('only screen and (min-width: 1005px)');
			
			// Call the breakpoint change? function
			_breakChange(mqC, json);
			
			// Add a listener to [C]harlie breakpoint
			mqC.addListener(_breakChange);
			
		} else{
			
			console.warn('MatchMedia is not supported');
			
		}
		
	}; // _success
	
	//--------------------------------------------------------------------------
	//
	// Method calling logic:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Boilerplate plugin logic.
	 *
	 * @constructor
	 * @see rgne.ws/OvKpPc
	 * @type { function }
	 * @param { string } method String method identifier.
	 * @return { method } Calls plugin method with supplied params.
	 */
	
	$.fn[NS] = function(method) {
		
		if (methods[method]) {
			
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if ((typeof method == 'object') || ( ! method)) {
			
			return methods.init.apply(this, arguments);
			
		} else {
			
			$.error('jQuery.' + NS + ' thinks that ' + method + ' doesn\'t exist');
			
		}
		
	}; // $.fn[NS]
	
}(jQuery, window, document));
