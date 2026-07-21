/**
 * Aether Visual Module
 *
 * Manages the shared rendering surface for Aether visual effects.
 *
 * Version: 0.12.0
 */

(function (window, document) {
    'use strict';

    if (
        !window.Aether ||
        !window.Aether.Modules ||
        !window.Aether.Events
    ) {
        console.error(
            '[Aether Visual] Runtime dependencies were not found.'
        );

        return;
    }

    const VisualModule = {
        name: 'visual',

        started: false,

        enabled: false,

        paused: false,

        canvas: null,

        context: null,

        subscriptions: [],

        resizeHandler: null,

        configuration: {},

        init() {
            this.resizeHandler = () => {
                this.resize();
            };

            this.subscriptions.push(
                window.Aether.Events.on(
                    'experience:loaded',
                    (experience) => {
                        if (
                            !experience ||
                            !experience.configuration
                        ) {
                            return;
                        }

                        this.applyExperience(
                            experience.configuration
                        );
                    }
                )
            );

            this.subscriptions.push(
                window.Aether.Events.on(
                    'experience:unloaded',
                    () => {
                        this.disable();
                    }
                )
            );

            this.subscriptions.push(
                window.Aether.Events.on(
                    'runtime:pause',
                    () => {
                        this.pause();
                    }
                )
            );

            this.subscriptions.push(
                window.Aether.Events.on(
                    'runtime:resume',
                    () => {
                        this.resume();
                    }
                )
            );

            console.log('[Aether Visual] Initialised.');
        },

        applyExperience(configuration) {
            const visualConfiguration =
                configuration &&
                typeof configuration.visual === 'object'
                    ? configuration.visual
                    : null;

            if (!visualConfiguration) {
                this.disable();

                console.log(
                    '[Aether Visual] Experience has no visual configuration.'
                );

                return;
            }

            this.configuration = {
                ...visualConfiguration
            };

            if (visualConfiguration.enabled === false) {
                this.disable();
                return;
            }

            this.enable();

            window.Aether.Events.emit(
                'visual:configured',
                this.info()
            );

            console.log(
                '[Aether Visual] Experience configuration applied.',
                this.configuration
            );
        },

        createCanvas() {
            if (this.canvas) {
                return this.canvas;
            }

            const canvas = document.createElement('canvas');

            canvas.id = 'aether-visual-layer';
            canvas.className = 'aether-visual-layer';
            canvas.setAttribute('aria-hidden', 'true');

            document.body.appendChild(canvas);

            this.canvas = canvas;
            this.context = canvas.getContext('2d');

            this.resize();

            window.addEventListener(
                'resize',
                this.resizeHandler,
                { passive: true }
            );

            window.Aether.Events.emit(
                'visual:created',
                this.info()
            );

            console.log('[Aether Visual] Rendering surface created.');

            return canvas;
        },

        destroyCanvas() {
            window.removeEventListener(
                'resize',
                this.resizeHandler
            );

            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }

            this.canvas = null;
            this.context = null;

            window.Aether.Events.emit(
                'visual:destroyed',
                this.info()
            );

            console.log('[Aether Visual] Rendering surface destroyed.');
        },

        resize() {
            if (!this.canvas) {
                return;
            }

            const pixelRatio = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            const width = window.innerWidth;
            const height = window.innerHeight;

            this.canvas.width = Math.round(width * pixelRatio);
            this.canvas.height = Math.round(height * pixelRatio);

            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;

            if (this.context) {
                this.context.setTransform(
                    pixelRatio,
                    0,
                    0,
                    pixelRatio,
                    0,
                    0
                );
            }

            window.Aether.Events.emit(
                'visual:resized',
                {
                    width,
                    height,
                    pixelRatio
                }
            );
        },

        enable() {
            if (!this.canvas) {
                this.createCanvas();
            }

            this.enabled = true;
            this.started = true;
            this.paused = false;

            if (this.canvas) {
                this.canvas.hidden = false;
            }

            window.Aether.Events.emit(
                'visual:enabled',
                this.info()
            );
        },

        disable() {
            this.enabled = false;
            this.started = false;
            this.paused = false;
            this.configuration = {};

            this.destroyCanvas();

            window.Aether.Events.emit(
                'visual:disabled',
                this.info()
            );
        },

        pause() {
            if (!this.enabled || this.paused) {
                return;
            }

            this.paused = true;

            window.Aether.Events.emit(
                'visual:paused',
                this.info()
            );

            console.log('[Aether Visual] Paused.');
        },

        resume() {
            if (!this.enabled || !this.paused) {
                return;
            }

            this.paused = false;

            window.Aether.Events.emit(
                'visual:resumed',
                this.info()
            );

            console.log('[Aether Visual] Resumed.');
        },

        start() {
            this.started = true;
        },

        stop() {
            this.disable();
        },

        isRunning() {
            return (
                this.started &&
                this.enabled &&
                !this.paused
            );
        },

        info() {
            return {
                enabled: this.enabled,
                running: this.isRunning(),
                paused: this.paused,
                canvas: Boolean(this.canvas),
                width: this.canvas
                    ? this.canvas.clientWidth
                    : 0,
                height: this.canvas
                    ? this.canvas.clientHeight
                    : 0,
                configuration: {
                    ...this.configuration
                }
            };
        }
    };

    window.Aether.Modules.register(VisualModule);

})(window, document);
