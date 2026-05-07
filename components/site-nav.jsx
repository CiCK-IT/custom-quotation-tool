import Link from "next/link";

export default function SiteNav({ actionHref = "/", actionLabel = "返回首頁" }) {
  return (
    <nav
      aria-label="網站導覽"
      className="flex flex-col gap-3 rounded-full border border-white/70 bg-white/55 px-4 py-3 shadow-[0_12px_36px_rgba(17,17,17,0.04)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-950 sm:text-base">
        cick tools / 客製報價工具
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
