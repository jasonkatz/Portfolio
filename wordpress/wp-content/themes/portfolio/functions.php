<?php
/**
 * portfolio functions and definitions
 *
 * @package portfolio
 */

function my_theme_add_editor_styles() {
    // Remove default editor
    remove_post_type_support('page', 'editor');
    remove_post_type_support('portfolio_item-data', 'editor');
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

function create_post_type() {
    register_post_type('portfolio_item-data',
        array(
            'labels' => array(
                'name' => __('Portfolio Items'),
                'singular_name' => __('Portfolio Item')
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'portfolio_item-data'),
            'menu_icon' => ''
        )
    );
}

add_action('init', 'create_post_type');

function custom_post_type() {
    // Set labels for CPT
    $portfolio_item_labels = array(
        'name'                  => _x('Portfolio Items', 'Post Type General Name', 'portfolio'),
        'singular_name'         => _x('Portfolio Item', 'Post Type Singular Name', 'portfolio'),
        'menu_name'             => __('Portfolio Items', 'portfolio'),
        'parent_item_colon'     => __('Parent Portfolio Item', 'portfolio'),
        'all_items'             => __('All Portfolio Items', 'portfolio'),
        'view_item'             => __('View Portfolio Item', 'portfolio'),
        'add_new_item'          => __('Add New Portfolio Item', 'portfolio'),
        'add_new'               => __('Add New', 'portfolio'),
        'edit_item'             => __('Edit Portfolio Item', 'portfolio'),
        'update_item'           => __('Update Portfolio Item', 'portfolio'),
        'search_item'           => __('Search Portfolio Items', 'portfolio'),
        'not_found'             => __('Not Found', 'portfolio'),
        'not_found_in_trash'    => __('Not Found in Trash', 'portfolio'),
    );

    // Set other options for CPT
    $portfolio_item_args = array(
        'label'                 => __('portfolio_item-data', 'portfolio'),
        'description'           => __('portfolio_item-data', 'portfolio'),
        'labels'                => __($portfolio_item_labels, 'portfolio'),
        'supports'              => array('title', 'thumbnail', 'revisions' ),
        'taxonomies'            => array(''),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_nav_menus'     => true,
        'show_in_admin_bar'     => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-id-alt',
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => false,
    );

    // Registering your Custom Post Type
    register_post_type('portfolio-item_data', $portfolio_item_args);
}

function add_menu_icons_styles() {
?>

    <style>
        #adminmenu #menu-posts-portfolio_item-data div.wp-menu-image:before {
            content: '\f337';
        }
    </style>

<?php }

add_action('admin_head', 'add_menu_icons_styles');

?>
