import contactConfig from '../../src/config/contact.json';

interface Env {
  CONTACTS_KV?: {
    get(key: string, type?: 'json' | 'text'): Promise<any>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
    list(options?: { prefix?: string; limit?: number }): Promise<{ keys: Array<{ name: string; metadata?: any }> }>;
    delete(key: string): Promise<void>;
  };
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

async function hashEmail(normalizedEmail: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(normalizedEmail);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  // Header response helper
  const jsonResponse = (data: any, status = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  };

  try {
    // 1. Content-Type check
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return jsonResponse({ success: false, message: 'Invalid Content-Type', code: 'VALIDATION_ERROR' }, 400);
    }

    // 2. Request body size check (< 50KB)
    const rawBody = await request.text();
    if (rawBody.length > 50000) {
      return jsonResponse({ success: false, message: 'Payload too large', code: 'VALIDATION_ERROR' }, 413);
    }

    const payload = JSON.parse(rawBody);

    // 3. Honeypot check
    if (payload.honeypot && payload.honeypot.trim() !== '') {
      // Decoy success response for bots
      return jsonResponse({
        success: true,
        message: contactConfig.messages.success,
        code: 'SUCCESS',
      });
    }

    const limits = contactConfig.limits;

    // 4. Server-side Field Validation
    const name = typeof payload.name === 'string' ? payload.name.trim() : '';
    const email = typeof payload.email === 'string' ? payload.email.trim() : '';
    const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
    const service = typeof payload.service === 'string' ? payload.service.trim() : '';
    const date = typeof payload.date === 'string' ? payload.date.trim() : '';
    const message = typeof payload.message === 'string' ? payload.message.trim() : '';

    if (!name || name.length > limits.nameMax) {
      return jsonResponse({ success: false, message: 'Invalid name field', code: 'VALIDATION_ERROR' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > limits.emailMax || !emailRegex.test(email)) {
      return jsonResponse({ success: false, message: 'Invalid email address', code: 'VALIDATION_ERROR' }, 400);
    }

    if (phone.length > limits.phoneMax || service.length > limits.serviceMax || date.length > limits.dateMax) {
      return jsonResponse({ success: false, message: 'Field exceeds allowed length', code: 'VALIDATION_ERROR' }, 400);
    }

    if (!message || message.length > limits.messageMax) {
      return jsonResponse({ success: false, message: 'Invalid message field', code: 'VALIDATION_ERROR' }, 400);
    }

    // 5. Cloudflare Turnstile Verification (if configured & token provided)
    if (contactConfig.turnstile.enabled && env.TURNSTILE_SECRET_KEY && payload.turnstileToken) {
      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: payload.turnstileToken,
        }),
      });
      const turnstileData: any = await turnstileRes.json();
      if (!turnstileData.success) {
        return jsonResponse({ success: false, message: 'Security verification failed', code: 'VALIDATION_ERROR' }, 403);
      }
    }

    // 6. Email Normalization & SHA-256 Hashing
    const normalized = normalizeEmail(email);
    const emailHash = await hashEmail(normalized);
    const kvKey = `contact:${emailHash}`;

    // 7. Check Duplicate Record in Cloudflare KV
    if (env.CONTACTS_KV) {
      const existing: any = await env.CONTACTS_KV.get(kvKey, 'json');
      if (existing && existing.submittedAt) {
        const windowMs = (contactConfig.duplicateWindowDays || 3) * 24 * 60 * 60 * 1000;
        if (Date.now() - existing.submittedAt < windowMs) {
          return jsonResponse({
            success: true,
            message: contactConfig.messages.duplicate,
            code: 'DUPLICATE',
          });
        }
      }
    }

    // 8. Send Email via Resend API
    const resendApiKey = env.RESEND_API_KEY;
    const recipientEmail = env.CONTACT_TO_EMAIL || 'hello@studioigloo.com';
    const senderEmail = env.CONTACT_FROM_EMAIL || 'Studio Igloo <onboarding@resend.dev>';

    if (resendApiKey) {
      const htmlBody = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; color: #1C1C1C; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="font-family: Georgia, serif; color: #1C1C1C; border-bottom: 2px solid #FAF8F5; padding-bottom: 10px;">
            NEW ENQUIRY — STUDIO IGLOO
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${escapeHtml(phone)}</td></tr>` : ''}
            ${service ? `<tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td>${escapeHtml(service)}</td></tr>` : ''}
            ${date ? `<tr><td style="padding: 8px 0; font-weight: bold;">Preferred Date:</td><td>${escapeHtml(date)}</td></tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #FAF8F5; border-left: 4px solid #1C1C1C;">
            <p style="font-weight: bold; margin-top: 0;">Message:</p>
            <p style="white-space: pre-wrap; margin-bottom: 0;">${escapeHtml(message)}</p>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 30px;">Submitted at ${new Date().toISOString()}</p>
        </body>
        </html>
      `;

      const textBody = `NEW ENQUIRY — STUDIO IGLOO\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service || 'N/A'}\nPreferred Date: ${date || 'N/A'}\n\nMessage:\n${message}\n\nSubmitted: ${new Date().toISOString()}`;

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipientEmail],
          subject: `New Studio Igloo enquiry — ${service || name}`,
          html: htmlBody,
          text: textBody,
        }),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error('Resend API error:', errText);
        return jsonResponse({
          success: false,
          message: contactConfig.messages.serverError,
          code: 'SERVER_ERROR',
        }, 500);
      }
    } else {
      console.warn('RESEND_API_KEY environment variable is not configured. Email submission simulated locally.');
    }

    // 9. Store Deduplication Record in Cloudflare KV
    if (env.CONTACTS_KV) {
      const retentionSeconds = (contactConfig.retentionDays || 3) * 24 * 60 * 60;
      await env.CONTACTS_KV.put(
        kvKey,
        JSON.stringify({
          hash: emailHash,
          submittedAt: Date.now(),
          status: 'sent',
        }),
        { expirationTtl: retentionSeconds }
      );

      // Best-effort housekeeping: cap maxStoredContacts
      try {
        const maxStored = contactConfig.maxStoredContacts || 30;
        const listResult = await env.CONTACTS_KV.list({ prefix: 'contact:' });
        if (listResult && listResult.keys && listResult.keys.length > maxStored) {
          // Find and delete oldest entries beyond limit
          const keysWithData = await Promise.all(
            listResult.keys.map(async (k) => {
              const val: any = await env.CONTACTS_KV!.get(k.name, 'json');
              return { name: k.name, submittedAt: val?.submittedAt || 0 };
            })
          );
          keysWithData.sort((a, b) => a.submittedAt - b.submittedAt);
          const toDelete = keysWithData.slice(0, keysWithData.length - maxStored);
          for (const item of toDelete) {
            await env.CONTACTS_KV.delete(item.name);
          }
        }
      } catch (cleanupErr) {
        console.warn('KV cleanup exception:', cleanupErr);
      }
    }

    // 10. Return Success Response
    return jsonResponse({
      success: true,
      message: contactConfig.messages.success,
      code: 'SUCCESS',
    });

  } catch (err) {
    console.error('Contact endpoint exception:', err);
    return jsonResponse({
      success: false,
      message: contactConfig.messages.serverError,
      code: 'SERVER_ERROR',
    }, 500);
  }
}
