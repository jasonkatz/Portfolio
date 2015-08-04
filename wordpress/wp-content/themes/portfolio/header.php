<?php

include 'utils/vars.php'
?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="<?php echo $THEME_URI ?>/styles/main.css" type="text/css" />
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Poiret+One" type="text/css">

        <link rel="icon" href="<?php echo $THEME_URI ?>/favicon.ico" />
        <link rel="shortcut icon" href="<?php echo $THEME_URI ?>/favicon.ico" />
    </head>

    <div id="page">

        <header>
            <div class="header__top js-header__top">
                <div class="header__top--text type-1">
                    <?php echo get_field('name'); ?>
                </div>
            </div>
            <div class="header__menu js-header__menu">
                <div class="header__mini-section js-header__mini-section">
                    <div class="header__mini-section--text type-3">
                        <?php echo get_field('name'); ?>
                    </div>
                </div>
                <div class="header__menu--items js-header__menu--items">
                    <div class="header__menu--item js-header__menu--item type-2">
                        Item 1
                    </div>
                    <div class="header__menu--divider">
                        <img src="http://jasonkatz.me/wp-content/themes/portfolio/images/header_divider.svg">
                    </div>
                    <div class="header__menu--item js-header__menu--item type-2">
                        Item 2
                    </div>
                    <div class="header__menu--divider">
                        <img src="http://jasonkatz.me/wp-content/themes/portfolio/images/header_divider.svg">
                    </div>
                    <div class="header__menu--item js-header__menu--item type-2">
                        Item 3
                    </div>
                    <div class="header__menu--arrow js-header__menu--arrow">
                    </div>
                </div>
            </div>
        </header>

        <div id="wrapper">
