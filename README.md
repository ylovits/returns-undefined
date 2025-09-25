# Returns Undefined

A multiplayer JavaScript trivia game built with SvelteKit 5 and TypeScript. Test your knowledge of JavaScript's quirky behavior with gamepad controllers!

## 🎮 Game Features

- **Multiplayer Support**: Up to 4 players using gamepad controllers
- **JavaScript Trivia**: Challenging questions about JavaScript's unusual behaviors
- **Syntax Highlighting**: Code snippets are highlighted with Prism.js for better readability
- **Real-time Scoring**: Track scores across multiple rounds
- **Retro Aesthetic**: Pixelated styling with custom filters and animations

## 🛠️ Development Setup

### Prerequisites

This project uses [Volta](https://volta.sh/) to manage Node.js and package manager versions. Install Volta first:

```bash
# Install Volta (visit https://volta.sh/ for platform-specific instructions)
curl https://get.volta.sh | bash

# On Windows, use the installer from https://volta.sh/
```

### Getting Started

Once Volta is installed, simply run:

```bash
# Clone and enter the project directory
cd returns-undefined

# Volta will automatically use the correct Node.js and pnpm versions
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

**Note**: Volta will automatically:
- Install and use Node.js v22.13.1
- Install and use pnpm v10.17.1
- Ensure all team members use the same versions

### Available Scripts

- **`pnpm run dev`** - Start development server
- **`pnpm run build`** - Build for production
- **`pnpm run preview`** - Preview production build
- **`pnpm run check`** - Run TypeScript type checking
- **`pnpm run check:watch`** - Watch mode type checking
- **`pnpm run lint`** - Run linting and formatting checks
- **`pnpm run format`** - Format code with Prettier

## 🎯 How to Play

1. Connect up to 4 gamepad controllers
2. Players appear automatically when controllers are detected
3. Navigate answer options using the gamepad directional controls
4. Select answers and wait for all players to respond
5. See results with correct answers highlighted
6. Continue through questions to build your score!

## 📁 Project Structure

```
src/
├── lib/                    # Shared components and utilities
│   ├── Players.svelte     # Player rendering and gamepad input
│   ├── Player.svelte      # Individual player component
│   ├── Score.svelte       # Score display
│   ├── gamepad.ts         # Gamepad API utilities
│   ├── players.ts         # Player state management
│   ├── storage.svelte.ts  # localStorage wrapper
│   ├── syntax-highlighting.ts # Prism.js integration
│   └── types.ts           # TypeScript definitions
├── routes/                # SvelteKit routes
│   ├── +layout.svelte     # Global layout and state
│   ├── +page.svelte       # Landing page
│   └── trivia/            # Trivia game routes
│       ├── +page.svelte           # Practice question
│       ├── [question]/+page.svelte # Dynamic question routes
│       └── questions.sever.ts     # Question data
└── styles/                # Global styles and themes
```

## 🎨 Technology Stack

- **Frontend**: SvelteKit 5 with TypeScript
- **Styling**: Less with custom CSS filters and animations
- **Input**: Web Gamepad API for controller support
- **Syntax Highlighting**: Prism.js for JavaScript code snippets
- **Build Tool**: Vite
- **Package Manager**: pnpm (managed by Volta)

## 🚀 Deployment

```bash
# Build for production
pnpm run build

# The built files will be in the `build` directory
# Deploy using your preferred static hosting service
```

## 🤝 Contributing

1. Ensure you have Volta installed
2. Clone the repository
3. Run `pnpm install` (Volta handles the rest)
4. Make your changes
5. Run `pnpm run lint` and `pnpm run check` before committing

## 📝 Adding Questions

Questions are stored in `src/routes/trivia/questions.sever.ts`. Each question should have:

- Descriptive text with code snippets in `<pre class='code'>` tags
- Exactly 4 answer options
- A randomized `correctAnswerIndex`
- Proper TypeScript typing

The syntax highlighting system will automatically highlight JavaScript code in `<pre class='code'>` blocks.