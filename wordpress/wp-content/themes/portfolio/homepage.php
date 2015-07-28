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

        <div id="page">

            <header>
                <div class="header__top">
                    <div class="header__top--text type-1">
                        <?php echo get_field('name'); ?>
                    </div>
                </div>
                <div class="header__menu">
                    <div class="header__menu--items">
                        <div class="header__menu--item type-2">
                            Item 1 
                        </div>
                        <div class="header__menu--item type-2">
                            Item 2 
                        </div>
                        <div class="header__menu--item type-2">
                            Item 3
                        </div>
                    </div>
                </div>
            </header>

            <div id="wrapper">

                <div style="position: absolute; top: 275px; left: 0; height: 3000px; width: 100%; background: linear-gradient(red, blue);">
                </div>

                <!--<div class="content">
                    <div class="content__rows">
                        <div class="content__row">
                            <div class="content__row--animation">
                            </div>
                            <div class="content__row--text">
                                Developer
                            </div>
                        </div>
                        <div class="content__row">
                            <div class="content__row--animation">
                            </div>
                            <div class="content__row--text">
                                Engineer
                            </div>
                        </div>
                        <div class="content__row">
                            <div class="content__row--animation">
                            </div>
                            <div class="content__row--text">
                                Designer
                            </div>
                        </div>
                    </div>

                </div>-->

                <section>
                    <!-- Insert content here -->
                    <div class="section__content">
                    </div>
                    <div class="chevron__wrapper">
                    </div>
                </section>

                <section>
                    <!-- Insert content here -->
                    <div class="section__content">
                    </div>
                    <div class="chevron__wrapper">
                    </div>
                </section>

            </div> <!-- #wrapper -->

        </div> <!-- #page -->

    <?php endwhile; // End of post loop ?>

<?php include("footer.php"); ?>
