(function($) {
	var timeout = 200,
		timer = {
			playlistadd : null
		},
		counter = {
			playlistadd : 0
		};	
	
    $(document).on('playlistadd', function(event, track){
    	var text = '';
    	clearTimeout(timer.playlistadd);
    	counter.playlistadd = counter.playlistadd + 1;
    	timer.playlistadd = setTimeout(function(){
    		if (counter.playlistadd > 1){
    			text = counter.playlistadd + ' musics added.';
    		}else{
    			text = track.name + ' added.';
    		}
    		$.easyNotification({
        		parent: '#right_pane',
        		text: text
        	});
        	counter.playlistadd = 0;
    	}, timeout);
    });
})(jQuery);