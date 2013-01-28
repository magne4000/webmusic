(function($) {
    var methods = {
        init : function(options) {
            return this.each(function() {
                var $this = $(this), data = $this.data('nyanify'), k = [];
                // If the plugin hasn't been initialized yet
                if (!data) {
                    $this.data('nyanify', {
                        target : $this
                    });
                }

                $(document).keydown(
                    function(e) {
                        if (k.length > 20) {
                            k = k.splice(10, k.length);
                        }
                        k.push(e.keyCode);
                        if (k.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0) {
                            $this.nyanify('toggleNyanification');
                            k = [];
                        }
                    });
            });
        },
        destroy : function() {
            return this.each(function() {
                var $this = $(this), data = $this.data('nyanify');
                $(window).off('.nyanify');
                $this.removeData('nyanify');
            });
        },
        toggleNyanification : function() {
            return this.each(function() {
                var $this = $(this);
                if ($this.is('.ui-nyanbar')) {
                    $this.removeClass('ui-nyanbar');
                    $this.children().find('.ui-nyanbar-body').remove();
                } else {
                    $this.addClass('ui-nyanbar');
                    $this.children().append(
                            '<div class="ui-nyanbar-body"></div>');
                }
            });
        }
    };

    $.fn.nyanify = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(
                    arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('jQuery.nyanify: Method ' + method + ' does not exist');
        }
    };
})(jQuery);
$(document).ready(function() {
    $('#bar').nyanify();
});