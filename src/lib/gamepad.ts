/***
 * Controller Keys Map
 *
 * "buttons"
 *
 * 0 - A or B
 * 1 - A or B
 * 2 - X or Y
 * 3 - X or Y
 * 4 - L
 * 5 - R
 * 6 - LT
 * 7 - RT
 * 8 - Select or -
 * 9 - Start or +
 * 10 - L Click
 * 11 - R Click
 * 12 - D-pad up
 * 13 - D-pad down
 * 14 - D-pad left
 * 15 - D-pad right
 * 16 - Special Key
 *
 * axes
 *
 * 0 - LX (-1 left & 1 right)
 * 1 - LY (-1 up & 1 down)
 * 2 - RX (-1 left & 1 right)
 * 3 - RY (-1 up & 1 down)
 */

export const readControls = (gamepad: Gamepad) => {
	// Action buttons
	const pressedA = gamepad.buttons[0].value > 0;
	const pressedB = gamepad.buttons[1].value > 0;
	const pressedX = gamepad.buttons[2].value > 0;
	const pressedY = gamepad.buttons[3].value > 0;

	// Shoulder and trigger buttons
	const pressedL1 = gamepad.buttons[4].value > 0;
	const pressedR1 = gamepad.buttons[5].value > 0;
	const pressedL2 = gamepad.buttons[6].value > 0;
	const pressedR2 = gamepad.buttons[7].value > 0;

	// D-pad buttons
	const pressedDPadUp = gamepad.buttons[12].value > 0;
	const pressedDPadDown = gamepad.buttons[13].value > 0;
	const pressedDPadLeft = gamepad.buttons[14].value > 0;
	const pressedDPadRight = gamepad.buttons[15].value > 0;

	// Menu buttons
	const pressedSelect = gamepad.buttons[8].value > 0;
	const pressedStart = gamepad.buttons[9].value > 0;

	// Stick buttons
	const pressedLeftStick = gamepad.buttons[10].value > 0;
	const pressedRightStick = gamepad.buttons[11].value > 0;

	// Axes
	const leftStickX = Math.round(gamepad.axes[0] * 10000) / 10000;
	const leftStickY = Math.round(gamepad.axes[1] * 10000) / 10000;
	const rightStickX = Math.round(gamepad.axes[2] * 10000) / 10000;
	const rightStickY = Math.round(gamepad.axes[3] * 10000) / 10000;

	return {
		pressedA,
		pressedB,
		pressedX,
		pressedY,
		pressedL1,
		pressedR1,
		pressedL2,
		pressedR2,
		pressedDPadUp,
		pressedDPadDown,
		pressedDPadLeft,
		pressedDPadRight,
		pressedSelect,
		pressedStart,
		pressedLeftStick,
		pressedRightStick,
		leftStickX,
		leftStickY,
		rightStickX,
		rightStickY,
	};
};

export type Controls = ReturnType<typeof readControls>;

export const inQuizControls = (gamepad: Gamepad) => {
	const {
		leftStickY,
		pressedDPadDown,
		pressedDPadUp,
		leftStickX,
		pressedDPadLeft,
		rightStickX,
		rightStickY,
		pressedDPadRight,
		pressedA,
		pressedB,
		pressedX,
		pressedY,
	} = readControls(gamepad);

	const moveDown = leftStickY > 0.5 || rightStickY > 0.5 || pressedDPadDown;
	const moveUp = leftStickY < -0.5 || rightStickY < -0.5 || pressedDPadUp;
	const moveLeft = leftStickX < -0.5 || rightStickX < -0.5 || pressedDPadLeft;
	const moveRight = leftStickX > 0.5 || rightStickX > 0.5 || pressedDPadRight;
	const select = pressedA || pressedB || pressedX || pressedY;

	return {
		moveDown,
		moveUp,
		moveLeft,
		moveRight,
		select,
	};
};

export const mainControls = (gamepad: Gamepad) => {
	const {
		pressedA,
		pressedB,
		pressedX,
		pressedY,
		pressedL1,
		pressedR1,
		pressedL2,
		pressedR2,
		pressedDPadUp,
		pressedDPadDown,
		pressedDPadLeft,
		pressedDPadRight,
		pressedSelect,
		pressedStart,
		pressedLeftStick,
		pressedRightStick,
		leftStickX,
		leftStickY,
		rightStickX,
		rightStickY,
	} = readControls(gamepad);

	const pressing =
		pressedA ||
		pressedB ||
		pressedX ||
		pressedY ||
		pressedL1 ||
		pressedR1 ||
		pressedL2 ||
		pressedR2 ||
		pressedSelect ||
		pressedStart ||
		pressedLeftStick ||
		pressedRightStick;

	// Javascript is awesome :P
	const xAxisSum = leftStickX + rightStickX + Number(pressedDPadRight) - Number(pressedDPadLeft);
	const yAxisSum = leftStickY + rightStickY + Number(pressedDPadDown) - Number(pressedDPadUp);

	return {
		pressing,
		xAxisSum,
		yAxisSum,
	};
};
