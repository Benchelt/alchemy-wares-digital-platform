/**
 * Aether Experience Engine
 * Browser Runtime
 *
 * Version: 0.2.0
 */

(function (window) {
	'use strict';

	// Prevent the runtime from loading more than once.
	if (window.Aether) {
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

	const Aether = {
		version: '0.2.0',

		config,

		start() {
			if (state.started) {
				console.log('[Aether] Runtime already running.');
				return;
			}

			state.started = true;
			state.paused = false;

			console.log('[Aether] Runtime started.');
		},

		stop() {
			if (!state.started) {
				return;
			}

			state.started = false;
			state.paused = false;

			console.log('[Aether] Runtime stopped.');
		},

		pause() {
			if (!state.started || state.paused) {
				return;
			}

			state.paused = true;

			console.log('[Aether] Runtime paused.');
		},

		resume() {
			if (!state.started || !state.paused) {
				return;
			}

			state.paused = false;

			console.log('[Aether] Runtime resumed.');
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
				modules: 0,
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
