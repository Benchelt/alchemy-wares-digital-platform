/**
 * Aether Experience Engine
 * Browser Runtime
 *
 * Version: 0.7.0
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
        const initializedModules = new WeakSet();
        const services = new Map();

        const Services = {
                register(name, service) {
                        if (
                                typeof name !== 'string' ||
                                name.trim() === ''
                        ) {
                                throw new TypeError(
                                        '[Aether] A service must have a valid name.'
                                );
                        }

                        if (!service) {
                                throw new TypeError(
                                        '[Aether] A service must have a value.'
                                );
                        }

                        const serviceName = name.trim();

                        if (services.has(serviceName)) {
                                throw new Error(
                                        `[Aether] Service "${serviceName}" is already registered.`
                                );
                        }

                        services.set(serviceName, service);

                        console.log(
                                `[Aether] Service "${serviceName}" registered.`
                        );

                        window.AetherEvents.emit('service:registered', {
                                name: serviceName,
                                service,
                        });

                        return service;
                },

                get(name) {
                        return services.get(name) || null;
                },

                has(name) {
                        return services.has(name);
                },

                list() {
                        return Array.from(services.keys());
                },

                count() {
                        return services.size;
                },
        };

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

                        try {
                                if (
                                        typeof module.init === 'function' &&
                                        !initializedModules.has(module)
                                ) {
                                        module.init();
                                        initializedModules.add(module);
                                }
                        } catch (error) {
                                modules.delete(name);

                                console.error(
                                        `[Aether] Module "${name}" failed to initialise.`,
                                        error
                                );

                                throw error;
                        }

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
                version: '0.7.0',

                config,

                Events: window.AetherEvents,

                Modules,

                Services,

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
                                services: this.Services.count(),
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
