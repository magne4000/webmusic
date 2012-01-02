(function($) {
	var timer = null,
		timeout = 200,
		counter = {
			playlistadd : 0
		};	
	
    $(document).on('playlistadd', function(event, track){
    	var text = '';
    	clearTimeout(timer);
    	counter.playlistadd = counter.playlistadd + 1;
    	timer = setTimeout(function(){
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