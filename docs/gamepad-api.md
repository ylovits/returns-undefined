# Web Gamepad API

The **Gamepad API** provides access to game controllers connected to the browser.

## Core Concepts

### Accessing Gamepads

```javascript
const gamepads = navigator.getGamepads();
const gamepad = gamepads[0]; // First connected controller
```

### Gamepad Object Structure

- `gamepad.buttons[]` - Array of button states (0-16)
- `gamepad.axes[]` - Array of analog stick values (0-3)
- `gamepad.index` - Unique identifier for the controller

## Standard Mapping

### Buttons (0-16)

- **0-3**: Face buttons (A, B, X, Y)
- **4-5**: Shoulder buttons (L1, R1)
- **6-7**: Triggers (L2, R2)
- **8-9**: Select/Start (or -/+)
- **10-11**: Stick clicks (L3, R3)
- **12-15**: D-pad (Up, Down, Left, Right)
- **16**: Special/Home button

### Axes (0-3)

- **0**: Left stick X-axis (-1 left, +1 right)
- **1**: Left stick Y-axis (-1 up, +1 down)
- **2**: Right stick X-axis (-1 left, +1 right)
- **3**: Right stick Y-axis (-1 up, +1 down)

## Reading Input

Buttons have a `value` property (0 to 1 for analog, 0 or 1 for digital):

```javascript
const pressed = gamepad.buttons[0].value > 0;
```

Axes return floating-point values from -1 to 1:

```javascript
const stickX = gamepad.axes[0];
```

## Polling Pattern

The Gamepad API requires **polling** - check input state on each frame:

```javascript
function gameLoop() {
  const gamepads = navigator.getGamepads();
  // Read and process gamepad state
  requestAnimationFrame(gameLoop);
}
```

## Project Implementation

This project uses `src/lib/gamepad.ts` to:
- Abstract button/axes reading with `readControls()`
- Provide context-specific helpers (`inQuizControls`, `mainControls`)
- Apply deadzone thresholds (0.5 for stick movement)
