<?php
/**
 * Plugin deactivation handler.
 *
 * @package Alchemy_Aether_Engine
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles the Aether Engine shutdown process.
 */
final class AW_Aether_Deactivator {

	/**
	 * Run deactivation tasks.
	 *
	 * No settings, files or user data are deleted here.
	 *
	 * @return void
	 */
	public static function deactivate() {
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$logger = new AW_Aether_Logger();
			$logger->info( 'Alchemy Aether Engine deactivated.' );
		}

		do_action( 'aw_aether_deactivated' );
	}
}
