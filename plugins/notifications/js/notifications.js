$(document).on('playlistadd', function(event, track){
	$.easyNotification({
		parent: '#right_pane',
		text: track.name
	});
});