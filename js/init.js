$(document).ready(function() {
    $tabs = $('#body2_wrapper .pane').tabs();
    
    /* Resizable */
    $('#left_pane').resizable({
        handles: 'e',
        minWidth: 200,
        maxWidth: 600,
        resize: function(event, ui){
            $(this).css({
                'height': '',
                'left': '5px'
            });
            $('#body2').css({
                'padding-left': $(this).width() + 11
            });
        }
    });
    
    $('#right_pane').resizable({
        handles: 'w',
//        minWidth: 200,
        maxWidth: 600,
        resize: function(event, ui){
            $(this).css({
                'height': '',
                'left': '',
                'right': '5px'
            });
            $('#body2').css({
                'padding-right': $(this).width() + 11
            });
        }
    });
    
    /* Fastsearch */
    $('#input_artist').fastsearch({
        source: "ajax/search.php?type=artist",
        minLength: 2,
        recipient: "#left_pane .wrapper",
        delay: 300,
        restoreCallback: function(){loadAjaxMenu();}
    });
    
    /* Recipients */
    var $recipient_body2_wrapper = $("#tabs-albums .container").recipient(),
    $recipient_right_pane = $("#right_pane .wrapper ul").recipient(),
    $left_pane_ul = $('#left_pane .wrapper ul'),
    timer = null;
    
    $left_pane_ul.recipient();
    $left_pane_ul.recipient('addListener', 'artistClick', function(ids){
        var $this = $(this), modified = false;
        $('[data-artist].ui-selected,:data(artist).ui-selected').removeClass('ui-selected');
        $('[data-artist],:data(artist)').each(function(){
            if ($.inArray($(this).data('artist').id, ids) >= 0){
                $(this).addClass('ui-selected');
                modified = true;
            }
        });
        if (modified){
            $this.trigger('selectablestop');
        }
    });
    
    $recipient_body2_wrapper.recipient('addListener', 'artistClicked', function(target){
        $tabs.tabs("option", "active", 0);
        var $this = $(this);
        getList(MODES.ALBUMS_BY_ARTISTS, target, fillAlbumsList, $this);
        
    });
    
    $recipient_body2_wrapper.on('selectablestop', function(){
        var $this = $(this), subelts = $this.find('.ui-selected'), selected;
        clearTimeout(timer);
        if (subelts.size() === 0){
            selected = [$('#left_pane ul .ui-selected')];
            //If no album is selected, trigger an artistClicked event to mimic the default behaviour
            timer = setTimeout(function(){
                $this.trigger('artistClicked', selected);
            }, 100);
        }else{
            selected = [subelts];
            timer = setTimeout(function(){
                $this.trigger('albumClicked', selected);
            }, 100);
        }
    })
    .recipient('addListener', 'albumClick', function(ids){
        var $this = $(this), modified = false;
        $(':data(album).ui-selected').removeClass('ui-selected');
        $(':data(album)').each(function(){
            if ($.inArray($(this).data('album').id, ids) >= 0){
                $(this).addClass('ui-selected');
                modified = true;
            }
        });
        if (modified){
            $this.trigger('selectablestop');
        }
    });
    
    $recipient_right_pane
    .recipient('addListener', 'artistClicked', function(target){
        var $this = $(this);
        $('.context-menu-item').addClass("context-menu-item-disabled");
        getList(MODES.TRACKS_BY_ARTISTS, target, fillTracksList, $this);
    })
    .recipient('addListener', 'albumClicked', function(target){
        var $this = $(this);
        $('.context-menu-item').addClass("context-menu-item-disabled");
        getList(MODES.TRACKS_BY_ALBUMS, target, fillTracksList, $this);
    })
    .recipient('addListener', 'trackClick', function(ids){
        $(':data(track).ui-selected').removeClass('ui-selected');
        $(':data(track)').each(function(){
            var $this = $(this);
            if ($.inArray($this.data('track').id, ids) >= 0){
                $this.addClass('ui-selected');
            }
        });
    });
    
    $('#player').recipient()
    .recipient('addListener', 'playTracks', function(target){
        var ids = [], $target = $(target);
        show_playlist_tab($playlist);
        $target.each(function(){
            ids.push($(this).data('track').id);
        });
        $playlist.playlist('empty');
        getFileInformations({ids : ids}, function(tracks){
            $playlist.playlist('add', tracks, function(){
                $player.player('play');
            });
        });
    })
    .recipient('addListener', 'addTracks', function(target){
        var ids = [], $target = $(target);
        show_playlist_tab($playlist);
        $target.each(function(){
            ids.push($(this).data('track').id);
        });
        getFileInformations({ids : ids}, function(tracks){
            $playlist.playlist('add', tracks);
        });
    });
    
    /* Selectables */
    $left_pane_ul.selectable({ filter: '>li', cancel: '.actionhandler' });
    $recipient_right_pane.selectable({ filter: '>li', cancel: '.actionhandler' });
    $recipient_body2_wrapper.selectable({ filter: '>div', cancel: '.actionhandler' });
    
    $left_pane_ul.on('selectablestop', function(){
        var $this = $(this), selected = [$this.find('.ui-selected')];
        clearTimeout(timer);
        timer = setTimeout(function(){
            $this.trigger('artistClicked', selected);
        }, 100);
    });
    
    /* Context menus */
    var cond = {condition : ':not(.ui-selected)', fct : function(me){
        me.parent('.ui-selectable').find('.ui-selected').removeClass('ui-selected');
        me.addClass('ui-selected');
        me.trigger('selectablestop');
    }},
    condClick = {condition : ':not(.ui-selected)', fct : function(me){
        if (!me.parent().is('.ui-selected')){
            me.parents('.ui-selectable').find('.ui-selected').removeClass('ui-selected');
            me.parent().addClass('ui-selected');
            me.parent().trigger('selectablestop');
        }
        me.addClass('active');
    }};
    
    var menuTracks = [
        {'Play':{onclick: function(menuItem,menu) { $recipient_right_pane.trigger('playTracks', ['#right_pane ul .ui-selected']); }, disabled: true} },
        //$.contextMenu.separator,
        {'Add to playlist':{onclick: function(menuItem,menu) { $recipient_right_pane.trigger('addTracks', ['#right_pane ul .ui-selected']); }, disabled: true} }
    ];
    $('#right_pane').contextMenu('init', 'li', menuTracks,{theme:'4000'},cond);
    $('#right_pane').contextMenu('initClick', '.actionhandler', menuTracks,{theme:'4000'},condClick);
    
    var menuArtistsAndAlbums = [
        {'Play':{onclick: function(menuItem,menu) { $recipient_right_pane.trigger('playTracks', ['#right_pane ul li']); }, disabled: true} },
        //$.contextMenu.separator,
        {'Add to playlist':{onclick: function(menuItem,menu) { $recipient_right_pane.trigger('addTracks', ['#right_pane ul li']); }, disabled: true} }
    ];
    $('#tabs-albums').contextMenu('init', '.album_list_element', menuArtistsAndAlbums,{theme:'4000'},cond);
    $('#tabs-albums').contextMenu('initClick', '.actionhandler', menuArtistsAndAlbums,{theme:'4000'},condClick);
    $('#left_pane').contextMenu('init', 'li', menuArtistsAndAlbums,{theme:'4000'},cond);
    $('#left_pane').contextMenu('initClick', '.actionhandler', menuArtistsAndAlbums,{theme:'4000'},condClick);
    
    /* Player */
    
    $store = $('body').store();
    $playlist = $('body').playlist({
        store : $store
    });
    $player = $('body').player({
        playlist : $playlist
    });
    
    // Tooltip
    Opentip.styles.myStyle = {
        extends: "dark",
        background: "#202020",
        borderRadius: 5
    };
    var tooltipBar = new Opentip("#bar", { style: "myStyle", tipJoint: "bottom", offset: [2, 13] });
    var tooltipVol = new Opentip("#volume-max", { style: "myStyle", tipJoint: "right", offset: [10, 0] });
    
    $('#bar').on('mousemove', function(e){
        var txt = '...',
            track = $playlist.playlist('getCurrentTrack');
        if (!!track){
            var cursorPositionRelative = Math.round((e.pageX - $('#bar').offset().left)),
                cursorPosition = Math.round(cursorPositionRelative/$('#bar').width() * (track.duration/1000));
            if (track.readyState == 3){ //loaded/success
                txt = formatDuration(cursorPosition);
            }else if (track.readyState == 2){
                txt = 'Error';
            }else if (track.readyState == 1){
                txt = 'Loading';
            }
        }
        tooltipBar.setContent(txt);
    });
    
    /* Volume */
    $('#volume-max').slider({
        orientation: "vertical",
        range: "min",
        max: 100,
        value: 100,
        create: function( event, ui ) {
            $('#volume-max a').remove();
        },
        slide: function( event, ui ) {
            $player.player('setVolume', $('#volume-max').slider('value'));
        }
    });
    
    var timeoutvolume = null;
    $("#volume-wrapper, #volume").hover(
        function() {
            if (timeoutvolume) {
                clearTimeout(timeoutvolume);
                timeoutvolume = null;
            }
        },
        function() {
            timeoutvolume = setTimeout(function() {
                timeoutvolume = null;
                $player.player('hideVolume');
            }, 800);
        }
    );
    
    $('#volume-max').on('mousemove', function(e){
        var cursorPositionRelative = Math.round((e.pageY - $('#volume-max').offset().top)),
            cursorPosition = 100 - Math.floor((cursorPositionRelative/$('#volume-max').height()) * 100);
        tooltipVol.setContent(cursorPosition);
        /*Position*/
        $('.tooltip-volume').position({
            my: "right-15 top+" + (cursorPositionRelative - 8),
            at: "left top",
            of: $("#volume-max"),
            collision: "flipfit"
        });
    });
    
    /* Actions */
    $(document).on('mouseenter mouseleave', '.wrapper li, .album_list_element', function(){
        $(this).find('.actionhandler').toggleClass('active_hover');
    });
    
    /* Shortcuts */
    $(document).on('keydown.space', function() {
        $player.player('togglePlayPause');
    });
    $(document).on('keydown.ctrl_right', function() {
        $player.player('next');
    });
    $(document).on('keydown.ctrl_left', function() {
        $player.player('prev');
    });
});