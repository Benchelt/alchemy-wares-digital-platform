<?php
/**
 * Plugin Name: Alchemy Aether Engine
 * Plugin URI: https://alchemywares.com
 * Description: Environmental experience engine powering immersive audio, atmospheres, themes and visual effects across the Alchemy Wares platform.
 * Version: 0.1.0
 * Requires at least: 6.8
 * Requires PHP: 8.2
 * Author: JohnBen Roberts
 * Author URI: https://alchemywares.com
 * License: GPL v2 or later
 * Text Domain: alchemy-aether-engine
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin version.
define( 'AW_AETHER_VERSION', '0.1.0' );

// Plugin paths.
define( 'AW_AETHER_FILE', __FILE__ );
define( 'AW_AETHER_PATH', plugin_dir_path( __FILE__ ) );
define( 'AW_AETHER_URL', plugin_dir_url( __FILE__ ) );

// Load the core services.
require_once AW_AETHER_PATH . 'includes/class-aether-logger.php';
require_once AW_AETHER_PATH . 'includes/class-aether.php';

// Start the Alchemy Aether Engine.
AW_Aether::instance();
