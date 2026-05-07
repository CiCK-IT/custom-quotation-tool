"use client";

import BrandFooter from "@/components/brand-footer";
import SiteNav from "@/components/site-nav";
import Link from "next/link";
import { useMemo, useState } from "react";

const createItem = (id, name = "", price = "", quantity = "1") => ({
  id,
  name,
  price,
  quantity,
});

const initialForm = {
  customerName: "OOO 設計公司",
  quoteNumber: "QT-2026-041",
  date: "2026-04-22",
  contactPerson: "陳小姐",
  notes: "含初稿提案、兩次修正與交付檔案整理。",
  discount: "800",
  taxRate: "5",
};

const initialItems = [
  createItem("item-1", "品牌形象首頁設計", "18000", "1"),
  createItem("item-2", "報價單生成流程規劃", "6800", "1"),
  createItem("item-3", "響應式畫面調整", "3200", "2"),
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

function SectionCard({ eyebrow, title, description, children, className = "" }) {
  return (
    <section className={`glass-panel rounded-[32px] p-6 sm:p-8 ${className}`}>
      <div className="mb-6">
        <p className="eyebrow mb-2 text-neutral-500">
          {eyebrow}
        </p>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">{title}</h2>
          {description ? <p className="max-w-2xl text-sm leading-7 text-neutral-600">{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value, emphasized = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-white/72">{label}</span>
      <span className={emphasized ? "text-lg font-semibold text-white" : "font-medium text-white/92"}>
        {value}
      </span>
    </div>
  );
}

export default function QuoteGenerator() {
  const [form, setForm] = useState(initialForm);
  const [items, setItems] = useState(initialItems);

  const computedItems = useMemo(
    () =>
      items.map((item) => {
        const subtotal = toNumber(item.price) * toNumber(item.quantity);
        return { ...item, subtotal };
      }),
    [items]
  );

  const totals = useMemo(() => {
    const subtotal = computedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const discount = toNumber(form.discount);
    const taxableBase = Math.max(subtotal - discount, 0);
    const tax = Math.round((taxableBase * toNumber(form.taxRate)) / 100);
    const total = taxableBase + tax;

    return { subtotal, discount, tax, total };
  }, [computedItems, form.discount, form.taxRate]);

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const updateItem = (id, key, value) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const addItem = () => {
    setItems((current) => [...current, createItem(`item-${Date.now()}`, "", "", "1")]);
  };

  const removeItem = (id) => {
    setItems((current) => {
      if (current.length === 1) {
        return current;
      }
      return current.filter((item) => item.id !== id);
    });
  };

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <SiteNav actionHref="/inquiry" actionLabel="預約客製報價" />

        <section className="glass-panel fade-up overflow-hidden rounded-[36px] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-medium tracking-[0.2em] text-neutral-600 uppercase">
                客製化報價流程
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                即時生成
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-4xl font-semibold leading-tight text-neutral-950 sm:text-5xl lg:text-6xl">
                  客製化報價單生成器
                </h1>
                <p className="max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
                  以高質感介面整理報價流程，讓商務提案、費用計算與對外溝通一次到位。這是一個適合放進作品集展示，也能作為真實商業工具 demo 的前端作品。
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/inquiry"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                >
                  預約客製報價
                </Link>
                <a
                  href="#preview"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white/80 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:bg-white"
                >
                  查看報價預覽
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["即時計算", "單價、數量、折扣與稅額同步更新"],
                  ["流程整理", "輸入與預覽分區清楚，方便展示與操作"],
                  ["作品集等級", "保有商業感而不是制式後台畫面"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-[24px] border border-white/80 bg-white/65 p-4">
                    <p className="mb-2 text-sm font-semibold text-neutral-900">{title}</p>
                    <p className="text-sm leading-7 text-neutral-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up-delay relative">
              <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[32px] bg-[linear-gradient(135deg,rgba(216,199,165,0.85),rgba(255,255,255,0.25))] blur-2xl" />
              <div className="soft-ring rounded-[32px] bg-[#171717] p-4 text-white shadow-[0_24px_70px_rgba(17,17,17,0.25)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="eyebrow text-white/50">工具預覽</p>
                    <p className="mt-2 text-lg font-semibold">報價摘要面板</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">Live Demo</div>
                </div>

                <div className="rounded-[28px] bg-white/8 p-5">
                  <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <p className="text-sm text-white/50">客戶</p>
                      <p className="mt-1 text-xl font-semibold">{form.customerName || "未填寫客戶名稱"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/50">編號</p>
                      <p className="mt-1 font-medium">{form.quoteNumber || "自動產生中"}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {computedItems.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {item.name || "未命名品項"}
                          </p>
                          <p className="mt-1 text-xs text-white/45">
                            {toNumber(item.quantity)} x {formatCurrency(toNumber(item.price))}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">{formatCurrency(item.subtotal)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[24px] bg-white px-5 py-4 text-neutral-950">
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <span>最終總金額</span>
                      <span>含稅</span>
                    </div>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">{formatCurrency(totals.total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]" id="editor">
          <div className="space-y-8">
            <SectionCard
              eyebrow="基本資料"
              title="建立報價資訊"
              description="把客戶與報價單資料整理成可對外展示的標準格式。"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="客戶名稱">
                  <input
                    className="field"
                    value={form.customerName}
                    onChange={(event) => updateForm("customerName", event.target.value)}
                    placeholder="例如：OOO 公司"
                  />
                </Field>
                <Field label="報價單編號">
                  <input
                    className="field"
                    value={form.quoteNumber}
                    onChange={(event) => updateForm("quoteNumber", event.target.value)}
                    placeholder="例如：QT-2026-001"
                  />
                </Field>
                <Field label="日期">
                  <input
                    className="field"
                    type="date"
                    value={form.date}
                    onChange={(event) => updateForm("date", event.target.value)}
                  />
                </Field>
                <Field label="聯絡人">
                  <input
                    className="field"
                    value={form.contactPerson}
                    onChange={(event) => updateForm("contactPerson", event.target.value)}
                    placeholder="例如：林先生"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="備註">
                    <textarea
                      className="field min-h-28 resize-none"
                      value={form.notes}
                      onChange={(event) => updateForm("notes", event.target.value)}
                      placeholder="輸入交付內容、修正次數或付款說明"
                    />
                  </Field>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow="品項清單"
              title="管理報價品項"
              description="支援新增多筆品項，單價與數量會自動換算小計。"
            >
              <div className="space-y-4">
                {computedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="soft-ring rounded-[28px] bg-white/80 p-4 sm:p-5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">品項 {index + 1}</p>
                        <p className="mt-1 text-sm text-neutral-500">即時計算小計，減少手動換算錯誤。</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={computedItems.length === 1}
                      >
                        刪除
                      </button>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr]">
                      <Field label="品項名稱">
                        <input
                          className="field"
                          value={item.name}
                          onChange={(event) => updateItem(item.id, "name", event.target.value)}
                          placeholder="例如：網站首頁視覺設計"
                        />
                      </Field>
                      <Field label="單價">
                        <input
                          className="field"
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={(event) => updateItem(item.id, "price", event.target.value)}
                          placeholder="0"
                        />
                      </Field>
                      <Field label="數量">
                        <input
                          className="field"
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(event) => updateItem(item.id, "quantity", event.target.value)}
                          placeholder="1"
                        />
                      </Field>
                      <Field label="小計">
                        <div className="field flex min-h-[54px] items-center justify-end bg-[rgba(23,23,23,0.03)] font-semibold">
                          {formatCurrency(item.subtotal)}
                        </div>
                      </Field>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addItem}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                新增一筆品項
              </button>
            </SectionCard>
          </div>

          <div className="space-y-8">
            <SectionCard
              eyebrow="金額摘要"
              title="自動計算總額"
              description="折扣與稅額會即時套用到最終金額，方便報價確認。"
            >
              <div className="space-y-5">
                <Field label="折扣金額">
                  <input
                    className="field"
                    type="number"
                    min="0"
                    value={form.discount}
                    onChange={(event) => updateForm("discount", event.target.value)}
                    placeholder="0"
                  />
                </Field>
                <Field label="稅額 (%)">
                  <input
                    className="field"
                    type="number"
                    min="0"
                    value={form.taxRate}
                    onChange={(event) => updateForm("taxRate", event.target.value)}
                    placeholder="5"
                  />
                </Field>

                <div className="rounded-[28px] bg-neutral-950 p-5 text-white">
                  <div className="space-y-4">
                    <SummaryRow label="品項小計" value={formatCurrency(totals.subtotal)} />
                    <SummaryRow label="折扣" value={`- ${formatCurrency(totals.discount)}`} />
                    <SummaryRow label="稅額" value={formatCurrency(totals.tax)} />
                    <div className="border-t border-white/10 pt-4">
                      <SummaryRow label="總金額" value={formatCurrency(totals.total)} emphasized />
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow="報價預覽"
              title="即時摘要"
              description="整理後的內容可以直接作為報價對話、提案頁或後續匯出基礎。"
              className="sticky top-6"
            >
              <div id="preview" className="space-y-5">
                <div className="rounded-[28px] bg-[rgba(23,23,23,0.03)] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-neutral-500">客戶名稱</p>
                      <p className="mt-1 text-xl font-semibold text-neutral-950">
                        {form.customerName || "尚未填寫"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-500">報價單編號</p>
                      <p className="mt-1 font-medium text-neutral-900">{form.quoteNumber || "-"}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-neutral-500">日期</p>
                      <p className="mt-1 font-medium text-neutral-900">{form.date || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">聯絡人</p>
                      <p className="mt-1 font-medium text-neutral-900">{form.contactPerson || "-"}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-neutral-200 bg-white/85 p-5">
                  <p className="mb-4 text-sm font-semibold text-neutral-900">品項摘要</p>
                  <div className="space-y-3">
                    {computedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-neutral-900">{item.name || "未命名品項"}</p>
                          <p className="mt-1 text-xs text-neutral-500">
                            數量 {toNumber(item.quantity)} / 單價 {formatCurrency(toNumber(item.price))}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-neutral-900">{formatCurrency(item.subtotal)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-neutral-200 bg-white/85 p-5">
                  <p className="mb-3 text-sm font-semibold text-neutral-900">備註</p>
                  <p className="text-sm leading-7 text-neutral-600">
                    {form.notes || "可在此補充交付內容、付款條件或合作說明。"}
                  </p>
                </div>

                <div className="rounded-[28px] bg-[linear-gradient(180deg,#ffffff_0%,#f2ede5_100%)] p-5">
                  <p className="text-sm text-neutral-500">最終報價</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
                    {formatCurrency(totals.total)}
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        <SectionCard
          eyebrow="價值說明"
          title="讓報價流程更穩定，也更有說服力"
          description="這個 demo 不只是表單，而是把報價整理、費用計算與對外呈現整合成一個更成熟的工具提案。"
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              ["減少錯誤", "品項小計、折扣與稅額自動計算，避免手動輸入造成金額偏差。"],
              ["提升效率", "從輸入到預覽一次完成，報價討論與確認流程更順暢。"],
              ["符合流程", "資訊欄位、摘要邏輯與備註區完整，貼近真實商業報價情境。"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-[28px] border border-white/80 bg-white/70 p-5">
                <p className="text-lg font-semibold text-neutral-950">{title}</p>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <BrandFooter />
      </div>
    </main>
  );
}
