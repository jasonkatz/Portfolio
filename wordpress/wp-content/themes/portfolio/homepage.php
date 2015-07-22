<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of page
 * and that other 'pages' on you WordPress site will use a
 * different template.
 *
 * @package portfolio
 *
 * Template Name: Homepage
 */

include("header.php"); ?>

    <?php while ( have_posts() ) : the_post(); ?>

        <?php echo get_field('name'); ?>

    <?php endwhile; // End of post loop ?>

<?php include("footer.php"); ?>
