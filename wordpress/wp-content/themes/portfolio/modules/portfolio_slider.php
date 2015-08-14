<div class="portfolio__slideshow--wrapper js-portfolio__slideshow--wrapper">
    <div class="portfolio__slideshow--arrow-left js-portfolio__slideshow--arrow">
        <div class="arrow arrow__left">
        </div>
    </div>
    <div class="portfolio__slideshow--arrow-right js-portfolio__slideshow--arrow">
        <div class="arrow arrow__right">
        </div>
    </div>
    <div class="portfolio__slideshow js-portfolio__slideshow">

    <?php
        $portfolio_items = get_field('portfolio_items');
        $args = array('post__in'             => $portfolio_items,
                        'post_type'              => 'portfolio_item-data',
                        'posts_per_page'         => -1,
                        'orderby'                => 'post__in',
                        'cache_results'          => false,
                        'update_post_term_cache' => false,
                        'ignore_sticky_posts'    => true,
                        'update_post_meta_cache' => false);
        $the_query = new WP_Query($args);

    if ($the_query->have_posts()): ?>

        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

        <div class="portfolio__slideshow--slide js-portfolio__slide">
            <div class="slideshow__slide--content">
                <div class="slide__content--title type-9">
                    <?php echo get_the_title(); ?>
                </div>
                <div class="slide__content--top-wrapper">
                    <div class="slide__content--image">
                        <img src="<?php echo get_field('image'); ?>">
                    </div>
                    <div class="slide__content--summary type-10">
                        <?php echo get_field('summary'); ?>
                    </div>
                </div>
                <div class="slide__content--mobile-caption type-10">
                    <?php echo get_field('mobile_caption'); ?>
                </div>
                <div class="slide__content--links">
                    <?php if (get_field('link_1')): ?>
                    <div class="slide__content--link">
                        <a href="<?php echo get_field('link_1'); ?>" target="_blank">
                            <div class="content__link--overlay type-6">
                                <?php echo get_field('link_1_overlay_text'); ?>
                            </div>
                            <img src="<?php echo $THEME_URI ?>/images/gear-icon.svg">
                        </a>
                    </div>
                    <?php endif; ?>
                    <?php if (get_field('link_2')): ?>
                    <div class="slide__content--link">
                        <a href="<?php echo get_field('link_2'); ?>" target="_blank">
                            <div class="content__link--overlay type-6">
                                <?php echo get_field('link_2_overlay_text'); ?>
                            </div>
                            <img src="<?php echo $THEME_URI ?>/images/github-icon.svg">
                        </a>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <?php wp_reset_postdata(); ?>
        <?php endwhile; ?>

    <?php endif; ?>

    </div>
</div>
