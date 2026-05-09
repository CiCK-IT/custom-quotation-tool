"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SiteNav({
  actionHref = "/",
  actionLabel = "返回首頁",
  brandLabel = "客製報價工具",
  secondaryActionHref = "",
  secondaryActionLabel = "",
}) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <nav
      aria-label="網站導覽"
      className="flex w-full min-w-0 flex-col gap-3 overflow-hidden rounded-[28px] border border-white/75 bg-white/60 px-4 py-3 shadow-[0_14px_38px_rgba(17,17,17,0.045)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:px-5"
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
              {brandLabel}
            </span>
          </span>
        </span>
      </Link>
      <div className="grid w-full min-w-0 gap-2 sm:flex sm:w-auto sm:shrink-0 sm:flex-wrap sm:items-center">
        <Link
          href={actionHref}
          className="inline-flex min-w-0 items-center justify-center whitespace-nowrap rounded-full border border-neutral-300 bg-white/85 px-4 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-white sm:shrink-0 sm:px-5"
        >
          {actionLabel}
        </Link>
        {secondaryActionHref && secondaryActionLabel ? (
          <Link
            href={secondaryActionHref}
            className="inline-flex min-w-0 items-center justify-center whitespace-nowrap rounded-full bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 sm:shrink-0 sm:px-5"
          >
            {secondaryActionLabel}
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
