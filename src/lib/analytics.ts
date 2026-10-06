import posthog from 'posthog-js';

let initialized = false;

export function initAnalytics() {
  const key = (import.meta.env.VITE_POSTHOG_KEY as string | undefined)
    || 'phc_ogx8mqUXRjcGCBHwJhQ7W8oR5cr3mCzGHTDs2f6joj95';

  if (!key || initialized) return;

  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: false,
    disable_session_recording: true,
  });

  initialized = true;
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (initialized) posthog.capture(event, properties);
}