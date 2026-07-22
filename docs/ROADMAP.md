# Alchemy Aether Engine Roadmap

> The immersive experience engine powering Alchemy Wares.

---

# Vision

Alchemy Aether Engine is a modular JavaScript runtime designed to add
atmosphere, audio, visual effects, themes and immersive experiences to
any website.

Although initially developed for Alchemy Wares, the long-term goal is
to become a standalone cross-platform engine that can power WordPress,
Hugo, React, Vue and static websites.

---

# Design Principles

- Modular
- Event-driven
- Lightweight
- Cross-platform
- Accessible
- Performance first
- Developer friendly

---

# Core Architecture

Browser

↓

Runtime

↓

Event Dispatcher

↓

Module Registry

↓

Modules

- Audio
- Atmospheres
- Themes
- Effects
- Scene Manager

---

# Current Version

## v0.17.0 — Experience Provider Architecture

### Completed

- Modular browser runtime
- Event Dispatcher
- Module Registry
- Services Registry
- Configuration API
- Experience Manager
- Automatic experience loading
- Audio and visual modules
- Persistent ambience controls
- WordPress admin application shell
- WordPress UI integration
- PHP Experience Provider
- Server-provided experience definitions

---

# Development Roadmap

## v0.18.0 — Experience Administration ✅

- Connected the Experiences admin view to the PHP provider
- Displayed all available experiences dynamically
- Displayed experience configuration, capabilities and default status
- Added a safe empty-library state
- Reserved editing and persistence for the next development milestones

## v0.19 — Experience Persistence

- Store custom experience definitions in WordPress
- Validate saved experience configuration
- Preserve built-in experience defaults
- Support enable and disable controls

## v0.20 — Atmosphere Packs

- Define the atmosphere pack format
- Separate reusable assets from experience configuration
- Support installable built-in and third-party packs
- Establish extension hooks for commercial packs

## v0.21 — Visual Systems

- Expand visual presets
- Add configurable particle systems
- Introduce scene transitions
- Improve visual lifecycle management

## v0.22 — Audio Systems

- Add volume controls
- Support multiple audio assets
- Add fade and transition behaviour
- Prepare audio configuration for atmosphere packs

## v1.0 — First Stable Public Release

- Stable platform APIs
- Complete administration workflow
- Experience and atmosphere pack support
- Developer documentation
- Example integrations
- Production-ready release process

---

# Long-term Vision

Future integrations

- WordPress
- Hugo
- Astro
- React
- Vue
- Static HTML

Commercial opportunities

- Community Edition
- Professional Edition
- Agency Edition
- SaaS Platform
- Marketplace