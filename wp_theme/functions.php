<?php

add_theme_support( 'menus' );

function enqueue_styles() {
	wp_enqueue_style( 'whitesquare-style', get_stylesheet_uri());
	// wp_enqueue_style( 'style', get_stylesheet_uri().'/css/style.css');
	wp_register_style('fonts', get_template_directory_uri().'/css/fonts.css');
	wp_enqueue_style( 'fonts');
	wp_register_style('carousel', get_template_directory_uri().'/css/react-carousel.es.css');
	wp_enqueue_style( 'carousel');
	wp_register_style('style', get_template_directory_uri().'/css/style.css');
	wp_enqueue_style( 'style');
	wp_register_style('media_wedoagency', get_template_directory_uri().'/css/media.css');
	wp_enqueue_style( 'media_wedoagency');
}
add_action('wp_enqueue_scripts', 'enqueue_styles');

function enqueue_scripts () {
	wp_register_script('html5-shim', 'https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js');
	wp_enqueue_script('html5-shim');
	wp_register_script('bundle',  get_template_directory_uri().'/js/bundle.js', '', '1.1', true);
	wp_enqueue_script('bundle');
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');

//remove_filter( 'the_content', 'wpautop' );// для контента
remove_filter( 'the_excerpt', 'wpautop' );// для анонсов
remove_filter( 'comment_text', 'wpautop' );// для комментарий

//Добавление верхнего рус. меню 
function get_topMenu_ru() {
    return wp_get_nav_menu_items('topMenu_ru');
}

add_action( 'rest_api_init', function () {
        register_rest_route( 'menus/topMenu_ru', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_topMenu_ru',
    ) );
} );

//Добавление верхнего англ. меню 
function get_topMenu_en() {
    return wp_get_nav_menu_items('topMenu_en');
}


add_action( 'rest_api_init', function () {
        register_rest_route( 'menus/topMenu_en', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_topMenu_en',
    ) );
} );

//Добавление верхнего меню соцсетей 
function get_social_footer() {
    return wp_get_nav_menu_items('social_footer');
}


add_action( 'rest_api_init', function () {
        register_rest_route( 'menus/social_footer', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_social_footer',
    ) );
} );


function prefix_send_email_to_admin() {
    $_POST = json_decode(file_get_contents('php://input'), true);

    $frm_name  = "WedoAgency";
		$to = "vfxq@rambler.ru";
		$sitename  = "WeDoAgeny.ru";
		$subject   = "Новое сообщение с сайта \"$sitename\"";
		
		$name = trim(sanitize_text_field($_POST["name"]));
		$email = trim(is_email($_POST["email"]));
		$message = trim(sanitize_text_field ($_POST["message"]));
		
		$message = "
		E-mail: $email <br>
		Имя: $name <br>
		Сообщение: $message
		";
			
		
		if (isset($name) && isset($email) && isset($message)){
			wp_mail($to, $subject, $message, "From: $frm_name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "		Content-type: text/html; charset=\"utf-8\"");
		}
}

add_action( 'admin_post_nopriv', 'prefix_send_email_to_admin' );
add_action( 'admin_post', 'prefix_send_email_to_admin' );