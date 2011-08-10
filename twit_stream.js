function init_twitter (data) {
		
	// Opening ul tag for tweet list
	//
	var html = "<ul id='tweet_list'>";
	
	// Iterate over each tweet object
	//
	for (i in data) {
		
		// Store text/date in tmp variables
		//
		var _text = data[i].text;
		var _dateO = new Date(data[i].created_at);
		var _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		
		var _date = "<span class='day'>" + _days[_dateO.getDay()] + ", </span>";
		_date += "<span class='month'>" + _months[_dateO.getMonth()] + " </span>";
		_date += "<span class='date'>" + _dateO.getDate() + ", </span>";
		_date += "<span class='year'>" + _dateO.getFullYear() + "</span>";
		_date += "</span>"
				
		// Iterate over each tweet's entities object for replacing:
		//
		// @mentions
		// #hashtags
		// urls
		// 
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
		
		// Append new list item for each tweet
		//
		html += "<li class='tweet'><div class='timestamp'>" + _date + "</div><div class='text'>" + _text + "</div></li>" 		
	
	}
	
	// Closing ul tag for tweet list
	//
	html += "</ul>"
	
	// Add tweet list to html
	//
	var el = document.getElementById("tweets");
	el.innerHTML = html;

}

// Adds TwitterApi script to end of 'body' tag
//
(function () {
	
	// Gets screename from script tag that sources THIS^ script
	// screen name applied as screename attribute
	//
	try {
		
		// Handle Errors
		//
		var el = document.getElementById("twit_stream");
		if (!el) throw new Error("ERROR: 'id' attribute not set on <script> tag\nADD: id='twit_stream'");
		
		var screen_name = el.getAttribute('screenname');
		if (!screen_name) throw new Error("ERROR: 'screenname' attribute not set on <script> tag\nADD: screenname='<YOUR_SCREEN_NAME>'");
		
		// Insert Twitter API script element
		//
		var t_script = document.createElement('script');
		t_script.src = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + screen_name + '&callback=init_twitter&include_entities=true';
		
		window.onload = function() {
			document.body.appendChild(t_script)
			document.getElementById("tweets").innerHTML = '<span class="loading_txt">loading…</span>';
		};
		
	} catch (e) {console.log(e.message)}
	
})();












