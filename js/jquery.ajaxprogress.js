/**
 * Provides a callback for each newly delivered content even before the request
 * is complete.
 * 
 * Inspired from https://github.com/sash/jquery-ajax-progress
 */
jQuery.ajaxPrefilter(function(options, _, jqXHR) {
    if (jQuery.isFunction(options.progress)) {
        var xhrFactory = options.xhr, interval = null, processed = "", unprocessed = "", scanned = "";
        var updater = function(responseText) {
            if (responseText && (responseText.length > scanned.length)) {
                scanned = responseText;
                unprocessed = responseText.substr(processed.length);
                if (unprocessed.indexOf("\n") > 0) {
                    if (jQuery.trim(unprocessed).length){
                        options.progress(unprocessed);
                    }
                    processed += unprocessed;
                }
            }
        };
        
        options.xhr = function() {
            var xhr = xhrFactory.apply(this, arguments);
            interval = setInterval(function() {
                try {
                    updater(xhr.responseText);
                } catch (e) {
                    console.log(e);
                }
            }, options.progressInterval || 250);
            return xhr;
        };
        
        var stop = function() {
            if (interval) {
                clearInterval(interval);
            }
        };

        jqXHR.then(stop, stop);
        jqXHR.done(function(jx) {
            updater(jx);
        });
    }
});