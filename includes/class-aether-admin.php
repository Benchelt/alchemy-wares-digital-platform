<?php
/**
 * Aether Engine WordPress admin interface.
 *
 * @package Alchemy_Aether_Engine
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class AW_Aether_Admin {

	/**
	 * Register admin hooks.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'admin_menu', array( $this, 'register_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Register the Aether Engine menu.
	 *
	 * @return void
	 */
	public function register_menu() {
		add_menu_page(
			'Aether Engine',
			'Aether Engine',
			'manage_options',
			'alchemy-aether-engine',
			array( $this, 'render_dashboard' ),
			'dashicons-superhero-alt',
			58
		);
	}

	/**
	 * Load admin CSS only on the Aether page.
	 *
	 * @param string $hook Current admin page hook.
	 * @return void
	 */
	public function enqueue_assets( $hook ) {
		if ( 'toplevel_page_alchemy-aether-engine' !== $hook ) {
			return;
		}

		wp_enqueue_style(
			'aw-aether-admin',
			AW_AETHER_URL . 'assets/css/admin.css',
			array(),
			AW_AETHER_VERSION
		);
	}

	/**
	 * Render the dashboard.
	 *
	 * @return void
	 */
	public function render_dashboard() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		?>
		<div class="wrap aw-aether-admin">
			<section class="aw-aether-hero">
				<div>
					<p class="aw-aether-label">
						Environmental Experience Platform
					</p>

					<h1>Aether Experience Engine</h1>

					<p class="aw-aether-intro">
						Immersive audio, atmospheric visuals and configurable
						experiences powered by one unified engine.
					</p>
				</div>

				<div class="aw-aether-status">
					<span></span>

					<div>
						<strong>Engine Online</strong>
						<small>
							Version <?php echo esc_html( AW_AETHER_VERSION ); ?>
						</small>
					</div>
				</div>
			</section>

			<section class="aw-aether-stats">
				<article>
					<span>Runtime</span>
					<strong>Ready</strong>
				</article>

				<article>
					<span>Modules</span>
					<strong>5</strong>
				</article>

				<article>
					<span>Experiences</span>
					<strong>1</strong>
				</article>

				<article>
					<span>Default</span>
					<strong>Temple</strong>
				</article>
			</section>

			<section class="aw-aether-panel">
				<p class="aw-aether-label">Active Experience</p>
				<h2>Temple</h2>

				<div class="aw-aether-details">
					<div>
						<span>Ambience</span>
						<strong>Enabled</strong>
					</div>

					<div>
						<span>Audio volume</span>
						<strong>40%</strong>
					</div>

					<div>
						<span>Visual preset</span>
						<strong>Temple</strong>
					</div>

					<div>
						<span>Particles</span>
						<strong>40 gold dust</strong>
					</div>
				</div>
			</section>
		</div>
		<?php
	}
}
