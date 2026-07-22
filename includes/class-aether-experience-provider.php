<?php
/**
 * Aether Engine Experience Provider.
 *
 * @package Alchemy_Aether_Engine
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Supplies experience definitions to the browser runtime.
 */
final class AW_Aether_Experience_Provider {

	/**
	 * Return all registered experience definitions.
	 *
	 * @return array<string, array<string, mixed>>
	 */
	public function all() {
		$experiences = array(
			'Temple' => array(
				'ambience' => true,

				'audio' => array(
					'enabled' => true,
					'volume'  => 0.4,
				),

				'visual' => array(
					'enabled' => true,
					'preset'  => 'temple',

					'particles' => array(
						'enabled'  => true,
						'type'     => 'dust',
						'count'    => 40,
						'colour'   => '198, 167, 94',
						'minSize'  => 0.7,
						'maxSize'  => 2.4,
						'minSpeed' => 0.08,
						'maxSpeed' => 0.28,
					),
				),
			),
		);

		/**
		 * Filter Aether experience definitions.
		 *
		 * @param array<string, array<string, mixed>> $experiences Experiences.
		 */
		return apply_filters(
			'aw_aether_experiences',
			$experiences
		);
	}

	/**
	 * Return one experience definition.
	 *
	 * @param string $name Experience name.
	 * @return array<string, mixed>|null
	 */
	public function get( $name ) {
		$experiences = $this->all();

		return isset( $experiences[ $name ] )
			? $experiences[ $name ]
			: null;
	}

	/**
	 * Return whether an experience exists.
	 *
	 * @param string $name Experience name.
	 * @return bool
	 */
	public function has( $name ) {
		return null !== $this->get( $name );
	}

	/**
	 * Return the number of experiences.
	 *
	 * @return int
	 */
	public function count() {
		return count( $this->all() );
	}
}
