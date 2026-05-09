"use client";

import BrandFooter from "@/components/brand-footer";
import SiteNav from "@/components/site-nav";
import { useEffect, useMemo, useState } from "react";

const quoteStorageKey = "cick-tools-quotes";
const statusOptions = ["草稿", "已送出", "已完成"];

const demoQuotes = [
  {
    id: "quote-001",
    quoteNumber: "CICK-2026-001",
    customerName: "OOO 設計公司",
    date: "2026/05/09",
    contactName: "陳小姐",
    total: 82004,
    status: "已送出",
    note: "此報價包含需求整理、介面設計、前端互動開發與基本上線協助。",
    items: [
      { name: "客製報價工具介面", quantity: 1, subtotal: 36000 },
      { name: "品項與金額計算流程", quantity: 1, subtotal: 28000 },
      { name: "PDF 報價單輸出", quantity: 1, subtotal: 18004 },
    ],
  },
  {
    id: "quote-002",
    quoteNumber: "CICK-2026-002",
    customerName: "OOO 顧問工作室",
    date: "2026/05/08",
    contactName: "林先生",
    total: 46800,
    status: "草稿",
    note: "先以詢價入口與後續 Email 串接作為第一階段範圍。",
    items: [
      { name: "合作詢價頁設計", quantity: 1, subtotal: 22000 },
      { name: "表單欄位與送出提示", quantity: 1, subtotal: 14800 },
      { name: "品牌視覺精修", quantity: 1, subtotal: 10000 },
    ],
  },
  {
    id: "quote-003",
    quoteNumber: "CICK-2026-003",
    customerName: "OOO 品牌企劃",
    date: "2026/05/07",
    contactName: "王小姐",
    total: 126000,
    status: "已完成",
    note: "需求適合作為小型管理介面，後續可延伸資料庫與權限管理。",
    items: [
      { name: "需求管理中心", quantity: 1, subtotal: 46000 },
      { name: "搜尋與篩選流程", quantity: 1, subtotal: 32000 },
      { name: "狀態與內部備註管理", quantity: 1, subtotal: 28000 },
      { name: "響應式介面優化", quantity: 1, subtotal: 20000 },
    ],
  },
];

const statusStyles: Record<string, string> = {
  草稿: "bg-white text-neutral-700 border-neutral-200",
  已送出: "bg-neutral-950 text-white border-neutral-950",
  已完成: "bg-[#e8eee7] text-[#31523b] border-[#b9c9b8]",
};

const formatCurrency = (value) =>
  `NT$${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const normalizeQuote = (record, index) => ({
  id: record.id || `quote-${index}`,
  quoteNumber: record.quoteNumber || "未填寫",
  customerName: record.customerName || "未填寫客戶名稱",
  date: record.date || "未填寫",
  contactName: record.contactName || "未填寫",
  total: Number(record.total) || 0,
  status: statusStyles[record.status] ? record.status : "已送出",
  note: record.note || "此報價為首頁報價工具產生的 demo 資料。",
  items:
    Array.isArray(record.items) && record.items.length > 0
      ? record.items.map((item, itemIndex) => ({
          name: item.name || `品項 ${itemIndex + 1}`,
          quantity: Number(item.quantity) || 0,
          subtotal: Number(item.subtotal) || 0,
        }))
      : [{ name: "未提供品項明細", quantity: 1, subtotal: Number(record.total) || 0 }],
});

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState(demoQuotes);
  const [selectedId, setSelectedId] = useState(demoQuotes[0].id);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(quoteStorageKey);
      const parsed = stored ? JSON.parse(stored) : null;
      const records = Array.isArray(parsed)
        ? parsed.map((item, index) => normalizeQuote(item, index))
        : [];

      if (records.length > 0) {
        setQuotes(records);
        setSelectedId(records[0].id);
      }
    } catch {
      setQuotes(demoQuotes);
      setSelectedId(demoQuotes[0].id);
    }
  }, []);

  const selectedQuote = useMemo(
    () => quotes.find((quote) => quote.id === selectedId) || quotes[0] || demoQuotes[0],
    [quotes, selectedId]
  );

  const updateQuoteStatus = (id, status) => {
    const nextQuotes = quotes.map((quote) => (quote.id === id ? { ...quote, status } : quote));

    setQuotes(nextQuotes);

    try {
      window.localStorage.setItem(quoteStorageKey, JSON.stringify(nextQuotes));
    } catch {
      // Demo persistence is best-effort; the in-page state should still update immediately.
    }
  };

  const stats = [
    { label: "報價單數", value: quotes.length },
    { label: "草稿", value: quotes.filter((quote) => quote.status === "草稿").length },
    { label: "已送出", value: quotes.filter((quote) => quote.status === "已送出").length },
    { label: "已完成", value: quotes.filter((quote) => quote.status === "已完成").length },
  ];

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:gap-8 sm:px-6 lg:px-8 lg:py-8">
        <SiteNav
          brandLabel="報價單管理"
          actionHref="/"
          actionLabel="返回首頁"
        />

        <section className="glass-panel fade-up overflow-hidden rounded-[36px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div className="space-y-4">
              <p className="eyebrow text-neutral-600">Quote Records</p>
              <div className="space-y-3">
                <h1 className="font-display hero-title max-w-3xl text-4xl text-neutral-950 sm:text-5xl">
                  報價單管理
                </h1>
                <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:leading-8">
                  檢視由報價工具產生的 demo 報價單資料，快速掌握客戶、日期、金額與目前狀態。
                </p>
              </div>
            </div>
            <div className="rounded-[28px] border border-[#d8c7a5]/30 bg-white/72 p-4 shadow-[0_12px_30px_rgba(17,17,17,0.035)]">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Demo Quotes
              </p>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                第一版先使用假資料呈現管理情境，未來可再串接首頁產生的報價單儲存資料。
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

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="glass-panel rounded-[34px] p-5 sm:p-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-2 text-neutral-500">Quotes</p>
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">報價單列表</h2>
              </div>
              <p className="font-ui text-sm text-neutral-500">{quotes.length} 筆</p>
            </div>

            <div className="space-y-3">
              {quotes.map((quote) => (
                <article
                  key={quote.id}
                  className={`rounded-[28px] border p-4 transition ${
                    selectedQuote.id === quote.id
                      ? "border-[#d8c7a5]/70 bg-[#f8f4ec]"
                      : "border-[#d8c7a5]/24 bg-white/76 hover:bg-white/90"
                  }`}
                >
                  <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr_auto] xl:items-center">
                    <div>
                      <p className="font-ui text-xs font-medium tracking-[0.12em] text-neutral-500">
                        {quote.quoteNumber}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-neutral-950">
                        {quote.customerName}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-600">
                        {quote.date} / {quote.contactName}
                      </p>
                    </div>
                    <div className="grid gap-2 text-sm text-neutral-600 sm:grid-cols-3 xl:grid-cols-1">
                      <span>日期：{quote.date}</span>
                      <span>聯絡人：{quote.contactName}</span>
                      <span className="font-ui font-semibold text-neutral-950">
                        {formatCurrency(quote.total)}
                      </span>
                    </div>
                    <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center xl:justify-end">
                      <span
                        className={`inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold sm:w-auto ${
                          statusStyles[quote.status] || statusStyles["草稿"]
                        }`}
                      >
                        {quote.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedId(quote.id)}
                        className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-neutral-300 bg-white/90 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-white sm:w-auto"
                      >
                        查看詳情
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="glass-panel rounded-[34px] p-5 sm:p-6 lg:sticky lg:top-6">
            <div className="space-y-6">
              <div>
                <p className="eyebrow mb-2 text-neutral-500">Detail</p>
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">報價單詳情</h2>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  {selectedQuote.quoteNumber} / {selectedQuote.customerName}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["報價單編號", selectedQuote.quoteNumber],
                  ["客戶名稱", selectedQuote.customerName],
                  ["日期", selectedQuote.date],
                  ["聯絡人", selectedQuote.contactName],
                  ["總金額", formatCurrency(selectedQuote.total)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[22px] border border-[#d8c7a5]/25 bg-white/74 p-4">
                    <p className="font-ui text-xs font-medium tracking-[0.12em] text-neutral-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-neutral-950">{value}</p>
                  </div>
                ))}
                <label className="rounded-[22px] border border-[#d8c7a5]/25 bg-white/74 p-4">
                  <span className="font-ui text-xs font-medium tracking-[0.12em] text-neutral-500">
                    狀態
                  </span>
                  <select
                    className="mt-2 w-full rounded-2xl border border-[#d8c7a5]/35 bg-white px-3 py-2.5 text-sm font-semibold text-neutral-950 outline-none transition focus:border-neutral-900"
                    value={selectedQuote.status}
                    onChange={(event) => updateQuoteStatus(selectedQuote.id, event.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="rounded-[24px] border border-[#d8c7a5]/25 bg-white/74 p-4">
                <p className="font-ui text-xs font-medium tracking-[0.12em] text-neutral-500">品項摘要</p>
                <div className="mt-3 space-y-3">
                  {selectedQuote.items.map((item) => (
                    <div
                      key={item.name}
                      className="grid grid-cols-[1fr_auto] gap-3 text-sm leading-6 text-neutral-600"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-ui font-semibold text-neutral-950">
                        {formatCurrency(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-neutral-900 bg-neutral-950 p-5 text-white shadow-[0_18px_45px_rgba(17,17,17,0.16)]">
                <p className="font-ui text-xs font-medium uppercase tracking-[0.2em] text-white/58">
                  Total Amount
                </p>
                <p className="font-ui mt-3 text-3xl font-semibold tracking-tight">
                  {formatCurrency(selectedQuote.total)}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/72">{selectedQuote.note}</p>
              </div>
            </div>
          </aside>
        </section>

        <BrandFooter />
      </div>
    </main>
  );
}
