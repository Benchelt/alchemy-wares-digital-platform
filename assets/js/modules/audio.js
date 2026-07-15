/**
 * Aether Audio Module
 *
 * Version: 0.2.0
 */

(function (window) {
    'use strict';

    if (!window.Aether) {
        return;
    }

    const player = new Audio();

    const AudioModule = {

        name: 'audio',

        started: false,

        load() {
            player.src = '/wp-content/plugins/alchemy-aether-engine/assets/audio/om-so-hum108.mp3';
            player.preload = 'auto';
            player.loop = true;
        },

        play() {
            player.play()
                .then(() => {
                    this.started = true;
                    console.log('[Aether Audio] Playing.');
                })
                .catch((error) => {
                    this.started = false;
                    console.error('[Aether Audio] Playback failed:', error);
                });
        },

        pause() {
            player.pause();
            this.started = false;

            console.log('[Aether Audio] Paused.');
        },

        stop() {
            player.pause();
            player.currentTime = 0;
            this.started = false;

            console.log('[Aether Audio] Stopped.');
        },

        setVolume(volume) {
            const safeVolume = Math.min(1, Math.max(0, Number(volume)));

            player.volume = safeVolume;
        },

        isPlaying() {
            return this.started;
        },

        info() {
            return {
                name: this.name,
                playing: this.started,
                volume: player.volume,
                source: player.src
            };
        }

    };

    AudioModule.load();

    window.Aether.Modules.register(AudioModule);

})(window);
