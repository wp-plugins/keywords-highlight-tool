<?php
/*
Plugin Name: Search engine keywords highlighter 
Plugin URI: http://bluehua.org/2009/07/22/333.html 
Description: highlight the keywords if the visitor is from search engine 
Author: emptyhua@gmail.com
Version: 0.1
Author URI: http://bluehua.org
*/

define( 'BLUE_KEYWORDS_HIGHLIGHT_VER', '0.1' );

function blue_kh_init()
{
    wp_enqueue_script( 'jquery' );
}

function blue_kh_img()
{
    $blog_url = get_bloginfo( 'wpurl' );
	echo "<script type=\"text/javascript\">\n";
    echo "if ( document.referrer !== '' && document.referrer.indexOf('" . $blog_url . "') === -1 ){\n";
    echo "document.write( '<script src=\"" . $blog_url . '/wp-content/plugins/blue-keywords-highlight/highlight.js?v=' . BLUE_KEYWORDS_HIGHLIGHT_VER . "\"></s' + 'cript>' );\n"; 
    echo "}\n";
    echo 'var wpBlueKeywordsHighlightPath = "' . $blog_url . '/wp-content/plugins/blue-keywords-highlight";';
    echo "\n</script>\n";
}

add_action( 'init', 'blue_kh_init' );
add_action( 'wp_footer', 'blue_kh_img' );

?>
