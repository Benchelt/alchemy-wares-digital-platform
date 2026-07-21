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
                preset: 'temple',

                particles: {
                    enabled: true,
                    type: 'dust',
                    count: 40,
                    colour: '198, 167, 94',
                    minSize: 0.7,
                    maxSize: 2.4,
                    minSpeed: 0.08,
                    maxSpeed: 0.28
                }
            }
        }
    );

    console.log(
        '[Aether] Default experiences registered.'
    );

})(window);
