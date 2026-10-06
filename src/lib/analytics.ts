import posthog from 'posthog-js';
let ready=false;
export function initAnalytics(){
  const key=(import.meta.env.VITE_POSTHOG_KEY as string|undefined)||'phc_ogx8mqUXRjcGCBHwJhQ7W8oR5cr3mCzGHTDs2f6joj95';
  if(ready)return;
  posthog.init(key,{api_host:(import.meta.env.VITE_POSTHOG_HOST as string|undefined)||'https://us.i.posthog.com',person_profiles:'identified_only',capture_pageview:true,capture_pageleave:true,autocapture:false,disable_session_recording:true});
  ready=true;
}
export function track(event:string,properties?:Record<string,unknown>){if(ready)posthog.capture(event,properties)}
