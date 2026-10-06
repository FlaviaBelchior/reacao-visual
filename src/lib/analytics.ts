import posthog from 'posthog-js';
let ready=false;
export function initAnalytics(){const key=import.meta.env.VITE_POSTHOG_KEY as string|undefined;if(!key||ready)return;posthog.init(key,{api_host:import.meta.env.VITE_POSTHOG_HOST||'https://us.i.posthog.com',person_profiles:'identified_only',capture_pageview:true,capture_pageleave:true,autocapture:false});ready=true;}
export function track(event:string,properties?:Record<string,unknown>){if(ready)posthog.capture(event,properties)}
