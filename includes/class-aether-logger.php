<?php
/**
 * Logging service for the Alchemy Aether Engine.
 *
 * @package Alchemy_Aether_Engine
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Writes development log entries for the Aether Engine.
 */
final class AW_Aether_Logger {

	/**
	 * Log file path.
	 *
	 * @var string
	 */
	private $log_file;

	/**
	 * Create the logger.
	 */
	public function __construct() {
		$this->log_file = AW_AETHER_PATH . 'logs/aether.log';
	}

	/**
	 * Record an informational message.
	 *
	 * @param string $message Log message.
	 * @return void
	 */
	public function info( $message ) {
		$this->write( 'INFO', $message );
	}

	/**
	 * Record a warning message.
	 *
	 * @param string $message Log message.
	 * @return void
	 */
	public function warning( $message ) {
		$this->write( 'WARNING', $message );
	}

	/**
	 * Record an error message.
	 *
	 * @param string $message Log message.
	 * @return void
	 */
	public function error( $message ) {
		$this->write( 'ERROR', $message );
	}

	/**
	 * Write a formatted entry to the log file.
	 *
	 * @param string $level   Severity level.
	 * @param string $message Log message.
	 * @return void
	 */
	private function write( $level, $message ) {
		if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
			return;
		}

		$log_directory = dirname( $this->log_file );

		if ( ! is_dir( $log_directory ) ) {
			wp_mkdir_p( $log_directory );
		}

		$entry = sprintf(
			"[%s] [%s] %s\n",
			current_time( 'mysql' ),
			sanitize_text_field( $level ),
			sanitize_text_field( $message )
		);

		error_log( $entry, 3, $this->log_file );
	}
}
