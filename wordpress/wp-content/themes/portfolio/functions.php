<?php
/**
 * portfolio functions and definitions
 *
 * @package portfolio
 */

function my_theme_add_editor_styles() {
    remove_post_type_support('page', 'editor');
}

add_action('admin_init', 'my_theme_add_editor_styles');

function remove_admin_menu_items() {
    $remove_menu_items = array(__('Comments'),__('Posts'));
    global $menu;
    end ($menu);
    while (prev($menu)) {
        $item = explode(' ', $menu[key($menu)][0]);
        if (in_array($item[0] != NULL ? $item[0] : "", $remove_menu_items)) {
            unset($menu[key($menu)]);
        }
    }
}

add_action('admin_menu', 'remove_admin_menu_items');

?>
