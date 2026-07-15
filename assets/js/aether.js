/**
 * Aether Experience Engine
 * Browser Runtime
 *
 * Version: 0.2.0
 */

(function (window) {
        'use strict';

        if (window.Aether) {
                return;
        }

        if (!window.AetherEvents) {
                console.error(
                        '[Aether] Event Dispatcher is unavailable.'
                );
                return;
        }

        const state = {
                started: false,
                paused: false,
        };

        const config = {
                platform: 'WordPress',
                debug: false,
        };

        const modules = new Map();

        const Modules = {
                register(module) {
                        if (!module || typeof module !== 'object') {
                                throw new TypeError(
                                        '[Aether] A module must be an object.'
                                );
                        }

                        if (
                                typeof module.name !== 'string' ||
                                module.name.trim() === ''
                        ) {
                                throw new TypeError(
                                        '[Aether] A module must have a valid name.'
                                );
                        }

                        const name = module.name.trim();

                        if (modules.has(name)) {
                                throw new Error(
                                        `[Aether] Module "${name}" is already registered.`
                                );
                        }

                        modules.set(name, module);

                        console.log(
                                `[Aether] Module "${name}" registered.`
                        );

                        window.AetherEvents.emit('module:registered', {
                                name,
                                module,
                        });

                        return module;
                },

                get(name) {
                        return modules.get(name) || null;
                },

                has(name) {
                        return modules.has(name);
                },

                list() {
                        return Array.from(modules.keys());
                },

                count() {
                        return modules.size;
                },
        };

        const Aether = {
                version: '0.2.0',

                config,

                Events: window.AetherEvents,

                Modules,

                start() {
                        if (state.started) {
                                console.log('[Aether] Runtime already running.');
                                return;
                        }

                        state.started = true;
                        state.paused = false;

                        console.log('[Aether] Runtime started.');

                        this.Events.emit(
                                'runtime:start',
                                this.getState()
                        );
                },

                stop() {
                        if (!state.started) {
                                return;
                        }

                        state.started = false;
                        state.paused = false;

                        console.log('[Aether] Runtime stopped.');

                        this.Events.emit(
                                'runtime:stop',
                                this.getState()
                        );
                },

                pause() {
                        if (!state.started || state.paused) {
                                return;
                        }

                        state.paused = true;

                        console.log('[Aether] Runtime paused.');

                        this.Events.emit(
                                'runtime:pause',
                                this.getState()
                        );
                },

                resume() {
                        if (!state.started || !state.paused) {
                                return;
                        }

                        state.paused = false;

                        console.log('[Aether] Runtime resumed.');

                        this.Events.emit(
                                'runtime:resume',
                                this.getState()
                        );
                },

                isRunning() {
                        return state.started;
                },

                isPaused() {
                        return state.paused;
                },

                getState() {
                        return {
                                started: state.started,
                                paused: state.paused,
                        };
                },

                info() {
                        const runtimeState = state.started
                                ? state.paused
                                        ? 'Paused'
                                        : 'Running'
                                : 'Stopped';

                        const information = {
                                name: 'Aether Experience Engine',
                                version: this.version,
                                platform: this.config.platform,
                                runtime: runtimeState,
                                modules: this.Modules.count(),
                                eventListeners: this.Events.count(),
                                scenes: 0,
                                atmospheres: 0,
                        };

                        console.table(information);

                        return information;
                },
        };

        window.Aether = Aether;

        Aether.start();
})(window);
