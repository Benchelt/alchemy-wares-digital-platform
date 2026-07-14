# Aether Experience Engine — Vision

## Product Vision

Aether is a browser-based experience engine for creating immersive, atmospheric website experiences.

It allows websites and applications to express how a page, feature or interaction should feel without directly controlling individual audio, visual or animation systems.

Rather than instructing a website to play a particular sound, display a specific particle effect or apply a particular colour scheme, an application requests a named atmosphere.

Aether interprets that atmosphere and coordinates the appropriate systems.

## Core Question

Every feature in Aether should help answer one question:

> How should this experience feel?

Audio, colour, movement, lighting, transitions and visual effects are consequences of that decision.

They are not the starting point.

## The Problem

Atmospheric website features are often implemented as isolated scripts.

For example:

* One script controls background audio.
* Another controls particles.
* Another changes colours.
* Another stores user preferences.
* Individual pages contain custom code for each effect.

This approach creates duplicated code, inconsistent behaviour and tightly coupled systems that become increasingly difficult to maintain.

It also makes the experience difficult to reuse across different platforms.

## The Aether Approach

Aether separates experience definitions from experience systems.

An atmosphere is a configuration describing the intended character of an experience.

For example:

```text
Atmosphere: Forest Sanctuary

Audio:
  Forest ambience
  Distant birds

Theme:
  Warm natural lighting
  Moss accent

Effects:
  Slow drifting leaves

Motion:
  Organic
  Gentle

Intensity:
  30%
```

The atmosphere contains data rather than implementation logic.

Aether reads that data and passes the appropriate configuration to its independent systems.

## Scenes

A scene represents a meaningful application context.

Examples include:

* Meditation
* Dream Oracle
* Crystal Encyclopedia
* Lunar Calendar
* Product discovery
* Ritual guidance

A scene does not directly play audio or start effects.

It requests an atmosphere from Aether.

For example:

```javascript
Aether.enter('meditation');
```

Aether then resolves the scene’s atmosphere and coordinates the systems required to create it.

## Platform Independence

The core Aether runtime will be written in JavaScript because the experience executes inside the visitor’s browser.

This allows the same engine to support:

* WordPress
* Hugo
* Static HTML
* React
* Astro
* Other browser-based platforms

Platform-specific code remains outside the engine.

WordPress PHP code acts as an adapter responsible for:

* Registering the plugin
* Loading engine assets
* Reading and saving WordPress settings
* Passing configuration to the browser runtime
* Integrating with WordPress hooks and permissions

The WordPress adapter must not contain the core experience logic.

## Independent Systems

Aether will be composed of independent systems with clearly defined responsibilities.

Initial systems include:

* Audio System
* Theme System
* Effects System
* Motion System
* Storage System
* Event System
* Performance System
* Accessibility System

Each system performs one responsibility.

Systems must not depend directly on one another.

The engine coordinates communication between them.

## Architectural Principle

Every optional system must be removable without preventing the rest of Aether from operating.

Examples:

* Removing audio must not break themes.
* Removing particles must not break scene loading.
* Disabling animation must not break atmosphere selection.
* Disabling local storage must not prevent the current experience from running.

This principle keeps the engine modular, testable and extensible.

## User Control

Atmospheric features must enhance a website without taking control away from the visitor.

Aether will therefore be designed around:

* Explicit user consent for audio
* Clear pause and mute controls
* Remembered preferences where permitted
* Reduced-motion support
* Sensible performance limits
* Graceful fallback when features are unavailable
* No essential information conveyed only through effects

Accessibility and user choice are core requirements, not later additions.

## Atmosphere Packs

Atmospheres should eventually be distributable independently from the engine.

An atmosphere pack may contain:

* Atmosphere definitions
* Audio references
* Theme tokens
* Effect configurations
* Optional visual assets
* Metadata and compatibility information

Potential collections include:

* Forest Collection
* Temple Collection
* Ocean Collection
* Luxury Collection
* Seasonal Collection
* Alchemy Collection

Installing a new atmosphere pack must not require changing the core engine.

## Initial Use Cases

The first implementation will power experiences across Alchemy Wares, including:

* Ambient site audio
* Meditation experiences
* Dream Oracle scenes
* Lunar Calendar atmospheres
* Crystal and ritual content
* Context-aware visual effects

The architecture should also allow Aether to support Elsa Botanicals and other websites without depending on Alchemy Wares branding or WordPress.

## Product Principles

Aether development will follow these principles:

1. Experience is described through configuration.
2. The browser runtime contains the core experience logic.
3. Platform adapters remain small.
4. Systems have one clear responsibility.
5. Systems communicate through the engine rather than directly.
6. Features degrade gracefully.
7. User consent and accessibility are fundamental.
8. Atmospheres can be added without modifying the engine.
9. Public interfaces are documented and predictable.
10. Simplicity is preferred over unnecessary abstraction.

## Long-Term Direction

Aether should develop from a WordPress-powered implementation into a reusable browser experience engine.

Its long-term architecture should support:

* Multiple platform adapters
* Third-party atmosphere packs
* Public scene and atmosphere APIs
* Extensible experience systems
* Developer documentation
* Automated testing
* Versioned releases
* Independent distribution of the JavaScript runtime

Aether begins as part of Alchemy Wares, but it should be designed as a product capable of standing on its own.
