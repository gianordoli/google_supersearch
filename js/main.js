$(document).ready(function () {
	var labels = ['web', 'youtube', 'recipes', 'products', 'news', 'images', 'books'];
    $.each(labels, function(i, v){
		var div = $("<div id=" + v + " class='results'>").appendTo("#container");
		var divWidth = window.innerWidth/labels.length;
		// var hue = (360/labels.length) * i;
		// $(div).css({
		// 	'background-color': 'hsl(' + hue + ', 50%, 85%)'
		// });
    	$('<h2>'+ v + '</h2>').appendTo(div);
    });

	var opts = $.extend({service: 'web', secure: false}, opts);

	var services = {
	youtube: { client: 'youtube', ds: 'yt', address: 'https://www.youtube.com/results?search_query=X' },
	books: { client: 'books', ds: 'bo', address: 'https://www.google.com/search?q=X&tbm=bks' },
	products: { client: 'products-cc', ds: 'sh', address: 'https://www.google.com/#q=X&tbm=shop' },
	news: { client: 'news-cc', ds: 'n', address: 'https://www.google.com/#q=X&tbm=nws' },
	images: { client: 'img', ds: 'i', address: 'https://www.google.com/search?site=imghp&tbm=isch&q=X&' },
	web: { client: 'psy', ds: '', address: 'https://www.google.com/#q=X' },
	recipes: { client: 'psy', ds: 'r', address: 'https://www.google.com/search?q=X&tbs=rcp'  }
	};

	$('#search-box').bind('keyup', function(event){
		// console.log(event.which);

		var value = $(this).val();
		console.log(value);

		// if(value.length > 0){
		if ((event.keyCode >= 48 && event.keyCode <= 57) ||
			(event.keyCode >= 65 && event.keyCode <= 90)){

	        $.each($('.results'), function(i, obj){

	        	var service = services[obj.id];

			    $.ajax({
			      url: 'https://clients1.google.com/complete/search',
			      dataType: 'jsonp',
			      data: {
			        q: value,
			        nolabels: 't',
			        client: service.client,
			        ds: service.ds
			      },
			      success: function(data) {
			      	console.log(data);
			      	var options = $.map(data[1], function(item){
			          return $("<span>").html(item[0]).text();
			        });
			        // console.log(options);

		        	$(obj).html('');
		        	$('<h2>'+obj.id+'</h2>').appendTo(obj);
		        	$.each(options, function(j, value){

		        		var query = value;
		        		while(query.indexOf(' ') > -1){
		        			query = query.replace(' ', '+') 
		        		}
		        		var link = services[obj.id].address
		        								   .replace('X', query);
		        		// console.log(link);
		        		var p = $("<p>").appendTo(obj);
		        		var a = $("<a href=" + link + " target='_blank'>").html(options[j]).appendTo(p);
		        	});
			      },
			      error: function(){
			      	$(obj).html('');
			      	$('<p>'+obj.id+'</p>').appendTo(obj);
			      	console.log('error');
			      }
			    });
	        });

		}

	});
 
});