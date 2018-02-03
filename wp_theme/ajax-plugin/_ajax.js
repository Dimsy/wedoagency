// function submit_me( block, addingClass ){

//   // Переменная с указанием подключемого хука и объевлением передаваемого блока
//   var data = {
//     'action': 'the_ajax_hook',
//     'data': block
//   }

//   // Переменная с прелоадером
//   var preloader ='<div class="preloader"><div class="loader_inner"></div></div>';
  
//   jQuery('#nav_carousel .preloader' ).show();

//   // AJAX-запрос
//   jQuery.ajax({
//     type: 'POST',
//     url: the_ajax_script.ajaxurl,
//     data: data,
//     //async: false,
//     beforeSend: function(){
//          jQuery('#nav_carousel').html( preloader );
//       },
//     success: function(response_from_the_action_function){
//         jQuery("#nav_carousel").html(response_from_the_action_function);
//         jQuery('#nav_carousel .color_line' ).addClass( addingClass );
//       }
//     }
//   );
//   return true;
// }
'use strict';
 function submit_me( block, addingClass ){
 	debugger;
   	let options = {
   			data: encodeURIComponent('ароматизаторы'),
   		};

   	let promise =	ajax('/wp-admin/admin-ajax.php?action=query_block', options);
   	promise.then(success(xhr.responseText), error(xhr.responseText));
   // document.getElementById('nav_carousel').innerHTML = ajax('/wp-admin/admin-ajax.php?action=query_block', options);
 }

 function success(txt) {
 	alert(txt);
 };

 function error() {
 	alert('msg');
 }
 function ajax(url, options) {
		options = options || {};

		let promise = new Promise(function (resolve, reject){
	
			let xhr = new XMLHttpRequest();
			let method = options.method || 'POST';
	
			xhr.open(method, url, true);
	
			xhr.onload = function() {
				resolve(xhr.responseText);
			}
			xhr.onerror = function(){
				reject(new Error(xhr.responseText));
			}
	
			xhr.send();
		})

		return promise;
	}