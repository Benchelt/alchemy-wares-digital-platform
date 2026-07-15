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
	 * Return a cache-busting version for an asset.
	 *
	 * @param string $relative_path Relative path from the plugin root.
	 * @return string
	 */
	private function asset_version( $relative_path ) {
		$absolute_path = AW_AETHER_PATH . $relative_path;

		if ( file_exists( $absolute_path ) ) {
			return (string) filemtime( $absolute_path );
		}

		return AW_AETHER_VERSION;
	}

	/**
	 * Enqueue core services, runtime and modules.
	 *
	 * @return void
	 */
	public function enqueue() {
		wp_enqueue_script(
			'aw-aether-events',
			AW_AETHER_URL . 'assets/js/core/events.js',
			array(),
			$this->asset_version( 'assets/js/core/events.js' ),
			true
		);

		wp_enqueue_script(
			'aw-aether-runtime',
			AW_AETHER_URL . 'assets/js/aether.js',
			array( 'aw-aether-events' ),
			$this->asset_version( 'assets/js/aether.js' ),
			true
		);

		wp_enqueue_script(
			'aw-aether-test-module',
			AW_AETHER_URL . 'assets/js/modules/test-module.js',
			array( 'aw-aether-runtime' ),
			$this->asset_version( 'assets/js/modules/test-module.js' ),
			true
		);

		wp_enqueue_script(
			'aw-aether-audio-module',
			AW_AETHER_URL . 'assets/js/modules/audio.js',
			array( 'aw-aether-runtime' ),
			$this->asset_version( 'assets/js/modules/audio.js' ),
			true
		);
	}
}
