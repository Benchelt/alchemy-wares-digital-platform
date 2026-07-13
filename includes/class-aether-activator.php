<?php
/**
 * Plugin activation handler.
 *
 * @package Alchemy_Aether_Engine
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Prepares the Aether Engine when the plugin is activated.
 */
final class AW_Aether_Activator {

	/**
	 * Run activation tasks.
	 *
	 * @return void
	 */
	public static function activate() {
		$directories = array(
			AW_AETHER_PATH . 'assets/audio',
			AW_AETHER_PATH . 'assets/css',
			AW_AETHER_PATH . 'assets/images',
			AW_AETHER_PATH . 'assets/js',
			AW_AETHER_PATH . 'config',
			AW_AETHER_PATH . 'logs',
		);

		foreach ( $directories as $directory ) {
			if ( ! is_dir( $directory ) ) {
				wp_mkdir_p( $directory );
			}
		}

		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$logger = new AW_Aether_Logger();
			$logger->info( 'Alchemy Aether Engine activated.' );
		}

		do_action( 'aw_aether_activated' );
	}
}
