/**
 * Aether Ambience Toggle
 *
 * Version: 0.3.0
 */

(function (window, document) {
    'use strict';

    if (!window.Aether) {
        return;
    }

    const ToggleModule = {

        name: 'ambience-toggle',

        started: false,

        element: null,

        enabled: false,

        init() {
            this.render();
            this.restorePreference();
            this.bindEvents();
            this.started = true;

            console.log('[Aether UI] Ambience Toggle ready.');
        },

        render() {
            const existingControl = document.querySelector(
                '.aether-ambience-control'
            );

            if (existingControl) {
                this.element = existingControl;
                return;
            }

            const control = document.createElement('button');

            control.type = 'button';
            control.className = 'aether-ambience-control';
            control.setAttribute('aria-pressed', 'false');
            control.setAttribute('aria-label', 'Ambient sound: Off');

            control.innerHTML = `
                <span class="aether-ambience-label">Ambience</span>
                <span class="aether-ambience-switch" aria-hidden="true">
                    <span class="aether-ambience-knob"></span>
                </span>
                <span class="aether-ambience-status">Off</span>
            `;

            document.body.appendChild(control);

            this.element = control;
        },

        bindEvents() {
            if (!this.element) {
                return;
            }

            this.element.addEventListener('click', () => {
                this.toggle();
            });

            if (this.enabled) {
                const resumeAudio = () => {
                    const audio = window.Aether.Modules.get('audio');

                    if (
                        this.enabled &&
                        audio &&
                        !audio.isPlaying()
                    ) {
                        audio.play();
                    }

                    document.removeEventListener('click', resumeAudio);
                    document.removeEventListener('keydown', resumeAudio);
                    document.removeEventListener('touchstart', resumeAudio);
                };

                document.addEventListener('click', resumeAudio);
                document.addEventListener('keydown', resumeAudio);
                document.addEventListener('touchstart', resumeAudio);
            }
        },

        restorePreference() {
            const savedPreference = window.localStorage.getItem(
                'aether.ambience'
            );

            this.setEnabled(savedPreference === 'on', false);
        },

        toggle() {
            const audio = window.Aether.Modules.get('audio');

            if (!audio) {
                console.error('[Aether UI] Audio module unavailable.');
                return;
            }

            if (this.enabled) {
                audio.pause();
                this.setEnabled(false);
                return;
            }

            audio.play();
            this.setEnabled(true);
        },

        setEnabled(enabled, savePreference = true) {
            if (!this.element) {
                return;
            }

            this.enabled = Boolean(enabled);

            if (savePreference) {
                window.localStorage.setItem(
                    'aether.ambience',
                    this.enabled ? 'on' : 'off'
                );
            }

            const status = this.element.querySelector(
                '.aether-ambience-status'
            );

            this.element.classList.toggle('is-active', this.enabled);
            this.element.setAttribute(
                'aria-pressed',
                String(this.enabled)
            );
            this.element.setAttribute(
                'aria-label',
                this.enabled
                    ? 'Ambient sound: Playing'
                    : 'Ambient sound: Off'
            );

            if (status) {
                status.textContent = this.enabled ? 'On' : 'Off';
            }
        },

        isEnabled() {
            return this.enabled;
        }

    };

    ToggleModule.init();

    window.Aether.Modules.register(ToggleModule);

})(window, document);
