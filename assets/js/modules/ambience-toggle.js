/**
 * Aether Ambience Toggle
 *
 * Version: 0.1.0
 */

(function (window) {
    'use strict';

    if (!window.Aether) {
        return;
    }

    const ToggleModule = {

        name: 'ambience-toggle',

        started: false,

        init() {

            console.log('[Aether UI] Ambience Toggle ready.');

        }

    };

    ToggleModule.init();

    window.Aether.Modules.register(ToggleModule);

})(window);