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

                <div class="content__row--wrapper">
                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <div class="content__column">
                                <div class="content__personal-photo">
                                    <img src="<?php echo get_field('slide_1_image'); ?>">
                                </div>
                            </div>
                            <div class="content__column">
                                <div class="content__personal-description type-4">
                                    <?php echo get_field('slide_1_description'); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> <!-- content -->
        </div> <!-- section__content -->

        <div class="chevron__wrapper">
            <img class="js-chevron" src="<?php echo $THEME_URI ?>/images/chevron.svg">
        </div>

    </section>


    <section class="js-slide">
        <!-- Insert content here -->
        <div class="section__content">
            <div class="content">

                <div class="content__row--wrapper">
                    <div class="content__row">
                        <div class="content__portfolio-title type-5">
                            <?php echo get_field('slide_2_heading'); ?>
                        </div>
                    </div>
                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <div class="content__column">
                                <div class="content__portfolio-block">
                                    <a href="<?php echo get_field('slide_2_link_1'); ?>" target="_blank">
                                        <div class="content__portfolio-block--overlay type-6">
                                            Projects
                                        </div>
                                        <img src="<?php echo $THEME_URI ?>/images/gear-icon.svg">
                                    </a>
                                </div>
                            </div>
                            <div class="content__column">
                                <div class="content__portfolio-block">
                                    <a href="<?php echo get_field('slide_2_link_2'); ?>" target="_blank">
                                        <div class="content__portfolio-block--overlay type-6">
                                            Github
                                        </div>
                                        <img src="<?php echo $THEME_URI ?>/images/github-icon.svg">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="chevron__wrapper">
            <img class="js-chevron" src="<?php echo $THEME_URI ?>/images/chevron.svg">
        </div>
    </section>

    <section class="js-slide">
        <!-- Insert content here -->
        <div class="section__content">
            <div class="content">


            </div> <!-- content -->
        </div>
    </section>

<?php include("footer.php"); ?>
