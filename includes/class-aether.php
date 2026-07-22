<?php
/**
 * Core Alchemy Aether Engine bootstrap class.
 *
 * @package Alchemy_Aether_Engine
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Starts and coordinates the Alchemy Aether Engine.
 */
final class AW_Aether {

	/**
	 * Shared engine instance.
	 *
	 * @var AW_Aether|null
	 */
	private static $instance = null;

	/**
	 * Logger service.
	 *
	 * @var AW_Aether_Logger|null
	 */
	private $logger = null;

	/**
	 * Frontend asset loader.
	 *
	 * @var AW_Aether_Assets|null
	 */
	private $assets = null;

        /**
         * WordPress admin interface.
         *
         * @var AW_Aether_Admin|null
         */
        private $admin = null;

        /**
         * WordPress UI integration.
         *
         * @var AW_Aether_UI|null
         */
        private $ui = null;

	/**
	 * Return the shared engine instance.
	 *
	 * @return AW_Aether
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Prevent direct construction.
	 */
	private function __construct() {
		$this->register_hooks();
	}

	/**
	 * Register WordPress hooks.
	 *
	 * @return void
	 */
	private function register_hooks() {
		add_action( 'plugins_loaded', array( $this, 'boot' ) );
	}

	/**
	 * Boot the engine.
	 *
	 * @return void
	 */
	public function boot() {
		$this->logger = new AW_Aether_Logger();
		$this->assets = new AW_Aether_Assets();
                $this->admin  = new AW_Aether_Admin();
                $this->ui     = new AW_Aether_UI();

		$this->assets->register();
                $this->admin->register();
                $this->ui->register();

		$this->logger->info(
			'Alchemy Aether Engine browser runtime registered successfully.'
		);

		do_action( 'aw_aether_loaded', $this );
	}

	/**
	 * Return the logger service.
	 *
	 * @return AW_Aether_Logger|null
	 */
	public function logger() {
		return $this->logger;
	}

	/**
	 * Return the asset loader.
	 *
	 * @return AW_Aether_Assets|null
	 */
	public function assets() {
		return $this->assets;
	}

        /**
         * Return the WordPress UI service.
         *
         * @return AW_Aether_UI|null
         */
        public function ui() {
                return $this->ui;
        }


	/**
	 * Prevent cloning the shared engine instance.
	 *
	 * @return void
	 */
	private function __clone() {}

	/**
	 * Prevent restoring the shared instance from serialized data.
	 *
	 * @return void
	 *
	 * @throws Exception When unserialization is attempted.
	 */
	public function __wakeup() {
		throw new Exception(
			'The Alchemy Aether Engine cannot be unserialized.'
		);
	}
}
