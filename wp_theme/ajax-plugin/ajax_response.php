<?php
 /*
 Plugin Name: Replace Block
 Plugin URI: http://egraffik.ru
 Description: Ajax front end
 Version: 2
 Author: Oleg Mayurchenko
 Author URI:http://egraffic.ru
 */
 
require_once "recaptchalib.php";

// encueue ReCAPTCHA
function enqueue_recaptcha() {
	wp_enqueue_script( 'recaptcha', 'https://www.google.com/recaptcha/api.js?render=explicit');
}
add_action( 'wp_enqueue_scripts', 'enqueue_recaptcha' );

// encueue ReCAPTCHA
function enqueue_yandexMaps() {
	wp_enqueue_script( 'yandexMaps', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU');
}
add_action( 'wp_enqueue_scripts', 'enqueue_yandexMaps' );


// enqueue and localise scripts
	wp_enqueue_script( 'my-ajax-handle', plugin_dir_url( __FILE__ ) . 'ajax.js' );
	wp_localize_script( 'my-ajax-handle', 'the_ajax_script', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );





function get_template_part_with_data($slug, array $data = array()){
	$slug .= '.php';
	extract($data);

	require locate_template($slug);
}

function send_email($msg_data) {
	$frm_name  = "VkusArom";
	//$recepient = "oleg@spiritcenter.ru";
	$recepient = "info@sweetfeel.ru";
	//$sitename  = "SweetFeel.ru";
	$subject   = "Новая заявка с сайта SweetFeel.ru";

	$name = $msg_data['name'];
	$email = $msg_data['email'];
	$message = $msg_data['message'];

	$message = "
	E-mail: $email <br>
	Имя: $name <br>
	Сообщение: $message
	";

	if (mail($recepient, $subject, $message, "From: $frm_name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"")) {

		wp_die('success_email');
	} else {
		wp_die('failure_email');
	}
}

function message_feedback($msg_data) {

	// your secret key
	$secret = "6LfA_xIUAAAAAOHmY_fkX7JEkMFViuHNM6JMkk73";
	// empty response
	$response = null;
	// check secret key
	$reCaptcha = new ReCaptcha($secret);

	if ( isset($msg_data['captcha']) ) {
		$response = $reCaptcha->verifyResponse(
			$_SERVER["REMOTE_ADDR"],
			$msg_data['captcha']
		);


		if ($response != null && $response->success) {
			send_email($msg_data);
		} else {
			wp_die('catcha_failed');
		}
		
	}

}

add_action('wp_ajax_query_block', 'query_block');
add_action('wp_ajax_nopriv_query_block', 'query_block');

function query_block() {

	if (isset($_GET['name']) && isset($_GET['email']) && isset($_GET['message'])) {
		//TODO sanitize 
		$name = sanitize_text_field($_GET['name']);
		$email = sanitize_email($_GET['email']);
		$message = sanitize_text_field($_GET['message']);

		message_feedback(array(
			'name' => $name,
			'email' => $email,
			'message' => $message,
			'captcha' => $_GET['recaptchaResponse']
		));
		wp_die('heey');
	}

	
	$blocks = array (
	 	"about" 		=> "imgMenu",
	 	"catalogue"  	=> "imgMenu",
 		"info"			=> "info",
 		"news"		 	=> "imgMenu",
 		"contacts"		=> "contacts",
 		"distrib"		=> "distrib",
 		"manufacture"   => "manufacture"
		);

	if (isset($_GET['submenuItem'])){
	 	$getBlock = $_GET['submenuItem'];
		
		// Подключающий шаблон
		get_template_part_with_data('category', array(
	  	'block' => $_GET['submenuItem']
		));
 
 		wp_die();
	} else if (isset($_GET['block'])) {
	 	$getBlock = $_GET['block'];
	}	else {
	 	$getBlock = "imgMenu";
	}
	
	// TODO buffer
	//echo get_template_part( $blocks[$getBlock] );

	ob_start();
	echo get_template_part( $blocks[$getBlock] );
	$ajax_template = ob_get_contents();
	ob_end_clean();
 	echo $ajax_template;

	wp_die(); // выход нужен для того, чтобы в ответе не было ничего лишнего, только то что возвращает функция
}




