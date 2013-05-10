
var $widget  = $('#ads_box'),                              // Target `<div>` on template.
api_source   = 'http://testprojects.registerguard.com/', // JSON API Fully Qualified Domain Name.
url          = api_source + '/manager/entertainment:go-entertainment/story/?callback=all_ads';

$.getJSON('http://testprojects.registerguard.com/manager/entertainment:go-entertainment/story/?callback=?', function(data) {
	
  alert(data.target);
  
});