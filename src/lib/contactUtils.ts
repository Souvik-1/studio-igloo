/**
 * Utility functions for contact form validation, email normalization, and SHA-256 hashing.
 */

export function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

export async function hashEmail(normalizedEmail: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(normalizedEmail);
  
  // Use Web Crypto API (supported in browsers, Cloudflare Workers, and Node.js 16+)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface ValidationLimits {
  nameMax: number;
  emailMax: number;
  phoneMax: number;
  serviceMax: number;
  dateMax: number;
  messageMax: number;
}

export const DEFAULT_LIMITS: ValidationLimits = {
  nameMax: 100,
  emailMax: 254,
  phoneMax: 40,
  serviceMax: 100,
  dateMax: 50,
  messageMax: 3000,
};

export function validateContactPayload(payload: {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  message?: string;
}, limits: ValidationLimits = DEFAULT_LIMITS): { valid: boolean; error?: string } {
  if (!payload.name || typeof payload.name !== 'string' || !payload.name.trim()) {
    return { valid: false, error: 'Name is required' };
  }
  if (payload.name.length > limits.nameMax) {
    return { valid: false, error: `Name exceeds maximum length of ${limits.nameMax}` };
  }

  if (!payload.email || typeof payload.email !== 'string' || !payload.email.trim()) {
    return { valid: false, error: 'Email is required' };
  }
  if (payload.email.length > limits.emailMax) {
    return { valid: false, error: `Email exceeds maximum length of ${limits.emailMax}` };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email.trim())) {
    return { valid: false, error: 'Invalid email address format' };
  }

  if (payload.phone && payload.phone.length > limits.phoneMax) {
    return { valid: false, error: `Phone number exceeds maximum length of ${limits.phoneMax}` };
  }

  if (payload.service && payload.service.length > limits.serviceMax) {
    return { valid: false, error: `Service exceeds maximum length of ${limits.serviceMax}` };
  }

  if (payload.date && payload.date.length > limits.dateMax) {
    return { valid: false, error: `Preferred date exceeds maximum length of ${limits.dateMax}` };
  }

  if (!payload.message || typeof payload.message !== 'string' || !payload.message.trim()) {
    return { valid: false, error: 'Message is required' };
  }
  if (payload.message.length > limits.messageMax) {
    return { valid: false, error: `Message exceeds maximum length of ${limits.messageMax}` };
  }

  return { valid: true };
}
