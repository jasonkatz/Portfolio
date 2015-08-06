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
                                <div class="content__animation">
                                </div>
                            </div>
                            <div class="content__column">
                                <div class="content__row--text type-4">
                                    <?php echo get_field('slide_1_content_1'); ?>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <div class="content__column">
                                <div class="content__animation">
                                </div>
                            </div>
                            <div class="content__column">
                                <div class="content__row--text type-4">
                                    <?php echo get_field('slide_1_content_2'); ?>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <div class="content__column">
                                <div class="content__animation">
                                </div>
                            </div>
                            <div class="content__column">
                                <div class="content__row--text type-4">
                                    <?php echo get_field('slide_1_content_3'); ?>
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
                        <div class="content__column--wrapper">
                            <div class="content__column">
                                <div class="content__personal-photo">
                                    <img src="<?php echo get_field('slide_2_image'); ?>">
                                </div>
                            </div>
                            <div class="content__column">
                                <div class="content__personal-description type-4">
                                    This is a test
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

                <div class="content__row--wrapper">
                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <div class="content__column">
                                <div class="content__animation">
                                </div>
                            </div>
                            <div class="content__column">
                                <div class="content__row--text type-4">
                                    <?php echo get_field('slide_1_content_1'); ?>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <div class="content__column">
                                <div class="content__animation">
                                </div>
                            </div>
                            <div class="content__column">
                                <div class="content__row--text type-4">
                                    <?php echo get_field('slide_1_content_2'); ?>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <div class="content__column">
                                <div class="content__animation">
                                </div>
                            </div>
                            <div class="content__column">
                                <div class="content__row--text type-4">
                                    <?php echo get_field('slide_1_content_3'); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> <!-- content -->
        </div>
    </section>

<?php include("footer.php"); ?>
