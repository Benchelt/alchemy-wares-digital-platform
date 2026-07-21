/**
 * Aether Default Experiences
 *
 * Version: 0.12.0
 */

(function (window) {
    'use strict';

    if (
        !window.Aether ||
        !window.Aether.Experience
    ) {
        return;
    }

    window.Aether.Experience.register(
        'Temple',
        {
            ambience: true,

            audio: {
                enabled: true,
                volume: 0.4
            },

            visual: {
                enabled: true,
                preset: 'temple'
            }
        }
    );

    console.log(
        '[Aether] Default experiences registered.'
    );

})(window);
