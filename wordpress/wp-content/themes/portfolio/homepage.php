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
        <div class="section__content">
            <div class="content">

                <div class="content__row--wrapper">
<?php /*<div class="content__row">
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
                        </div>*/?>

                    <div class="content__row">
                        <div class="content__portfolio-title type-5">
                            <?php echo get_field('slide_2_heading'); ?>
                        </div>
                    </div>
                    <?php
                        $portfolio_items = get_field('portfolio_items');
                        $args = array('post_type'              => 'portfolio_item-data',
                                      'posts_per_page'         => -1,
                                      'orderby'                => 'date',
                                      'order'                  => 'DESC',
                                      'cache_results'          => false,
                                      'update_post_term_cache' => false,
                                      'ignore_sticky_posts'    => true,
                                      'update_post_meta_cache' => false);
                        $the_query = new WP_Query($args);

                    if ($the_query->have_posts()): ?>

                        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
                            <div class="content__portfolio-title type-5">
                                <?php echo get_the_title(); ?>
                            </div>

                        <?php wp_reset_postdata(); ?>
                        <?php endwhile; ?>

                    <?php endif; ?>

                    <div class="content__row">
                        <div class="content__portfolio--slideshow-wrapper">
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
        <div class="section__content">
            <div class="content">

                <div class="content__row--wrapper">
                    <div class="content__row">
                        <div class="content__contact-title type-5">
                            <?php echo get_field('slide_3_heading'); ?>
                        </div>
                    </div>
                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <form class="content__contact-form">
                                <div class="content__column">
                                    <div class="content__labels">
                                        <label for="name_field" class="contact__label type-7">Full Name</label>
                                    </div>
                                </div>
                                <div class="content__column">
                                    <div class="content__fields">
                                        <input type="text" name="name_field" class="contact__field js-contact__name--field type-7 js-required__field">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <form class="content__contact-form">
                                <div class="content__column">
                                    <div class="content__labels">
                                        <label for="email_field" class="contact__label type-7">Email Address</label>
                                    </div>
                                </div>
                                <div class="content__column">
                                    <div class="content__fields">
                                        <input type="text" name="email_field" class="contact__field js-contact__email--field type-7 js-required__field">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="content__row">
                        <div class="content__column--wrapper">
                            <form class="content__contact-form">
                                <div class="content__column">
                                    <div class="content__labels">
                                        <label for="message_field" class="contact__label type-7">Message</label>
                                    </div>
                                </div>
                                <div class="content__column">
                                    <div class="content__fields">
                                        <textarea name="message_field" class="contact__field js-contact__message--field type-8 js-required__field"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div> <!-- content -->
        </div>
    </section>

<?php include("footer.php"); ?>
