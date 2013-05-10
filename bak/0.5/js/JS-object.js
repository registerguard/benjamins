// JavaScript Document... no duh Dreamweaver

// Naming Conventions (practical code below)
$units = {
	
	$target_parent_$target : {													// $Target parent name value _$ Target name value
		
		comment  : 'TARGET PARENT | Target',											// Target __unicode__ name value
		
		pagetype : {														// PageType name value (Section)
			
			comment : 'TARGET PARENT | Target | PageType',								// AdGroup __unicode__ name value
			aug_id  : 'AdGroup aug_id',											// AdGroup aud_id value (shown as string here, really an iteger)
				
			leaderboard_728 : {												// AdType name value
				
				comment : 'TARGET PARENT | Target | PageType | AdType name | AdType width x AdType height',	// Ad __unicode__ name value
				width   : 'AdType width',										// AdType width value (shown as string here, really an iteger)
				height  : 'AdType height',										// AdType height value (shown as string here, really an iteger)
				id      : 'Ad ad_id'											// Ad ad_id value (shown as string here, really an iteger)
				
			}
			
		},
		
		pagetype : {														// PageType name value (Story)
			
			comment : 'TARGET PARENT | Target | PageType',								// [ START ] Same as Above
			aug_id  : 'AdGroup aug_id',
				
			leaderboard_728 : {
																	//	↑
				comment : 'TARGET PARENT | Target | PageType | AdType Name | AdType width x AdType height',	//	↓
				width   : 'AdType width',
				height  : 'AdType height',
				id      : 'Ad ad_id'
				
			}
			
		}															//	[ END ] Same as Above
		
	}
	
}


// 2 Real world examples:
$units = {
	
	$sports_$local : {
		
		comment : 'SPORTS | Local',
		
		section : {
			
			comment : 'SPORTS | Local | Section',
			aug_id  : 13733,
				
			leaderboard_728 : {
				
				comment : 'SPORTS | Local | Section | Leaderboard | 728 x 90',
				width   : 728,
				height  : 90,
				id      : 302407
				
			},
			
			leaderboard_320 : {
				
				comment : 'SPORTS | Local | Section | Leaderboard | 320 x 50',
				width   : 320,
				height  : 50,
				id      : 302408
				
			},
			
			medium_rectangle_1 : {
				
				comment : 'SPORTS | Local | Section | Medium Reactangle 1 | 300 x 250',
				width   : 300,
				height  : 250,
				id      : 302409
				
			},
			
			medium_rectangle_2 : {
				
				comment : 'SPORTS | Local | Section | Medium Reactangle 2 | 300 x 250',
				width   : 300,
				height  : 250,
				id      : 302410
				
			}
			
		},
		
		story : {
			
			comment : 'SPORTS | Local | Story',
			aug_id  : 13792,
				
			leaderboard_728 : {
				
				comment : 'SPORTS | Local | Story | Leaderboard | 728 x 90',
				width   : 728,
				height  : 90,
				id      : 302411
				
			},
			
			leaderboard_320 : {
				
				comment : 'SPORTS | Local | Story | Leaderboard | 320 x 50',
				width   : 320,
				height  : 50,
				id      : 302412
				
			},
			
			medium_rectangle_1 : {
				
				comment : 'SPORTS | Local | Story | Medium Reactangle 1 | 300 x 250',
				width   : 300,
				height  : 250,
				id      : 302413
				
			}
			
		}
		
	},
	
	$sports_blogs_$oregon_football : {
		
		comment : 'SPORTS | BLOGS | Oregon Football',
		
		section : {
			
			comment : 'SPORTS | BLOGS | Oregon Football | Section',
			aug_id  : 10007,
				
			leaderboard_728 : {
				
				comment : 'SPORTS | BLOGS | Oregon Football | Section | Leaderboard | 728 x 90',
				width   : 728,
				height  : 90,
				id      : 302476
				
			},
			
			leaderboard_320 : {
				
				comment : 'SPORTS | BLOGS | Oregon Football | Section | Leaderboard | 320 x 50',
				width   : 320,
				height  : 50,
				id      : 302478
				
			},
			
			medium_rectangle_1 : {
				
				comment : 'SPORTS | BLOGS | Oregon Football | Section | Medium Rectangle 1 | 300 x 250',
				width   : 300,
				height  : 250,
				id      : 302479
				
			},
			
			medium_rectangle_2 : {
				
				comment : 'SPORTS | BLOGS | Oregon Football | Section | Medium Rectangle 2 | 300 x 250',
				width   : 300,
				height  : 250,
				id      : 302481
				
			}
			
		},
		
		story : {
			
			comment : 'SPORTS | BLOGS | Oregon Football | Story',
			aug_id  : 10008,
				
			leaderboard_728 : {
				
				comment : 'SPORTS | Local | Story | Leaderboard | 728 x 90',
				width   : 728,
				height  : 90,
				id      : 302482
				
			},
			
			leaderboard_320 : {
				
				comment : 'SPORTS | Local | Story | Leaderboard | 320 x 50',
				width   : 320,
				height  : 50,
				id      : 302484
				
			},
			
			medium_rectangle_1 : {
				
				comment : 'SPORTS | Local | Story | Medium Reactangle 1 | 300 x 250',
				width   : 300,
				height  : 250,
				id      : 302485
				
			}
			
		}
		
	}
	
}