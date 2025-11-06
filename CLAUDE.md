# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Returns Undefined" - a multiplayer JavaScript trivia game built with SvelteKit 5 and TypeScript. The game uses gamepad controllers for player input and features a question-answer quiz format.

## Development Commands

- **Start development server**: `pnpm run dev` or `npm run dev`
- **Build for production**: `pnpm run build` or `npm run build`
- **Preview production build**: `pnpm run preview` or `npm run preview`
- **Type checking**: `pnpm run check` or `npm run check`
- **Watch type checking**: `pnpm run check:watch` or `npm run check:watch`
- **Linting and formatting**: `pnpm run lint` or `npm run lint`
- **Format code**: `pnpm run format` or `npm run format`

## Architecture

### Core State Management

- **Players**: Global state managed in `+layout.svelte` using Svelte context
- **Scores**: Tracked using both context and localStorage via `storage.svelte.ts`
- **Ready Check**: Counter system for tracking player completion states

### Key Components

- **Players.svelte**: Handles player rendering and gamepad input processing
- **Player.svelte**: Individual player representation with movement and selection
- **Score.svelte**: Score display component

### Routing Structure

- `/` - Landing page for player setup
- `/trivia` - Practice question before main game
- `/trivia/[question]` - Individual quiz questions (dynamic routes)

### Gamepad Integration

- Uses Web Gamepad API for controller input
- Player states tracked by gamepad index (0-3)
- Movement and selection handled via gamepad polling in animation frames

### Data Flow

1. Gamepad connection creates player objects in global state
2. Players navigate UI using gamepad directional inputs
3. Selections tracked per player via `currentSelection` property
4. Ready/completion state managed through context counters
5. Scores persisted to localStorage between sessions

### Styling

- Uses LESS for styling with shared variables in `_vars.less`
- Global styles in `app.less` and `_common.less`
- Component-specific styles co-located with components

### Server-Side Logic

- Questions loaded via `+page.server.ts` files
- Mock questions stored in `questions.sever.ts` (note: filename has typo)
- Player initialization handled in `/init/+server.ts`

## Key Files

- `src/lib/types.ts` - Core type definitions (Player, PlayersState, Question, etc.)
- `src/lib/players.ts` - Player utilities and shape configurations
- `src/lib/gamepad.ts` - Gamepad input handling utilities
- `src/lib/storage.svelte.ts` - localStorage wrapper with Svelte reactivity
