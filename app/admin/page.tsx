"use client";

import BrandFooter from "@/components/brand-footer";
import SiteNav from "@/components/site-nav";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const inquiryStorageKey = "cick-tools-inquiries";

const demoQuotes = [
  {
    id: "quote-001",
    quoteNumber: "CICK-2026-001",
    customerName: "OOO 設計公司",
    date: "2026/05/09",
    contactName: "陳小姐",
    total: 82004,
    status: "已送出",
  },
  {
    id: "quote-002",
    quoteNumber: "CICK-2026-002",
    customerName: "OOO 顧問工作室",
    date: "2026/05/08",
    contactName: "林先生",
    total: 46800,
    status: "草稿",
  },
  {
    id: "quote-003",
    quoteNumber: "CICK-2026-003",
    customerName: "OOO 品牌企劃",
    date: "2026/05/07",
    contactName: "王小姐",
    total: 126000,
    status: "已完成",
  },
];

const demoInquiryStats = {
  total: 3,
  pending: 2,
  completed: 1,
};

const getInquiryStats = () => {
  try {
    const stored = window.localStorage.getItem(inquiryStorageKey);
    const parsed = stored ? JSON.parse(stored) : null;
    const records = Array.isArray(parsed) && parsed.length > 0 ? parsed : null;

    if (!records) {
      return demoInquiryStats;
    }

    return {
      total: records.length,
      pending: records.filter((item) =>
        ["新需求", "已聯絡", "報價中"].includes(String(item.status || "新需求"))
      ).length,
      completed: records.filter((item) => item.status === "已完成").length,
    };
  } catch {
    return demoInquiryStats;
  }
};

export default function AdminOverviewPage() {
  const [inquiryStats, setInquiryStats] = useState(demoInquiryStats);

  useEffect(() => {
    setInquiryStats(getInquiryStats());
  }, []);

  const quoteStats = useMemo(
    () => ({
      total: demoQuotes.length,
      pending: demoQuotes.filter((quote) => quote.status !== "已完成").length,
      completed: demoQuotes.filter((quote) => quote.status === "已完成").length,
    }),
    []
  );

  const stats = [
    { label: "報價單數", value: quoteStats.total },
    { label: "合作詢問數", value: inquiryStats.total },
    { label: "待處理需求", value: quoteStats.pending + inquiryStats.pending },
    { label: "已完成項目", value: quoteStats.completed + inquiryStats.completed },
  ];

  const entryCards = [
    {
      eyebrow: "Quotes",
      title: "報價單管理",
      description: "集中查看首頁產生的報價單 demo 資料，包含客戶、日期、總金額與狀態。",
      href: "/admin/quotes",
      meta: `${quoteStats.total} 筆報價單`,
    },
    {
      eyebrow: "Inquiries",
      title: "合作詢問管理",
      description: "查看詢價頁送出的合作需求，追蹤狀態並整理內部備註。",
      href: "/admin/inquiries",
      meta: `${inquiryStats.total} 筆合作詢問`,
    },
  ];

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:gap-8 sm:px-6 lg:px-8 lg:py-8">
        <SiteNav
          brandLabel="管理中心"
          actionHref="/"
          actionLabel="返回首頁"
          secondaryActionHref="/inquiry"
          secondaryActionLabel="查看詢價頁"
        />

        <section className="glass-panel fade-up overflow-hidden rounded-[36px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div className="space-y-4">
              <p className="eyebrow text-neutral-600">Admin Center</p>
              <div className="space-y-3">
                <h1 className="font-display hero-title max-w-3xl text-4xl text-neutral-950 sm:text-5xl">
                  管理中心
                </h1>
                <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:leading-8">
                  集中查看報價單與合作詢問資料，讓客製工具從前台展示延伸到後台管理流程。
                </p>
              </div>
            </div>
            <div className="rounded-[28px] border border-[#d8c7a5]/30 bg-white/72 p-4 shadow-[0_12px_30px_rgba(17,17,17,0.035)]">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Demo Scope
              </p>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                目前是前端 demo 版本，不含 Supabase、登入與權限控管。資料以假資料與 localStorage 呈現完整管理情境。
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="soft-ring rounded-[28px] border border-[#d8c7a5]/28 bg-white/76 p-5"
            >
              <p className="font-ui text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                {stat.label}
              </p>
              <p className="font-ui mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
                {stat.value}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {entryCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="glass-panel group rounded-[34px] p-5 transition hover:-translate-y-0.5 hover:border-[#d8c7a5]/55 hover:bg-white/78 sm:p-6"
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="eyebrow text-neutral-500">{card.eyebrow}</p>
                    <span className="rounded-full border border-[#d8c7a5]/40 bg-[#f8f4ec]/80 px-3 py-1.5 font-ui text-xs font-medium tracking-[0.12em] text-neutral-600">
                      {card.meta}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                      {card.title}
                    </h2>
                    <p className="max-w-xl text-sm leading-7 text-neutral-600">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="inline-flex w-fit items-center rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition group-hover:bg-neutral-800">
                  進入管理
                </div>
              </div>
            </Link>
          ))}
        </section>

        <BrandFooter />
      </div>
    </main>
  );
}
