"use client";

import { useEffect } from "react";

declare global { interface Window { adsbygoogle?: unknown[] } }

export function AdSlot({ slot, placement }: { slot?: string; placement: "home" | "content" }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  useEffect(() => {
    if (!client || !slot) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* AdSense retries after loading. */ }
  }, [client, slot]);
  if (!client || !slot) return null;
  return <aside className={`adPlacement ${placement}`} aria-label="Publicité"><span>Publicité</span><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" /></aside>;
}
