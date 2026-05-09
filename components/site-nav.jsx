"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SiteNav({ actionHref = "/", actionLabel = "返回首頁" }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <nav
      aria-label="網站導覽"
      className="flex flex-col gap-3 rounded-full border border-white/75 bg-white/60 px-4 py-3 shadow-[0_14px_38px_rgba(17,17,17,0.045)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <Link
        href="/"
        className="brand-mark min-w-0 text-sm text-neutral-950 sm:text-base"
        aria-label="cick tools 客製報價工具"
      >
        <span className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          {logoFailed ? (
            <span className="font-ui shrink-0 font-bold tracking-[-0.03em]">cick tools</span>
          ) : (
            <Image
              src="/images/cick_tools_horizontal_black_transparent.png"
              alt="cick tools"
              width={160}
              height={48}
              priority
              className="h-6 w-auto shrink-0 object-contain sm:h-7"
              onError={() => setLogoFailed(true)}
            />
          )}
          <span className="flex min-w-0 items-center text-neutral-300">
            <span className="mx-1.5 sm:mx-2">/</span>
            <span className="truncate text-xs font-medium tracking-[0.04em] text-neutral-600 sm:text-sm">
              客製報價工具
            </span>
          </span>
        </span>
      </Link>
      <Link
        href={actionHref}
        className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-neutral-300 bg-white/85 px-5 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-white"
      >
        {actionLabel}
      </Link>
    </nav>
  );
}
