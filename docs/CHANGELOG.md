# Changelog

All notable changes to the Alchemy Aether Engine will be documented here.

---

## v0.18.0

### Added

- Dynamic Experience Library in the Aether administration interface
- Automatic experience cards generated from PHP provider definitions
- Empty-library state for installations without registered experiences
- Default experience identification and status badge

### Changed

- Replaced the hard-coded Temple experience card with provider-driven rendering
- Experience capabilities now reflect the supplied audio, visual and particle configuration
- Experience metadata now displays configured volume, particle count and visual preset

### Verified

- PHP syntax check passes for the administration controller
- Temple is loaded from the PHP Experience Provider
- The configured default experience is identified correctly
- Audio, visual and particle details render correctly in the Experience Library
- Dashboard, Experiences, Modules and Settings administration views remain operational

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