<?php
/**
 * WordPress UI integration for the Alchemy Aether Engine.
 *
 * @package Alchemy_Aether_Engine
 */

if ( ! defined( 'ABSPATH' ) ) {
        exit;
}

/**
 * Registers reusable Aether interface components.
 */
final class AW_Aether_UI {

        /**
         * Register WordPress UI hooks.
         *
         * @return void
         */
        public function register() {
                add_shortcode(
                        'aether_ambience_toggle',
                        array( $this, 'render_ambience_toggle' )
                );
        }

        /**
         * Render the ambience toggle control.
         *
         * The browser module detects this existing control and
         * attaches the standard Aether ambience behaviour to it.
         *
         * @param array<string, mixed> $attributes Shortcode attributes.
         *
         * @return string
         */
        public function render_ambience_toggle( $attributes = array() ) {
                $attributes = shortcode_atts(
                        array(
                                'label' => __(
                                        'Ambience',
                                        'alchemy-aether-engine'
                                ),
                        ),
                        $attributes,
                        'aether_ambience_toggle'
                );

                $label = sanitize_text_field(
                        (string) $attributes['label']
                );

                ob_start();
                ?>
                <button
                        type="button"
                        class="aether-ambience-control aether-ambience-control--embedded"
                        aria-pressed="false"
                        aria-label="<?php echo esc_attr__( 'Ambient sound: Off', 'alchemy-aether-engine' ); ?>"
                >
                        <span class="aether-ambience-label">
                                <?php echo esc_html( $label ); ?>
                        </span>

                        <span
                                class="aether-ambience-switch"
                                aria-hidden="true"
                        >
                                <span class="aether-ambience-knob"></span>
                        </span>

                        <span class="aether-ambience-status">
                                <?php esc_html_e( 'Off', 'alchemy-aether-engine' ); ?>
                        </span>
                </button>
                <?php

                return trim( (string) ob_get_clean() );
        }
}
