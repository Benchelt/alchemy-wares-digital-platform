# Aether Experience Engine — Architecture

## Purpose

This document defines the technical architecture of the Aether Experience Engine.

Aether is designed as a browser-based experience engine with small platform adapters.

The core experience logic belongs in JavaScript because it runs in the visitor's browser and must work across WordPress, Hugo, static HTML, React, Astro and other web platforms.

Platform-specific code is responsible only for integration.

## High-Level Architecture

```text
Platform
   │
   ▼
Platform Adapter
   │
   ▼
Aether JavaScript Runtime
   │
   ▼
Scene Manager
   │
   ▼
Atmosphere Controller
   │
   ▼
Independent Systems