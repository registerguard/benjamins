/**
 * Register a new module.
 */

WOOF.register(function() {
	
	var ads = (function() {
		
		//----------------------------------
		// Local private variable(s):
		//----------------------------------
		
		var api_source = 'http://testprojects.registerguard.com/',                                    // JSON API Fully Qualified Domain Name.
		ad_tag_head    = '',                                                                          // OpenX <head> ad tag script
		ad_tag_open    = '',                                                                          // Opening tag for the ad call
		ad_tag_close   = '',                                                                          // Closing tag for the ad call
		rando          = new Date().getTime(),                                                        // Random Number for ad tags, just generates the current time
		rando          = '&cb=' + rando + '"',                                                        // Re-assigns "rando" to use OpenX's cachebuster querystring
		parent_section = $('meta[name=section]').attr("content").toLowerCase().replace(/ /g,'-'),     // Name of the parent section retreived from the meta attribute
		section        = $('meta[name=sub-section]').attr("content").toLowerCase().replace(/ /g,'-'), // Name of the section retreived from the meta attribute
		page_type      = $('meta[name=page-type]').attr("content").toLowerCase().replace(/ /g,'-'),   // Name of the page type retreived from the meta attribute
		break_loop     = 1                                                                            // Variable used to instantiate the # of "loops" through each breakpoint size

		
		if (section.length){
		
			if (parent_section.length) api_source = api_source + '/manager/' + parent_section + ':' + section + '/' + page_type + '/?callback=?'
			else api_source = api_source + '/manager/' + section + '/' + page_type + '/?callback=?'
		
		}
				
		//--------------------------------------------------------------------
		
		/**
		 * Called if successful API request has been made.
		 *
		 * @param { object } The JSON object returned from the server.
		 *
		 * NOTE: The image tag needs to be revised to account for the wrapper link. This needs to be tested using JS variables.
		 */
		
		function successful(json) {

			// Append `html` to widget:
			
			var $object = json[0].target[0];
			
			// Loop through each ag group within the target
			for (var ag = 0; ag < $object.ad_group.length; ag++) {
				
				var ad_group = $object.ad_group[ag],
				ad_group_id  = ad_group.aug_id
				
				// Loop through each ad within each ad group
				for (var ad = 0; ad < $object.ad_group[ag].ad.length; ad++) {
					
					var ad_unit = $object.ad_group[ag].ad[ad],                // Object of each ad
					id          = ad_unit.id,                                 // Value of the ad's ID
					ad_type     = ad_unit.ad_type[0],                         // Object of each ad's ad type
						name    = ad_type.name,                               // Name of the ad's size (ex: Leaderboard)
						width   = ad_type.width,                              // Value of the ad's width
						height  = ad_type.height,                             // Value of the ad's height
						tag     = ad_type.tag_type[0].name,                   // Name of the ad's tag type
					full_name   = name.toLowerCase().replace(/ /g,'_'),       // Name of the IAB ad size in lowercase and w/o spaces
					comment     = $object.name + ' | ' + name + ' | ' + width // Name of the ad to be placed within each tag's name attribute
					
					// Switch between each different tag type
					switch (tag) {
						case '<iframe>':
							ad_tag_open  = '<iframe name="' + comment + '" src="http://ox-d.registerguard.com/w/1.0/afr?auid=';
							ad_tag_close = rando + 'width="' + width + '" height="' + height + '" frameBorder="0" frameSpacing="0" scrolling="no"><\/iframe>';
							break
						case '<script>':
							ad_tag_head  = '<script type="text/javascript" src="http://ox-d.registerguard.com/w/1.0/jstag"></script><script type="text/javascript">var OX = OX(); OX.addPage("' + ad_group_id + '"); OX.fetchAds();</script>';
							ad_tag_open  = '<script type="text/javascript">OX.showAdUnit("';
							ad_tag_close = '");</script>';
							break
						case '<img>':
							ad_tag_open  = '<img src="http://ox-d.registerguard.com/w/1.0/ai?auid=';
							ad_tag_close = rando + '>';
							break
					}
					
					if (width == 300){
						
						$('#' + full_name + '-mobile' ).append(ad_tag_open + id + ad_tag_close);
						$('#' + full_name + '-desktop').append(ad_tag_open + id + ad_tag_close);
						
					}
					else if ((width == 728) || (width == 320)){
						
						full_name = full_name + '_' + width + '-top';
						$('#' + full_name).append(ad_tag_open + id + ad_tag_close);
						
					}
					else{
						
						$('#' + full_name).append(ad_tag_open + id + ad_tag_close);

					}
																				
				}
								
			}
				
		} // successful()
		
		//--------------------------------------------------------------------
		
		return {
			
			/**
			 * Initializes module.
			 *
			 * @constructor
			 */
			
			init : function() {
				
				//----------------------------------
				// Check for container's existence:
				//----------------------------------
				
				if ($('#bd_content').length) {
					
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
					
				}
				
			} // init()
			
		};
		
	})(); // ads
	
	ads.init();
	
}); // WOOF!