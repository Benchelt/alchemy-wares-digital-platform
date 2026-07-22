# Changelog

All notable changes to the Alchemy Aether Engine will be documented here.

---

## v0.17.0

### Added

- PHP Experience Provider service
- Filterable experience definitions through `aw_aether_experiences`
- Engine accessor for experience definitions
- Server-provided experience configuration for the browser runtime

### Changed

- Moved the built-in Temple experience definition from JavaScript to PHP
- Updated the JavaScript registrar to consume provider-supplied definitions
- Decoupled experience ownership from the browser runtime

### Verified

- WordPress provider returns the Temple experience
- Browser runtime registers and loads Temple successfully
- Audio and visual modules receive the supplied experience configuration

---

## v0.5.0 (In Development)

### Added

- Runtime lifecycle events
- Runtime start event
- Runtime stop event
- Runtime pause event
- Runtime resume event
- Runtime diagnostics

---

## v0.4.0

### Added

- Browser Event Dispatcher
- Core event API
- Multi-file JavaScript loading
- Test module integration

---

## v0.3.0

### Added

- Browser Module Registry

---

## v0.2.0

### Added

- Browser Runtime

---

## v0.1.0

### Added

- Initial project bootstrap
- Repository structure