"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HashAnchorHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      // scroll: false prevents Next.js from resetting scroll position
      router.push(href, { scroll: false });
      el.scrollIntoView();
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  return null;
}
