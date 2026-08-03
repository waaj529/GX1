import { NextResponse } from 'next/server';

const API_BASE = (process.env.GSOLVE_API_BASE_URL ?? 'http://127.0.0.1:8001/api').replace(/\/$/, '');
const TIMEOUT_MS = 30_000;

export async function POST(request: Request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const body = await request.formData();
    const upstream = await fetch(`${API_BASE}/project-sites/BRD`, {
      method: 'POST',
      body,
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    const payload: unknown = await upstream.json().catch(() => ({ message: 'Invalid response from BRD service.' }));
    if (!upstream.ok) {
      console.error('BRD submission upstream failure', { status: upstream.status, payload });
      return NextResponse.json({ message: 'BRD submission failed.', details: payload }, { status: upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502 });
    }
    return NextResponse.json(payload, { status: upstream.status });
  } catch (error) {
    console.error('BRD submission request failed', error);
    return NextResponse.json({ message: 'BRD service is temporarily unavailable.' }, { status: 502 });
  } finally { clearTimeout(timeout); }
}
