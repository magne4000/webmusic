(function($) {
    var methods = {
        init : function(options) {
            $.hash.triggerChanged = true;
            $.hash.current = null;
            $.hash.timeout = null;
            $.hash.search = null;
            $(window).on('hashchange', function(){
                if ($.hash.triggerChanged){
                    $.hash('changed');
                }
            });
            $(document).on('artistClicked', function(e, o){
                var obj = {artist: [], search: [$.hash.search]};
                o.each(function(){
                    obj.artist.push($(this).data('artist').id);
                });
                if (!!$.hash.current){
                    if (!!$.hash.current.album){
                        delete $.hash.current.album;
                    }
                    if (!!$.hash.current.search){
                        delete $.hash.current.search;
                    }
                }
                $.hash('change', obj, false);
            });
            $(document).on('albumClicked', function(e, o){
                var obj = {album: []};
                o.each(function(){
                    obj.album.push($(this).data('album').id);
                });
                $.hash('change', obj, false);
            });
            $(document).on('fastsearchchanged', function(e, o){
                $.hash.search = o;
            });
            return this;
        },
        change : function(obj, triggerChanged){
            clearTimeout($.hash.timeout);
            var s = '#!';
            if (!!$.hash.current){
                for (var key in $.hash.current){
                    if (!obj[key]){
                        obj[key] = $.hash.current[key];
                    }
                }
            }
            for (var o in obj){
                if (obj[o].length > 0 && !!obj[o][0]){
                    s += '/' + o + '/' + obj[o].join(',');
                }
            }
            $.hash.current = obj;
            $.hash.timeout = setTimeout(function(){
                $.hash.triggerChanged = triggerChanged;
                location.hash = s;
                setTimeout(function(){$.hash.triggerChanged = true;}, 200);
            },500);
        },
        changed : function() {
            if (location.hash.indexOf('#!/') === 0){
                var aHash = location.hash.split('/');
                var iParams = (aHash.length - 1) / 2;
                var searchTxt = null;
                if (iParams >= 1){
                    var selected = {
                       'artist' : [],
                       'album' : [],
                       'track' : []
                    };
                    for (var i=1; i<=iParams; i++){
                        var key = aHash[(i*2)-1], values = aHash[i*2].split(',');
                        switch(key){
                            case 'search':
                                searchTxt = values[0];
                                break;
                            case 'artist':
                            case 'artists':
                                selected.artist = values;
                                break;
                            case 'album':
                            case 'albums':
                                selected.album = values;
                                break;
                            case 'track':
                            case 'tracks':
                                selected.track = values;
                                break;
                            default:
                        }
                    }
                    
                    var action = function(){
                        if (selected.artist.length > 0){
                            setTimeout(function(){
                                $(document).trigger('artistClick', [selected.artist]);
                            }, 10);
                        }
                        if (selected.album.length > 0){
                            $(document).one('albumlistupdated', function(){
                                setTimeout(function(){
                                    $(document).trigger('albumClick', [selected.album]);
                                }, 10);
                            });
                        }
                        if (selected.track.length > 0){
                            $(document).one('tracklistupdated', function(){
                                setTimeout(function(){
                                    $(document).trigger('trackClick', [selected.track]);
                                }, 10);
                            });
                        }
                    };
                    if (!!searchTxt && $.hash.search != searchTxt){
                        var fastsearchaction = function(){
                            var e = jQuery.Event('keyup');
                            e.which = e.keyCode = 50; //random value
                            $(document).one('fastsearchchanged', action);
                            setTimeout(function(){$('#input_artist').val(searchTxt).trigger(e);}, 100);
                        };
                        if (!ulMenu.loaded){
                            $(document).one('ajaxmenuloaded', fastsearchaction);
                        }else{
                            fastsearchaction();
                        }
                    }else{
                        action();
                    }
                }
            }
            return this;
        }
    };

    $.hash = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('jQuery.hashChanged: Method ' + method + ' does not exist');
        }
    };
})(jQuery);
$(document).ready(function() {
    $.hash();
    $.hash('changed');
});