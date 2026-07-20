<?php
/**
 * Plugin Name:       Sidebar Colors
 * Description:       Focused color controls for the WordPress block editor sidebar.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            xavortm
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sidebar-colors
 *
 * @package SidebarColors
 */

namespace SidebarColors;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SIDEBAR_COLORS_VERSION', '0.1.0' );
define( 'SIDEBAR_COLORS_PATH', plugin_dir_path( __FILE__ ) );
define( 'SIDEBAR_COLORS_URL', plugin_dir_url( __FILE__ ) );

require_once SIDEBAR_COLORS_PATH . 'src/Plugin.php';

( new Plugin() )->setup();
