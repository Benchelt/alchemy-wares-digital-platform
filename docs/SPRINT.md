# Sprint 19

**Status:** Active  
**Target Release:** v0.19.0

## Goal

Implement safe persistence for experience configuration while keeping the Experience Provider as the source of default definitions.

## Tasks

- [x] Add `experience_overrides` to `AW_Aether_Settings`
- [x] Safely retrieve stored overrides
- [ ] Merge provider defaults with stored overrides
- [ ] Validate override values
- [ ] Confirm runtime receives resolved configuration
- [ ] Test and release v0.19.0