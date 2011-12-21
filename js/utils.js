function uniqid (prefix, more_entropy) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kankrelune (http://www.webfaktory.info/)
    // %        note 1: Uses an internal counter (in php_js global) to avoid collision
    // *     example 1: uniqid();
    // *     returns 1: 'a30285b160c14'
    // *     example 2: uniqid('foo');
    // *     returns 2: 'fooa30285b1cd361'
    // *     example 3: uniqid('bar', true);
    // *     returns 3: 'bara20285b23dfd1.31879087'
    if (typeof prefix == 'undefined') {
        prefix = "";
    }

    var retId;
    var formatSeed = function (seed, reqWidth) {
        seed = parseInt(seed, 10).toString(16); // to hex str
        if (reqWidth < seed.length) { // so long we split
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) { // so short we pad
            return Array(1 + (reqWidth - seed.length)).join('0') + seed;
        }
        return seed;
    };

    // BEGIN REDUNDANT
    if (!this.php_js) {
        this.php_js = {};
    }
    // END REDUNDANT
    if (!this.php_js.uniqidSeed) { // init seed with big random int
        this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    this.php_js.uniqidSeed++;

    retId = prefix; // start with prefix, add current milliseconds hex string
    retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
    retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
    if (more_entropy) {
        // for more entropy we add a float lower to 10
        retId += (Math.random() * 10).toFixed(8).toString();
    }

    return retId;
}

function is_null(o){
	return (o == null || o == 'null');
}

function clone(obj){
	if(typeof(obj) != 'object' || obj == null){
		return obj;
	}
	var newInstance = obj.constructor();
	for(var i in obj){
		newInstance[i] = clone(obj[i]);
	}
	return newInstance;
}

function len(obj) {
	var len = obj.length ? obj.length : 0;
	for (var k in obj)
		len++;
	return len;
}

function sendMail(textStatus, responseText){
	$.post("ajax/sendMail.php", {textStatus : textStatus, responseText : responseText}, function(){});
}

function array_flip(trans) {
	var key, tmp_ar = {};
	for (key in trans) {
		tmp_ar[trans[key]] = key;
	}
	return tmp_ar;
}

function formatDuration(diffInS) {
	diffInS = Math.floor(diffInS);
    var diffInMinutes = Math.max(0, Math.floor(diffInS / 60));
    diffInS = diffInS % 60;
    return [
        ('0'+diffInMinutes).slice(-2),
        ('0'+diffInS).slice(-2)
    ].join(':');
}

var playlist_tab_created = false;
function show_playlist_tab(pl){
	if (!playlist_tab_created){
		$tabs.tabs("add", "#tabs-playlist", "Playlist");
		$tabs.tabs("select", "#tabs-playlist");
		$("#tabs-playlist").playlist_div({playlist: pl});
		playlist_tab_created = true;
	}
	$tabs.tabs("select", "#tabs-playlist");
}

function loadAlbumArts(root){
	root.find('>div:not(:has(img))').each(function(){
		getAlbumArt($(this));
	});
}

function fillTracksList(objs, $applyOn){
	var obj;
	for (obj in objs){
		$('<li></li>')
		.data('track', {
			id: objs[obj].t_id
		})
		.attr('title', 'Artist: ' + objs[obj].ar_artist + '\nAlbum: ' + objs[obj].al_album + '\nName: ' + objs[obj].t_name)
		.text(objs[obj].t_name)
		.append('<div class="actionhandler"></div>')
		.appendTo($applyOn);
	}
	
	$('.context-menu-item-disabled-hover').removeClass("context-menu-item-disabled-hover").addClass('context-menu-item-hover');
	$('.context-menu-item-disabled').removeClass("context-menu-item-disabled");
}

function fillAlbumsList(objs, $applyOn){
	var obj;
	for (obj in objs){
		var div = $('<div></div>')
		.addClass('album_list_element')
		.data('album', {
			id: objs[obj].id,
			path: objs[obj].albumpath
		})
		.html($('<div></div>').addClass('caption').text(objs[obj].name))
		.append('<div class="actionhandler"></div>');
		if (!!objs[obj].year){
			div.attr('title', 'Year: ' + objs[obj].year);
		}
		div.appendTo($applyOn);
	}
	loadAlbumArts($applyOn);
}
