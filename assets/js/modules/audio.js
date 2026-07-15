/**
 * Aether Audio Module
 *
 * Version: 0.3.0
 */

(function (window) {
    'use strict';

    if (!window.Aether) {
        return;
    }

    const player = new Audio();

    let fadeTimer = null;

    const AudioModule = {

        name: 'audio',

        started: false,

        targetVolume: 0.4,

        fadeDuration: 2000,

        init() {
            player.src = '/wp-content/plugins/alchemy-aether-engine/assets/audio/om-so-hum108.mp3';
            player.preload = 'auto';
            player.loop = true;
            player.volume = 0;

            console.log('[Aether Audio] Initialised.');
        },

        clearFade() {
            if (fadeTimer !== null) {
                window.clearInterval(fadeTimer);
                fadeTimer = null;
            }
        },

        fadeTo(targetVolume, duration, onComplete) {
            this.clearFade();

            const safeTarget = Math.min(1, Math.max(0, Number(targetVolume)));
            const safeDuration = Math.max(0, Number(duration));
            const startVolume = player.volume;

            if (safeDuration === 0 || startVolume === safeTarget) {
                player.volume = safeTarget;

                if (typeof onComplete === 'function') {
                    onComplete();
                }

                return;
            }

            const interval = 50;
            const steps = Math.max(1, Math.ceil(safeDuration / interval));
            const volumeChange = (safeTarget - startVolume) / steps;

            let currentStep = 0;

            fadeTimer = window.setInterval(() => {
                currentStep += 1;

                const nextVolume = startVolume + (volumeChange * currentStep);
                player.volume = Math.min(1, Math.max(0, nextVolume));

                if (currentStep >= steps) {
                    this.clearFade();
                    player.volume = safeTarget;

                    if (typeof onComplete === 'function') {
                        onComplete();
                    }
                }
            }, interval);
        },

        play() {
            this.clearFade();

            player.volume = 0;

            return player.play()
                .then(() => {
                    this.started = true;

                    this.fadeTo(this.targetVolume, this.fadeDuration, () => {
                        console.log('[Aether Audio] Fade-in complete.');
                    });

                    console.log('[Aether Audio] Playing.');
                })
                .catch((error) => {
                    this.started = false;
                    console.error('[Aether Audio] Playback failed:', error);
                });
        },

        pause() {
            if (player.paused) {
                this.started = false;
                return;
            }

            this.fadeTo(0, this.fadeDuration, () => {
                player.pause();
                this.started = false;

                console.log('[Aether Audio] Paused.');
            });

            console.log('[Aether Audio] Fading out.');
        },

        stop() {
            this.clearFade();

            player.pause();
            player.currentTime = 0;
            player.volume = 0;
            this.started = false;

            console.log('[Aether Audio] Stopped.');
        },

        setVolume(volume) {
            const safeVolume = Math.min(1, Math.max(0, Number(volume)));

            this.targetVolume = safeVolume;

            if (this.started && !player.paused) {
                player.volume = safeVolume;
            }
        },

        isPlaying() {
            return this.started && !player.paused;
        },

        info() {
            return {
                name: this.name,
                playing: this.isPlaying(),
                volume: player.volume,
                targetVolume: this.targetVolume,
                fadeDuration: this.fadeDuration,
                source: player.src
            };
        }

    };

    window.Aether.Modules.register(AudioModule);

})(window);
