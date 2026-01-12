/**
 * Mobile detection utilities for Returns Undefined game
 */

/**
 * Detect if the current device is mobile
 * Uses multiple detection methods for reliability
 */
export function isMobileDevice(): boolean {
	if (typeof window === "undefined") return false;

	// Check for touch support
	const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

	// Check user agent for mobile patterns
	const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	const isMobileUA = mobileRegex.test(navigator.userAgent);

	// Check screen size (mobile-like dimensions)
	const isSmallScreen = window.innerWidth <= 768 && window.innerHeight <= 1024;

	// Device is mobile if it has touch AND (mobile UA OR small screen)
	return hasTouch && (isMobileUA || isSmallScreen);
}

/**
 * Get device-appropriate text for actions
 */
export function getActionText(action: "click" | "select"): string {
	const mobile = isMobileDevice();

	switch (action) {
		case "click":
			return mobile ? "tap" : "click";
		case "select":
			return mobile ? "touch" : "click";
		default:
			return action;
	}
}

/**
 * Get device-appropriate input method text
 */
export function getInputMethodText(): string {
	return isMobileDevice() ? "touch" : "mouse";
}

/**
 * Get device-appropriate button text for adding players
 */
export function getAddPlayerText(): string {
	return isMobileDevice() ? "Tap to add player" : "Play with mouse (single player)";
}
