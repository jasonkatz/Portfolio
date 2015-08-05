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


    <section class="js-slide">

        <div class="section__content">
            <div class="content">

                <div class="content__rows">
                    <div class="content__row">
                        <div class="content__row--animation">
                        </div>
                        <div class="content__row--text type-4">
                            <?php echo get_field('slide_1_content_1'); ?>
                        </div>
                    </div>
                    <div class="content__row">
                        <div class="content__row--animation">
                        </div>
                        <div class="content__row--text type-4">
                            <?php echo get_field('slide_1_content_2'); ?>
                        </div>
                    </div>
                    <div class="content__row">
                        <div class="content__row--animation">
                        </div>
                        <div class="content__row--text type-4">
                            <?php echo get_field('slide_1_content_3'); ?>
                        </div>
                    </div>
                </div>

            </div> <!-- content -->
        </div> <!-- section__content -->

        <div class="chevron__wrapper">
            <img class="js-chevron" src="http://jasonkatz.me/wp-content/themes/portfolio/images/chevron.svg">
        </div>

    </section>

    <section class="js-slide">
        <!-- Insert content here -->
        <div class="section__content">
            <div class="content">

                <div class="content__rows">
                    <div class="content__row">
                        <div class="content__row--animation">
                        </div>
                        <div class="content__row--text type-4">
                            <?php echo get_field('slide_1_content_1'); ?>
                        </div>
                    </div>
                    <div class="content__row">
                        <div class="content__row--animation">
                        </div>
                        <div class="content__row--text type-4">
                            <?php echo get_field('slide_1_content_2'); ?>
                        </div>
                    </div>
                    <div class="content__row">
                        <div class="content__row--animation">
                        </div>
                        <div class="content__row--text type-4">
                            <?php echo get_field('slide_1_content_3'); ?>
                        </div>
                    </div>
                </div>

            </div> <!-- content -->
        </div>
        <div class="chevron__wrapper">
            <img class="js-chevron" src="http://jasonkatz.me/wp-content/themes/portfolio/images/chevron.svg">
        </div>
    </section>

    <section class="js-slide">
        <!-- Insert content here -->
        <div class="section__content">
        </div>
    </section>

<?php include("footer.php"); ?>
