var spotibuy = {
    lasturl:"",
    lastdataurl:"",
    selectors:{
        tl:"#tracklist"
    },
    insert_functions:[
        function (o) {
            o.row = $('<div/>');
            o.row.append($('<span class="title">' + o.title + '</span>'));
            o.row.append($('<span class="artist">' + o.artist + '</span>'));
            o.row.appendTo(spotibuy.o.tl);
        }
        ,
        function (o) {
            var tpl = "<span class='amazon'><a target='_amazon' href='http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Ddigital-music&camp=1789&creative=390957&linkCode=ur2&tag=r0b0tzcom-20&field-keywords=#query#'>Search Amazon</a></span>";
            var ahref = tpl.replace('#query#', o.title + '+' + o.artist);
            o.row.append($(ahref));
        }
    ],
    t:function sb_t(type, msg) {
        if (msg == null) {
            msg = type;
            type = 'info';
        }
        if (window.console && console.log) console.log('[' + type + '] ' + msg);
    },
    init:function sb_init() {
        spotibuy.t('initializing...');
        spotibuy.o = {};
        for (k in spotibuy.selectors) {
            spotibuy.o[k] = $(spotibuy.selectors[k]);
            spotibuy.t('obj', 'setting: ' + k);
        }

        $('body')
            .bind('dragover', function (e) {
                e.preventDefault();
                return false;
            })
            .bind('drop', function (e) {
                e.preventDefault();
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                var url = e.originalEvent.dataTransfer.getData('text/plain');
                spotibuy.lasturl = url;
                if (url.indexOf('spotify') < 0) {
                    spotibuy.o.tl.empty();
                    spotibuy.o.tl.append($('<article><b>Invalid link dropped...</b><small>This is not a Spotify playlist URL:<br><pre>' + spotibuy.lasturl + '</pre></small></article>'));
                } else {


                    var base_url = "";
                    var this_url = url;
                    this_url = this_url.replace('http://open.spotify.com/', 'spotify:').replace(/\//g, ':');
                    if (this_url.indexOf(':track:') > -1) {
                        this_url = this_url.replace('spotify:track:', '');
                        base_url = 'https://embed.spotify.com/?view=list&uri=spotify:trackset:MUSE%20Playlist:';
                    }

                    if (this_url.indexOf(':playlist:') > -1) {
                        base_url = 'https://embed.spotify.com/?uri=';
                        this_url = this_url.replace('http://open.spotify.com/', 'spotify:').replace(/\//g, ':');
                    }


                    this_url = this_url.replace(/http:::open\.spotify\.com:/g, ",").replace(/\s/g, "");
                    if (base_url.indexOf('trackset') > -1) this_url = this_url.replace(/track:/g, "");
                    spotibuy.lastdataurl = base_url + this_url;
                    spotibuy.getplaylist(base_url + this_url);//'https://embed.spotify.com/?uri=spotify:user:121738644:playlist:5hYENwdNkHr3RWNQxDl75h');
                }
                return false;
            });
    },
    handleplaylist:function sb_handleplaylist(data) {
        spotibuy.o.tl.empty();
        var items = $(data).find('li.item');
        spotibuy.t('recv', 'got playlist...' + items.length);
        if (items.length > 0) {
            items.each(spotibuy.insertitem);
        } else {
            spotibuy.o.tl.append($('<b>Problem getting playlist...<br><small>URL dropped: ' + spotibuy.lasturl + '<br>Tried: ' + spotibuy.lastdataurl + '</small></b>'));
        }
    },
    getplaylist:function sb_getplaylist(url) {
        spotibuy.t('recv', 'get playlist...' + url);
        spotibuy.o.tl.empty();
        spotibuy.o.tl.html('<b>Retrieving playlist...</b>');
        $.ajax(
            {
                url:'spotify.php',
                data:{ action:'getembed', url:url },
                success:spotibuy.handleplaylist,
                error:function (data) {
                    spotibuy.o.tl.append($('<b>Problem getting playlist...<br><small>URL dropped: ' + spotibuy.lasturl + '<br>Tried: ' + spotibuy.lastdataurl + '</small></b>'));
                    spotibuy.t('error', data.toString());
                }
            })
    },
    insertitem:function sb_insertitem(index, data) {
        var track = $(data);
        var track_title = track.find('.track-title').attr('rel').split(' ');
        track_title.shift();
        track_title = track_title.join(' ');
        var track_obj = { title:track_title, artist:track.find('.artist').attr('rel')
        };
        spotibuy.t('insert', track_obj.title + ' - ' + track_obj.artist);
        $(spotibuy.insert_functions).each(function (index, func) {
            func(track_obj);
        });
    }
};


$(spotibuy.init);