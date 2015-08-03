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

            </div> <!-- content -->
        </div> <!-- section__content -->

        <div class="chevron__wrapper">
        </div>

    </section>

    <section class="js-slide">
        <!-- Insert content here -->
        <div class="section__content">
        </div>
        <div class="chevron__wrapper">
        </div>
    </section>

    <section class="js-slide">
        <!-- Insert content here -->
        <div class="section__content">
        </div>
    </section>

<?php include("footer.php"); ?>
