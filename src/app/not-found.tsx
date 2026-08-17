"use client";

import { useEffect } from "react";

// GitHub Pages serves this static 404.html for every unmatched URL, so the
// redirect target can't depend on the request — it always sends visitors
// to "/", the canonical default-locale home page (see
// scripts/postbuild-default-locale.mjs). The meta refresh covers
// no-JS/crawler cases; the effect covers everyone else immediately.
export default function NotFound() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/" />
      <meta name="robots" content="noindex" />
      <p>
        Page not found. Redirecting to <a href="/">the homepage</a>&hellip;
      </p>
    </>
  );
}
