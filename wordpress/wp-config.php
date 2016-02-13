<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'portfolio_live');

/** MySQL database username */
define('DB_USER', 'portfolio_live');

/** MySQL database password */
define('DB_PASSWORD', 'io$$3232');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Z?hu/5]n/}FV38`CvMG_nMhNAR4^L9utG!W+a;B[m#q>oF&P)^>`8u,@Xp(4nR?&');
define('SECURE_AUTH_KEY',  'J+n+S)rW$UPA^fyepnwt<plZ5D:-`q+Tpc6{?Zd{^0UZJ%CPTo`%+w7W&1t| a-U');
define('LOGGED_IN_KEY',    'Cx4M*v@r-(d]|z-qLXV`L<Y_-#Zx bJb7^*WRA[e fnNI+}a~c$fyDxH{rNG9&*@');
define('NONCE_KEY',        ':;qTIuA+^eli.ky&C7|&X+Ke {xYN~sfafN6VCs~SV&b]U|+dTW_OJWfDyk.>Fjt');
define('AUTH_SALT',        ';lR*(z2s_@e6o+@P c?SYo`zWWC:Zt1{6R2;C+T|>C#GoCk53FVh3!=uuEH4X._1');
define('SECURE_AUTH_SALT', 'Q#?r|ROtC>|K>SRcoale&+?YVk2Mu{HkK3]0w0p(5D&0s2e(V_0NE-py+^|jVb~u');
define('LOGGED_IN_SALT',   'vj]`}mg]KNkx]VBZTH-lPks8lM4(Q=@O3WF[8V+-5Bn->xH}Fu>Zbo_SnUSp8qx_');
define('NONCE_SALT',       '+VtUL>.5J4?~jbz itm7CRk0%VV.v+V}w7IxsUOz@9V{[uMPNjrsl}Ll3zd Q{MT');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

