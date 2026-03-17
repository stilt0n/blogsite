"use client";

import { useEffect, useRef } from "react";

export default function PostContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      target.scrollIntoView();
      history.pushState(null, "", href);
    };

    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="post-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
