(function($) {
    var methods = {
        init : function(options) {
            $(window).on('hashchange', function(){
                $.hash('changed');
            });
            return this;
        },
        changed : function() {
            if (location.hash.indexOf('#!/') === 0){
                var aHash = location.hash.split('/');
                var iParams = (aHash.length - 1) / 2;
                if (iParams >= 1){
                    var filter = [];
                    for (var i=1; i<=iParams; i++){
                        var key = aHash[(i*2)-1], values = aHash[i*2].split(',');
                        switch(key){
                            case 'artist':
                                filter.push({elements : [], type : 'artist'});
                                $.hash('addIdToFilter', filter, values);
                                break;
                            case 'album':
                                filter.push({elements : [], type : 'album'});
                                $.hash('addIdToFilter', filter, values);
                                break;
                            default:
                        }
                    }
                    $.post('ajax/getJSONlist.php',{
                        filters : filter,
                        mode : 'albums'
                    }, function(objs){
                        $("#tabs-albums .container").empty();
                        fillAlbumsList(objs, $("#tabs-albums .container"));
                    }, "json")
                    .fail(function(jqXHR, textStatus){
                        console.log(textStatus);
                        console.log(jqXHR.responseText);
                    });
                    $.post('ajax/getJSONlist.php',{
                        filters : filter,
                        mode : 'tracks'
                    }, function(objs){
                        $("#right_pane .wrapper ul").empty();
                        fillTracksList(objs, $("#right_pane .wrapper ul"));
                    }, "json")
                    .fail(function(jqXHR, textStatus){
                        console.log(textStatus);
                        console.log(jqXHR.responseText);
                    });
                }
            }
            return this;
        },
        addIdToFilter : function(filter, values) {
            for (var j=0; j<values.length; j++){
                filter[filter.length-1].elements.push({
                    id: values[j]
                });
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