<?php
 /*
 Plugin Name: Replace Block
 Plugin URI: http://egraffik.ru
 Description: Ajax front end
 Version: 2
 Author: Oleg Mayurchenko
 Author URI:http://egraffik.ru
 */
 

// enqueue and localise scripts
 wp_enqueue_script( 'my-ajax-handle', plugin_dir_url( __FILE__ ) . 'ajax.js' );
 wp_localize_script( 'my-ajax-handle', 'the_ajax_script', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
 

 // THE AJAX ADD ACTIONS
 //add_action( 'wp_ajax_the_ajax_hook', 'the_action' );
 //add_action( 'wp_ajax_nopriv_the_ajax_hook', 'the_action' ); // need this to serve non logged in users
 

 // for testing purposes
 add_action( 'wp_ajax_the_ajax_hook', 'the_action_extend' );
 add_action( 'wp_ajax_nopriv_the_ajax_hook', 'the_action_extend' );

function the_action_extend(){

	$links["О НАС"]="imgMenu";
	$links["АРОМАТИЗАТОРЫ"]="imgMenu";
	$links["ИНФОРМАЦИЯ"]="INFO";
	$links["НОВОСТИ"]="imgMenu";
	$links["КОНТАКТЫ"]="CONTACTS";

	$catalog = array ("ДЛЯ СПРЕДОВ И МАРГАРИНОВ",
										"ДЛЯ СЫРНЫХ ПРОДУКТОВ",
										"ДЛЯ МОЛОЧНЫХ ИЗДЕЛИЙ",
										"ДЛЯ МОРОЖЕНОГО",
										"ДЛЯ КОНДИТЕРСКИХ ИЗДЕЛИЙ",
										"ДЛЯ БЕЗАЛКОГОЛЬНЫХ НАПИТКОВ",
										"ДЛЯ ЧАЯ И КОФЕ",
										"ДЛЯ СГУЩЕННОГО МОЛОКА",
										"ДЛЯ НАЧИНОК");	

	$page_block = ( isset($_POST['data']) ? $_POST['data'] : $_POST['imgMenu'] );

	$page_block = to_upper($page_block);

	if ( array_key_exists($page_block, $links) ){
		echo get_template_part( $links[$page_block] );
	} else if(in_array( $page_block, $catalog) ){
	 	$cat_item = search_category( $page_block );
	 	
  	include(locate_template('category.php'));
  	
	} else {
		echo $page_block;
	}

	// if(array_key_exists ( $page_block, array $catalog ) ){
	// 	echo 
	// }

	// vardump( $page_block );

	

	// if(check_page_block( $page_block ) == 'top_line'){
	// 	echo get_template_part( $links[$page_block] );
	// }


	//$cat = search_category( $page_block );

	
	die( );
}




 // THE FUNCTION
function the_action(){

 /* this area is very simple but being serverside it affords the possibility of retreiving data from the server and passing it back to the javascript function */
	$block = array("category","info","news");

	$page_block = ( isset($_POST['data']) ? $_POST['data'] : $_POST['main'] );

	foreach( $block as $request_item){

 		if( $request_item == $page_block ){
 			get_template_part( $page_block  );
 		//	break;
 		} 
	} // foreach()

	die( );// wordpress may print out a spurious zero without this - can be particularly bad if using json
} 
 
 