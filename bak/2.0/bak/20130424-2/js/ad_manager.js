/*
	@TODO:
		1. Optimize variables (i.e. go back to putting JSON vars in JS vars).
		2. Add comments, Micky style.
		3. ...
*/
;(function($, window, document, undefined) {
	
	// "use strict";
	
	var console = window.console || { log : function() {}, warn : function() {} },
	
	defaults = {
		
		api     : 'http://advertising.registerguard.com/manager/',
		parent  : '',
		section : '',
		page    : '',
		cb      : (Math.round(Math.random() * 10000000000000000)),
		
		// Should we move these to the JSON?
		units : {
			
			mobile : {
				
				'mobile-banner'      : '#mobile_banner-top',
				'medium-rectangle-1' : '#medium_rectangle_1-mobile',
				'medium-rectangle-2' : '#medium_rectangle_2-mobile',
				'homepage-block-1'   : '#homepage_block_1-mobile',
				'homepage-block-2'   : '#homepage_block_2-mobile',
				'homepage-block-3'   : '#homepage_block_3-mobile',
				'ros_column-block'   : '#column_block-mobile',
				'ros_mobile-banner'  : '#mobile_banner-bottom'
				
			},
			
			desktop : {
				
				'leaderboard'        : '#leaderboard-top',
				'leaderboard_asynchronous' : '#leaderboard-top',
				'medium-rectangle-1' : '#medium_rectangle_1-desktop',
				'medium-rectangle-2' : '#medium_rectangle_2-desktop',
				'homepage-block-1'   : '#homepage_block_1-desktop',
				'homepage-block-2'   : '#homepage_block_2-desktop',
				'homepage-block-3'   : '#homepage_block_3-desktop',
				'ros_column-block'   : '#column_block-desktop',
				'ros_leaderboard'    : '#leaderboard-bottom',
				'ros_button'         : '#button'
				
			},
			
			ros : {
				
				'custom-1'    : '#custom_1',
				'half-banner' : '#half_banner'
				
			}
			
		}
		
	},
	
	methods = {
		
		init : function(options) {
			
			var settings = $.extend({}, defaults, options);
			
			if (settings.api && settings.section) {
				
				// Add '&cache=busted' to the end of the uri for testing newly added ads:
				// var uri = settings.api + (settings.parent ? settings.parent + ':' : '') + settings.section + '/' + (settings.page ? settings.page + '/' : '') + '?callback=?&cache=busted';
				
				// For [TEST]ing:
				var uri = '../js/news.jsonp';
				
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
			
			function breakChange (mqItem) {
				
				// ad_code() doesn't really matter
				
				if (flag <= 2){
					
					mqItem.matches ? console.log('DESKTOP') : console.log('MOBILE');
					
					$.each(json.target, function(key, target) {
						
						if(target.slug != 'ros'){
							
							console.log('THIS IS:', target.name);
							
						} else{
							
							console.log('ROS Ads');
							
						}
						
						// ad_code(settings, 'mobile', target, flag);
						
						
					});
					
					// The html element with the id has to be present,
					// otherwise the whole script fails, so use a jQuery
					// if check at the start of each ad call
					var OX_ads = OX();
					OX_ads.addPage("13787");
					if ($('#leaderboard-1').length > 0)      OX_ads.setAdUnitSlotId("304106","leaderboard-1");
					if ($('#medium-rectangle-1').length > 0) OX_ads.setAdUnitSlotId("304108","medium-rectangle-1");
					if ($('#medium-rectangle-2').length > 0) OX_ads.setAdUnitSlotId("304109","medium-rectangle-2");
					OX_ads.load();
					
				}
				
				flag++;
			}
			
		})();
		
	},
	
	ad_code = function(settings, breakpoint, target, flag, OX_array) {
		
		// For >> TEST << Purposes:
		console.log('ad_code BREAKPOINT:', breakpoint + ' | target name: ' + target.slug);
		
		$.each(target.ad_group[0].ad, function(key, value) {
			
			var ad_unit = '';
			
			if (target.slug === 'ros'){
				
				// ROS:
				ad_unit = ((flag === 1) && ((value.ad_type[0].slug === 'custom-1') || (value.ad_type[0].slug === 'half-banner'))) ? $(settings.units.ros[value.ad_type[0].slug]) : $(settings.units[breakpoint]['ros_' + value.ad_type[0].slug]);
				
			} else {
				
				// Normal:
				ad_unit = $(settings.units[breakpoint][value.ad_type[0].slug]);
				
			}
			
			if ((typeof ad_unit !== 'undefined') && ad_unit.length) {
				
				var open = '',
				close    = '';
				//head   = ''; // See below.
				
				switch (value.ad_type[0].tag_type) {
					
					case '<iframe>':
						
						// open  = '<iframe src="http://ox-d.registerguard.com/w/1.0/afr?auid=';
						// close = '&cb=' + settings.cb + '"' + 'width="' + value.ad_type[0].width + '" height="' + value.ad_type[0].height + '" frameBorder="0" frameSpacing="0" scrolling="no"><\/iframe>';
						
						open  = '<p>';
						close = '</p>';
						
						break;
					
					case '<script>':
						
						OX_array.setAdUnitSlotId(value.id, 'leaderboard-top');
						
						break;
					
					case '<img>':
						
						open  = '<img src="http://ox-d.registerguard.com/w/1.0/ai?auid=';
						close = '&cb=' + settings.cb + '"' + '>';
						
						break;
					
					default:
						
						// IBID.
						open  = '<iframe src="http://ox-d.registerguard.com/w/1.0/afr?auid=';
						close = '&cb=' + settings.cb + '"' + 'width="' + value.ad_type[0].width + '" height="' + value.ad_type[0].height + '" frameBorder="0" frameSpacing="0" scrolling="no"><\/iframe>';
					
				}
				
				ad_unit.html(open + value.id + close);
				
				// For >> TEST << Purposes:
				console.log('ad_code TARGET:', target.slug, ' | ', value.ad_type[0].name, ' | ', value.ad_type[0].width, 'x', value.ad_type[0].height, ' | ', value.id);
				
			}
			
		});
		
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
