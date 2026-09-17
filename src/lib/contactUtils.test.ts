import { describe, it, expect } from 'vitest';
import { normalizeEmail, hashEmail, escapeHtml, validateContactPayload } from './contactUtils';

describe('Contact Utilities', () => {
  it('normalizes email addresses correctly', () => {
    expect(normalizeEmail('  USER@Example.com  ')).toBe('user@example.com');
    expect(normalizeEmail('Sankhadeep@StudioIgloo.com')).toBe('sankhadeep@studioigloo.com');
  });

  it('hashes normalized email with SHA-256', async () => {
    const email = 'user@example.com';
    const hash = await hashEmail(email);
    expect(hash).toHaveLength(64); // SHA-256 hex string length
    expect(hash).toBe('b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514');
  });

  it('escapes HTML special characters for email body safety', () => {
    const raw = '<script>alert("xss")</script> & "hello"';
    const escaped = escapeHtml(raw);
    expect(escaped).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &quot;hello&quot;');
  });

  it('validates contact payloads within defined limits', () => {
    const validPayload = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'I would like to inquire about wedding photography.',
    };
    expect(validateContactPayload(validPayload).valid).toBe(true);

    const invalidEmailPayload = {
      name: 'Jane Doe',
      email: 'not-an-email',
      message: 'Hello',
    };
    expect(validateContactPayload(invalidEmailPayload).valid).toBe(false);

    const overlongNamePayload = {
      name: 'A'.repeat(101),
      email: 'jane@example.com',
      message: 'Hello',
    };
    expect(validateContactPayload(overlongNamePayload).valid).toBe(false);
  });
});
