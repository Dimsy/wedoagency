'use strict';
 
function _ajax(url, options){
	options = options || {};

		var promise = new Promise(function (resolve, reject){
	
		var xhr = new XMLHttpRequest();
		var method = options.method || 'GET';
	
		xhr.open(method, url, true);
	
		xhr.onload = function() {
			resolve(xhr.responseText);
		}
		xhr.onerror = function(){
			reject(new Error(xhr.responseText));
		}
	
		xhr.send(options.body);
	})

	return promise;
}