/**
 * Aether Audio Module
 *
 * Version: 0.1.0
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
            player.src = '/wp-content/plugins/alchemy-aether-engine/assets/audio/om-so-hum.mp3';
            player.preload = 'auto';
        },

        play() {
            this.started = true;
            console.log('[Aether Audio] play()');
        },

        pause() {
            this.started = false;
            console.log('[Aether Audio] pause()');
        },

        stop() {
            this.started = false;
            player.pause();
            player.currentTime = 0;

            console.log('[Aether Audio] stop()');
        },

        setVolume(volume) {
            player.volume = volume;
        },

        isPlaying() {
            return this.started;
        },

        info() {

            return {

                name: this.name,

                playing: this.started

            };

        }

    };

    AudioModule.load();

    window.Aether.Modules.register(AudioModule);

})(window);