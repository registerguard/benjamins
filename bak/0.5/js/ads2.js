//--------------------------------------------------------------------

/**
 * Register a new module.
 */

WOOF.register(function() {
	
	var api_source = 'http://testprojects.registerguard.com/',                                          // JSON API Fully Qualified Domain Name.
	ad_tag_head    = '',                                                                                 // OpenX <head> ad tag script
	ad_tag_open    = '',                                                                                 // Opening tag for the ad call
	ad_tag_close   = '',                                                                                // Closing tag for the ad call
	parent_section = $('meta[name=section]').attr("content").toLowerCase().replace(/ /g,'-'),            // Name of the parent section retreived from the meta attribute  - Name "Target"
	section        = $('meta[name=sub-section]').attr("content").toLowerCase().replace(/ /g,'-'), // Name of the section retreived from the meta attribute
	page_type      = $('meta[name=page-type]').attr("content").toLowerCase().replace(/ /g,'-'),       // Name of the page type retreived from the meta attribute
	break_loop     = 1,
	
	$units = {
		
		'mobile' : {
			
			'Leaderboard 320'        : $('#leaderboard_320-top'),
			'Medium Rectangle 1 300' : $('#medium_rectangle_1-mobile'),
			'Medium Rectangle 2 300' : $('#medium_rectangle_2-mobile')
			
		},
		
		'desktop' : {
			
			'Leaderboard 728'        : $('#leaderboard_728-top'),
			'Medium Rectangle 1 300' : $('#medium_rectangle_1-desktop'),
			'Medium Rectangle 2 300' : $('#medium_rectangle_2-desktop')
			
		}
		
	};
	
	if (section.length){
		
		api_source += '/manager/' + ((parent_section.length) ? parent_section  + ':' : '') + section + '/' + page_type + '/?callback=?';
	
	};
	
	//--------------------------------------------------------------------
	
	function successful(json) {
		
		$target     = json.target[0],
		target_name = $target.name,
		$aug        = $target.ad_group[0],
		aug_id      = $aug.aug_id,
		page_type   = $aug.page_type,
		queries     = [
		
			{
				context : ['alpha', 'bravo'],
				call_for_each_context : false,
				match : function(){
					
					ad_code('mobile', target_name, $aug, aug_id, page_type);
					
				}
			},
			{
				context : ['charlie','delta'],
				call_for_each_context : false,
				match : function(){
					
					ad_code('desktop', target_name, $aug, aug_id, page_type);
					
				}
			}
			
		];
		
		oMQ.init(queries);
		
	};
	
	//--------------------------------------------------------------------
	
	function ad_code(breakpoint, target_name, ad_aug, aug_id, page_type) {
		
		var time     = new Date().getTime(),
		rando        = '&cb=' + time + '"',  // OpenX's necessary cache buster variable.
		ad_tag_head  = '',
		ad_tag_open  = '',
		ad_tag_close = '';
		
		if (break_loop <= 2){
		
			$.each(ad_aug.ad, function(key,value){
				
				var $ad_type = value.ad_type[0],
				id           = value.id,
				name         = $ad_type.name,
				width        = $ad_type.width,
				height       = $ad_type.height,
				size         = width + ' x ' + height,
				tag          = $ad_type.tag_type,
				ad_unit      = $units[breakpoint][name + ' ' + width],
				comment      = target_name + ' | ' + name + ' | ' + size;
				
				// Switch between each different tag type
				switch (tag) {
					case '<iframe>':
						ad_tag_open  = '<iframe name="' + comment + '" src="http://ox-d.registerguard.com/w/1.0/afr?auid=';
						ad_tag_close = rando + 'width="' + width + '" height="' + height + '" frameBorder="0" frameSpacing="0" scrolling="no"><\/iframe>';
						break
					case '<script>':
						ad_tag_head  = '<script type="text/javascript" src="http://ox-d.registerguard.com/w/1.0/jstag"></script><script type="text/javascript">var OX = OX(); OX.addPage("' + aug_id + '"); OX.fetchAds();</script>';
						ad_tag_open  = '<script type="text/javascript">OX.showAdUnit("';
						ad_tag_close = '");</script>';
						break
					case '<img>':
						ad_tag_open  = '<img src="http://ox-d.registerguard.com/w/1.0/ai?auid=';
						ad_tag_close = rando + '>';
						break
					default:
						ad_tag_open  = '<iframe name="' + comment + '" src="http://ox-d.registerguard.com/w/1.0/afr?auid=';
						ad_tag_close = rando + 'width="' + width + '" height="' + height + '" frameBorder="0" frameSpacing="0" scrolling="no"><\/iframe>';
				}
				
				if ((typeof ad_unit !== 'undefined') && ad_unit.length) {ad_unit.html(ad_tag_open + id + ad_tag_close)}
			
			});
		
		}
		
		break_loop++;
		
	};
	
	//--------------------------------------------------------------------
	
	//----------------------------------
	// Use $.jsonp or $.getJSON?
	//----------------------------------
	
	if ($.jsonp) {
		
		/**
		 * Use @jaubourg's jQuery-JSONP plugin.
		 *
		 * @see rgne.ws/OEYxY2
		 */
		
		$.jsonp({
			url : api_source,
			cache : true,
			success : successful
		});
		
	} else {
		
		/**
		 * Use jQuery's $.getJSON.
		 *
		 * @see rgne.ws/S7EsQY
		 */
		
		$.getJSON(api_source, successful);
		
	}
	
}); // WOOF!

//--------------------------------------------------------------------