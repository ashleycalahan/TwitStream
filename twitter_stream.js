function init_twitter (data) {
	var html = "<ul id='tweet_list'>";
	for (i in data) {
	    var _text = data[i].text;
	    for (j in data[i].entities) {
	    	var _obj = data[i].entities[j];
	    	switch (j) {
	    		case 'user_mentions':
	    		for (k in _obj) {
	    			_replace = '<a class="user_mention" href="http://twitter.com/#!/' + _obj[k].screen_name + '" target="_blank">@' + _obj[k].screen_name + '</a>';
	    			_text = _text.replace('@' + _obj[k].screen_name, _replace);
	    		}
	    		break;
	    		case 'hashtags':
	    		for (k in _obj) {
	    			_replace = '<a class="hashtag" href="http://twitter.com/#!/search?q=%23' + _obj[k].text + '" target="_blank">#' + _obj[k].text + '</a>';
	    			_text = _text.replace('#' + _obj[k].text, _replace);
	    		}
	    		break;
	    		case 'urls':
	    		for (k in _obj) {
	    			_replace = '<a class="url" href="' + _obj[k].url + '" target="_blank">' + _obj[k].url + '</a>';
	    			_text = _text.replace(_obj[k].url, _replace);
	    		}
	    		break;
	    	}
	    }
	    html += "<li class='tweet'>" + _text + "</li>" 		
	}
	html += "</ul>"
	var el = document.getElementById("tweets");
	el.innerHTML = html;
}

(function () {
    
    var t_script = document.createElement('script');
    var screen_name = document.getElementById("twitter_feed").getAttribute('username');
    t_script.src = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + screen_name + '&callback=init_twitter&include_entities=true';
    
    window.onload = function() {
    	document.body.appendChild(t_script)
    	document.getElementById("tweets").innerHTML = '<span class="loading_txt">loading…</span>';
    };

})();