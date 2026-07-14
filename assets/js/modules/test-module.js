/**
 * Aether Test Module
 *
 * Proves that independent modules can register with the Aether runtime.
 */

(function (window) {
        'use strict';

        if (!window.Aether || !window.Aether.Modules) {
                console.error(
                        '[Aether] Test Module could not find the runtime.'
                );
                return;
        }

        const TestModule = {
                name: 'test',

                started: false,

                start() {
                        if (this.started) {
                                console.log(
                                        '[Aether] Test Module is already running.'
                                );
                                return;
                        }

                        this.started = true;

                        console.log('[Aether] Test Module started.');
                },

                stop() {
                        if (!this.started) {
                                return;
                        }

                        this.started = false;

                        console.log('[Aether] Test Module stopped.');
                },

                isRunning() {
                        return this.started;
                },
        };

        window.Aether.Modules.register(TestModule);
})(window);
