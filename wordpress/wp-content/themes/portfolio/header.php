<?php

include 'utils/vars.php'
?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimal-ui">

        <link rel="stylesheet" href="<?php echo $THEME_URI ?>/styles/build/main.css" type="text/css" />
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Poiret+One" type="text/css">

        <link rel="icon" href="<?php echo $THEME_URI ?>/favicon.ico" />
        <link rel="shortcut icon" href="<?php echo $THEME_URI ?>/favicon.ico" />

        <script src="<?php echo $THEME_URI ?>/javascript/modernizr.js"></script>

        <title>Jason Katz</title>
    </head>

    <div id="page">

        <header>
            <div class="header__mobile js-header__mobile">
                <div class="header__mobile--text type-1">
                    <?php echo get_field('name'); ?>
                </div>
                <div class="header__mobile--hamburger js-header__mobile--hamburger">
                    <div class="hamburger__wrapper">
                        <span class="hamburger"></span>
                    </div>
                </div>
                <div class="header__mobile--menu js-header__mobile--menu">
                    <div class="header__menu--items">
                        <div class="header__menu--item js-mobile-header__menu--item type-2">
                            <?php echo get_field('slide_1_title'); ?>
                        </div>
                        <div class="header__menu--item js-mobile-header__menu--item type-2">
                            <?php echo get_field('slide_2_title'); ?>
                        </div>
                        <div class="header__menu--item js-mobile-header__menu--item type-2">
                            <?php echo get_field('slide_3_title'); ?>
                        </div>
                    </div>
                </div>
            </div>

            <div class="header__main">
                <div class="header__top js-header__top">
                    <div class="header__top--text js-header__top--text type-1">
                        <?php echo get_field('name'); ?>
                    </div>
                </div>
                <div class="header__menu js-header__menu">
                    <div class="header__mini-section js-header__mini-section">
                        <div class="header__mini-section--text js-header__mini-section--text type-3">
                            <?php echo get_field('name'); ?>
                        </div>
                    </div>
                    <div class="header__menu--items js-header__menu--items">
                        <div class="header__menu--item js-header__menu--item type-2">
                            <?php echo get_field('slide_1_title'); ?>
                        </div>
                        <!-- Put this here so it doesn't interfere with first/last item selection in css -->
                        <div class="header__menu--arrow js-header__menu--arrow">
                        </div>
                        <div class="header__menu--divider">
                        </div>
                        <div class="header__menu--item js-header__menu--item type-2">
                            <?php echo get_field('slide_2_title'); ?>
                        </div>
                        <div class="header__menu--divider">
                        </div>
                        <div class="header__menu--item js-header__menu--item type-2">
                            <?php echo get_field('slide_3_title'); ?>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    <div id="wrapper">
