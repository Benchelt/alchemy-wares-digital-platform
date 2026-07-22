<?php
/**
 * Aether Engine Settings Service.
 *
 * @package Alchemy_Aether_Engine
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class AW_Aether_Settings {

	/**
	 * WordPress option name.
	 *
	 * @var string
	 */
	const OPTION_NAME = 'aw_aether_settings';

	/**
	 * Default settings.
	 *
	 * @return array
	 */
	public static function defaults() {
		return array(
			'enabled'           => true,
			'audio_enabled'     => true,
			'visuals_enabled'   => true,
			'ui_enabled'        => true,
			'default_experience'=> 'Temple',
			'default_volume'    => 40,
			'experience_overrides' => array(),
		);
	}

	/**
	 * Return merged settings.
	 *
	 * @return array
	 */
	public static function all() {
		return wp_parse_args(
			get_option( self::OPTION_NAME, array() ),
			self::defaults()
		);
	}

	/**
	 * Get a single setting.
	 *
	 * @param string $key Setting key.
	 * @param mixed  $fallback Optional fallback.
	 * @return mixed
	 */
	public static function get( $key, $fallback = null ) {

		$settings = self::all();

		return array_key_exists( $key, $settings )
			? $settings[ $key ]
			: $fallback;
	}

	/**
	 * Return stored experience overrides.
	 *
	 * @return array
	 */
	public static function experience_overrides() {

		$overrides = self::get( 'experience_overrides', array() );

		return is_array( $overrides )
			? $overrides
			: array();
	}
}
