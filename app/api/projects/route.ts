import { NextResponse } from 'next/server';
import { ProjectListResponseSchema } from '../../lib/gsolve';

const upstreamBase = process.env.GSOLVE_API_BASE_URL ?? 'https://gx101-production.up.railway.app/api';
const UPSTREAM_URL = `${upstreamBase.replace(/\/$/, '')}/project-sites/gsolve/project-list`;
const TIMEOUT_MS = 10_000;

export async function GET(request: Request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const refresh = new URL(request.url).searchParams.has('refresh');
    const upstream = await fetch(UPSTREAM_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      ...(refresh ? { cache: 'no-store' as const } : { next: { revalidate: 60 } }),
    });
    if (!upstream.ok) {
      console.error('GSolve project-list upstream failure', { status: upstream.status });
      return NextResponse.json({ message: 'Project service is temporarily unavailable.' }, { status: 502 });
    }
    const payload = ProjectListResponseSchema.safeParse(await upstream.json());
    if (!payload.success || payload.data.status_code !== 200 || payload.data.data.code !== '001') {
      console.error('GSolve project-list returned an invalid response', payload.success ? payload.data : payload.error.flatten());
      return NextResponse.json({ message: 'Project service returned an invalid response.' }, { status: 502 });
    }
    return NextResponse.json(payload.data, { headers: { 'Cache-Control': 'private, max-age=60, stale-while-revalidate=300' } });
  } catch (error) {
    console.error('GSolve project-list request failed', error);
    return NextResponse.json({ message: 'Project service is temporarily unavailable.' }, { status: 502 });
  } finally { clearTimeout(timeout); }
}
