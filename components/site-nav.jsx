import Link from "next/link";

export default function SiteNav({ actionHref = "/", actionLabel = "返回首頁" }) {
  return (
    <nav
      aria-label="網站導覽"
      className="flex flex-col gap-3 rounded-full border border-white/75 bg-white/60 px-4 py-3 shadow-[0_14px_38px_rgba(17,17,17,0.045)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <Link href="/" className="brand-mark text-sm text-neutral-950 sm:text-base">
        <span className="brand-dot" aria-hidden="true" />
        <span>
          <span className="font-ui tracking-[-0.03em]">cick tools</span>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="font-medium tracking-[0.04em] text-neutral-600">客製報價工具</span>
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
