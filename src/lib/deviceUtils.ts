/**
 * Utility functions for managing device-specific information
 * including FCM tokens and device IDs
 */

/**
 * Generate a unique device ID
 * Creates a UUID v4 if one doesn't exist
 */
function generateDeviceId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get device ID from localStorage or generate a new one
 * The device ID is persisted across sessions
 */
export function getDeviceId(): string {
  if (typeof window === "undefined") {
    return ""; // Return empty string on server-side
  }

  const STORAGE_KEY = "device_id";
  let deviceId = localStorage.getItem(STORAGE_KEY);

  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem(STORAGE_KEY, deviceId);
  }

  return deviceId;
}

/**
 * Get FCM token from localStorage
 * Returns empty string if not available (can be updated later with actual Firebase implementation)
 */
export function getFcmToken(): string {
  if (typeof window === "undefined") {
    return ""; // Return empty string on server-side
  }

  const STORAGE_KEY = "fcm_token";
  return localStorage.getItem(STORAGE_KEY) || "";
}

/**
 * Set FCM token in localStorage
 * This should be called when Firebase Cloud Messaging token is received
 */
export function setFcmToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const STORAGE_KEY = "fcm_token";
  localStorage.setItem(STORAGE_KEY, token);
}

/**
 * Clear device information from localStorage
 * Useful for logout or reset scenarios
 */
export function clearDeviceInfo(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("device_id");
  localStorage.removeItem("fcm_token");
}
