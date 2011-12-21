(function($) {
	var methods = {
		init : function(options) {
			return this.each(function() {
				var $this = $(this), data = $this.data('player'), loopState;

				// If the plugin hasn't been initialized yet
				if (!data) {
					$this.data('player', {
						target : $this,
						playlist : options.playlist || this.playlist(),
						volume : options.volume || 100,
						$play : $(options.playselector || '#play'),
						$next : $(options.nextselector || '#next'),
						$prev : $(options.prevselector || '#prev'),
						$loop : $(options.loopselector || '#loop'),
						$shuffle : $(options.shuffleselector || '#shuffle'),
						$volume : $(options.volumeselector || '#volume')
					});

					data = $this.data('player');
					data.$play.click(function() {
						$this.player('togglePlayPause');
					});
					data.$next.click(function() {
						$this.player('next');
					});
					data.$prev.click(function() {
						$this.player('prev');
					});
					data.$loop.click(function() {
						$this.player('toggleLoop');
					});
					data.$shuffle.click(function() {
						$this.player('toggleShuffle');
					});
					
					loopState = data.playlist.playlist('getLoopState');
					if (loopState){
						data.$loop.toggleClass('active');
					}
				}
			});
		},
		destroy : function() {
			return this.each(function() {
				var $this = $(this);
				$this.removeData('player');
			});
		},
		togglePlayPause : function() {
			return this.each(function() {
				var $this = $(this), data = $this.data('player'), current = data.playlist.playlist('getCurrentTrack');
				if (!!current) {
					current.togglePause();
					data.$play.toggleClass('play pause');
				}
			});
		},
		_play : function() {
			return this.each(function() {
				var $this = $(this), data = $this.data('player'), current = data.playlist.playlist('getCurrentTrack');
				if (!!current) {
					current.play();
					data.$play.removeClass('play');
					data.$play.addClass('pause');
				}
			});
		},
		play : function(uniqid) {
			return this.each(function() {
				var $this = $(this), data = $this.data('player');
				if (!uniqid) { // Current loaded track
					$this.player('_play');
				} else { // Load another track
					data.playlist.playlist('setCurrent', uniqid, function(){
						$this.player('_play');
					});
				}
			});
		},
		_stop : function() {
			var $this = $(this), data = $this.data('player'), current = data.playlist.playlist('getCurrentTrack');
			if (!!current) {
				current.stop();
				data.$play.removeClass('pause');
				data.$play.addClass('play');
			}
		},
		next : function() {
			return this.each(function() {
				var $this = $(this), data = $this.data('player'), uniqid = data.playlist.playlist('getNextUniqid');;
				$this.player('_stop');
				if (uniqid != null) {
					data.playlist.playlist('setCurrent', uniqid, function(){
						$this.player('play');
					});
				}
			});
		},
		prev : function() {
			return this.each(function() {
				var $this = $(this), data = $this.data('player'), uniqid = data.playlist.playlist('getPrevUniqid');
				$this.player('_stop');
				if (uniqid != null) {
					data.playlist.playlist('setCurrent', uniqid, function(){
						$this.player('play');
					});
				}
			});
		},
		toggleShuffle : function() {
			return this.each(function() {
				var $this = $(this), data = $this.data('player');
				data.$shuffle.toggleClass('active');
				data.playlist.playlist('toggleShuffle');
			});
		},
		toggleLoop : function() {
			return this.each(function() {
				var $this = $(this), data = $this.data('player');
				data.$loop.toggleClass('active');
				data.playlist.playlist('toggleLoop');
			});
		}
	};

	$.fn.player = function(method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('jQuery.player: Method ' + method + ' does not exist');
		}
	};
})(jQuery);