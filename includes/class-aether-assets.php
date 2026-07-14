<?php
/**
 * Frontend asset loader for the Alchemy Aether Engine.
 *
 * @package Alchemy_Aether_Engine
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Loads the public Aether browser runtime.
 */
final class AW_Aether_Assets {

	/**
	 * Register WordPress hooks.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ) );
	}

	/**
	 * Enqueue the browser runtime and registered modules.
	 *
	 * @return void
	 */
	public function enqueue() {
		wp_enqueue_script(
			'aw-aether-runtime',
			AW_AETHER_URL . 'assets/js/aether.js',
			array(),
			AW_AETHER_VERSION,
			true
		);

		wp_enqueue_script(
			'aw-aether-test-module',
			AW_AETHER_URL . 'assets/js/modules/test-module.js',
			array( 'aw-aether-runtime' ),
			AW_AETHER_VERSION,
			true
		);
	}
}
