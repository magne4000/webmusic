(function($) {
    var version = "0.5",
    	methods = {
        init : function(options) {
            var data = this.data('store'), oldTracks;
            // If the plugin hasn't been initialized yet
            if (!data) {
                this.data('store', {
                    target : this,
                    tracks : {},
                	uniqidhead : null,
                	uniqidtail : null
                });
                data = this.data('store');
                try {
                	data.localstorage = !!localStorage.getItem;
                } catch(e) {
                	data.localstorage = false;
                }
                if (data.localstorage === false){
                	return this;
            	}
            }
            oldTracks = this.store('_getTracks');
            data.uniqidhead = this.store('_getUniqidHead');
            data.uniqidtail = this.store('_getUniqidTail');
            if (this.store('_version') == this.store('version') && len(oldTracks) > 0){
            	data.tracks = oldTracks;
            }else{
            	this.store('empty');
            	this.store('_updateVersion');
            }
            return this;
        },
        setTracks : function(pl){
            var data = this.data('store');
            data.tracks = pl;
            if (data.localstorage){
            	localStorage.tracks = JSON.stringify(pl);
            }
            return this;
        },
        add : function(track, loop){
            var pl = this.store('getTracks'), head = this.store('_getUniqidHead'), tail = this.store('_getUniqidTail');
            track.prev = null; // init
            track.next = null; // init
            if(len(pl) === 0){
            	this.store('_setUniqidHead', track.uniqid);
            }
            if (!is_null(tail)){
            	track.prev = pl[tail].uniqid
            	pl[tail].next = track.uniqid;
            }
            if(len(pl) > 0){
                if (pl[head].prev != null){ // Loop ON
                	pl[head].prev = track.uniqid;
                	track.next = pl[head].uniqid;
            	}
        	}else{
        		if (!!loop){
        			track.next = track.uniqid;
        			track.prev = track.uniqid;
        		}
        	}
            this.store('_setUniqidTail', track.uniqid);
            pl[track.uniqid] = track;
            this.store('setTracks', pl);
            return this;
        },
        move : function(uniqid, after){
            var pl = this.store('getTracks'), i, oldhead = this.store('_getUniqidHead');

            if (pl[uniqid].prev != null){
            	pl[pl[uniqid].prev].next = pl[uniqid].next;
            }else{
            	this.store('_setUniqidHead', pl[uniqid].next);
            }
            if (pl[uniqid].next != null){
            	pl[pl[uniqid].next].prev = pl[uniqid].prev;
            }

            if (after != null){
            	pl[uniqid].prev = after;
                pl[uniqid].next = pl[after].next;
                if (pl[after].next != null){
                	pl[pl[after].next].prev = uniqid;
                }else{ // Put in last place
                	this.store('_setUniqidTail', uniqid);
                }
                pl[after].next = uniqid;
            }else{ // Put in first place
            	pl[oldhead].prev = uniqid;
            	pl[uniqid].prev = null;
            	pl[uniqid].next = pl[oldhead].uniqid;
            	this.store('_setUniqidHead', uniqid);
            }
            /*Debug
            var head = this.store('_getUniqidHead'), elt = pl[head], i = 10;
            console.log('');
            while (1){
            	console.log(elt.name);
            	if (elt.next == null) break;
            	if (pl[elt.next] == head || i <= 0) {
            		console.log('loop');
            		break;
            	}
            	elt = pl[elt.next];
            	i--;
            }
            console.log('');
            //End debug */
            this.store('setTracks', pl);
            return this;
        },
        empty : function(){
            this.store('setTracks', {});
            this.store('_setUniqidHead', null);
            this.store('_setUniqidTail', null);
            return this;
        },
        remove : function(uniqid){
            var pl = this.store('getTracks'), i;
            if(pl[uniqid].next != null){
            	pl[pl[uniqid].next].prev = pl[uniqid].prev;
            }else{
            	this.store('_setUniqidTail', pl[uniqid].prev);
            }
            if(pl[uniqid].prev != null){
            	pl[pl[uniqid].prev].next = pl[uniqid].next;
            }else{
            	this.store('_setUniqidHead', pl[uniqid].next);
            }
            delete pl[uniqid];
            this.store('setTracks', pl);
            return this;
        },
        toggleLoop : function(){
        	var pl = this.store('getTracks'), head = this.store('_getUniqidHead'), tail = this.store('_getUniqidTail');
        	if (pl[head].prev != null){ // Loop ON, switch it OFF
        		pl[head].prev = null;
        		pl[tail].next = null;
        	}else{ // Loop OFF, switch it ON
            	pl[head].prev = pl[tail].uniqid;
            	pl[tail].next = pl[head].uniqid;
        	}
        	this.store('setTracks', pl);
        },
        _version : function(){
        	var data = this.data('store'), v;
        	if (data.localstorage){
        		try {
                	v = !!localStorage.version;
                } catch(e) {
                	v = false;
                }
                if (v !== false){
                	return localStorage.version;
                }
        	}
        	return false;
        },
        _updateVersion : function(){
        	var data = this.data('store');
        	if (data.localstorage){
        		localStorage.version = version;
        	}
        	return this;
        },
        version : function(){
        	return version;
        },
        _getUniqidHead : function(){
        	var data = this.data('store');
        	if (data.localstorage && !!localStorage.uniqidhead){
        		return localStorage.uniqidhead;
        	}
        	return null;
        },
        _setUniqidHead : function(uniqidhead){
        	var data = this.data('store');
        	if (data.localstorage){
        		localStorage.uniqidhead = uniqidhead;
        	}
        	return this;
        },
        _getUniqidTail : function(){
        	var data = this.data('store');
        	if (data.localstorage && !!localStorage.uniqidtail){
        		return localStorage.uniqidtail;
        	}
        	return null;
        },
        _setUniqidTail : function(uniqidtail){
        	var data = this.data('store');
        	if (data.localstorage){
        		localStorage.uniqidtail = uniqidtail;
        	}
        	return this;
        },
        _getTracks : function(){
        	var data = this.data('store');
        	if(data.localstorage && !!localStorage.tracks){
        		return JSON.parse(localStorage.tracks);
        	}
        	return {};
        },
        getLoopState : function() {
        	var pl = this.store('getTracks');
        	if (len(pl) === 0) return null;
        	return pl[this.store('_getUniqidHead')].prev != null;
        },
        getTracks : function(){
            var data = this.data('store');
            return data.tracks;
        },
        destroy : function() {
            this.removeData('store');
            return this;
        }
    };

    $.fn.store = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('jQuery.store: Method ' + method + ' does not exist');
        }
    };
})(jQuery);