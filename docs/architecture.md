# Architecture

**Returns Undefined** - A multiplayer JavaScript trivia game built with SvelteKit 5 and TypeScript.

## Tech Stack

- **Framework**: SvelteKit 5
- **Language**: TypeScript
- **Styling**: LESS
- **Input**: Web Gamepad API

## State Management

- **Players**: Global state via Svelte context (`+layout.svelte`)
- **Scores**: Context + localStorage (`storage.svelte.ts`)
- **Ready Check**: Counter system for player completion tracking

## Key Components

- `Players.svelte` - Handles gamepad input and player rendering
- `Player.svelte` - Individual player with movement/selection
- `Score.svelte` - Score display

## Routes

- `/` - Player setup landing
- `/trivia` - Practice question
- `/trivia/[question]` - Dynamic quiz questions

## Data Flow

1. Gamepad connects → creates player in global state
2. Players navigate via gamepad directional inputs
3. Selections tracked per player
4. Scores persist to localStorage
5. Questions loaded server-side via `+page.server.ts`

## Key Files

- `src/lib/types.ts` - Core types
- `src/lib/gamepad.ts` - Gamepad input handling
- `src/lib/players.ts` - Player utilities
- `questions.sever.ts` - Mock questions (note: typo in filename)
