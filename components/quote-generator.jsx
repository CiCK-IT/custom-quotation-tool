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
  notes: "此報價包含需求整理、介面設計、前端互動開發與基本上線協助。",
  discount: "1200",
  taxRate: "5",
};

const initialItems = [
  createItem("item-1", "客製報價工具介面設計", "28000", "1"),
  createItem("item-2", "詢價表單與欄位流程規劃", "12000", "1"),
  createItem("item-3", "報價邏輯與金額摘要開發", "18000", "1"),
];

const formatCurrency = (value) => {
  const amount = Math.round(Number.isFinite(value) ? value : 0);
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);

  return `NT$${formatted}`;
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatPlainDate = (value) => {
  if (!value) {
    return "未填寫";
  }

  return value.replaceAll("-", "/");
};

function buildQuotePrintHtml({ form, items, totals }) {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name || "未命名品項")}</td>
          <td class="numeric">${formatCurrency(toNumber(item.price))}</td>
          <td class="quantity">${toNumber(item.quantity)}</td>
          <td class="numeric strong">${formatCurrency(item.subtotal)}</td>
        </tr>
      `
    )
    .join("");

  return `<!doctype html>
    <html lang="zh-Hant">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(form.quoteNumber || "quotation")} - cick tools 報價單</title>
        <style>
          @page {
            size: A4;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background: #ffffff;
            color: #171717;
            font-family: "Noto Sans TC", "Microsoft JhengHei", "PingFang TC", Arial, sans-serif;
            font-size: 12px;
            line-height: 1.72;
          }

          .sheet {
            width: 100%;
            min-height: 297mm;
            padding: 16mm;
          }

          .topbar {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
            border-bottom: 1px solid #ded7ca;
            padding-bottom: 22px;
          }

          .brand {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }

          .brand-note {
            margin-top: 5px;
            color: #7a7168;
            font-size: 11px;
          }

          h1 {
            margin: 20px 0 0;
            font-size: 30px;
            font-weight: 700;
            letter-spacing: 0.02em;
            line-height: 1.25;
          }

          .quote-number {
            min-width: 180px;
            border-radius: 16px;
            background: #f4f1ea;
            padding: 14px 16px;
            text-align: right;
          }

          .quote-number span {
            display: block;
            color: #7a7168;
            font-size: 10px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }

          .quote-number strong {
            display: block;
            margin-top: 4px;
            font-size: 14px;
          }

          .meta {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-top: 22px;
          }

          .meta-card {
            border: 1px solid #e5ded2;
            border-radius: 14px;
            padding: 12px 13px;
          }

          .label {
            color: #7a7168;
            font-size: 10px;
            letter-spacing: 0.12em;
          }

          .value {
            margin-top: 4px;
            font-size: 13px;
            font-weight: 600;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 26px;
          }

          th {
            border-bottom: 1px solid #d8c7a5;
            color: #6d665e;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.1em;
            padding: 10px 8px;
            text-align: left;
          }

          td {
            border-bottom: 1px solid #eee8dd;
            padding: 13px 8px;
            vertical-align: top;
          }

          .numeric {
            text-align: right;
            white-space: nowrap;
          }

          .quantity {
            text-align: center;
            white-space: nowrap;
          }

          .strong {
            font-weight: 700;
          }

          .bottom {
            display: grid;
            grid-template-columns: 1fr 260px;
            gap: 24px;
            margin-top: 24px;
            align-items: start;
          }

          .notes {
            min-height: 116px;
            border: 1px solid #e5ded2;
            border-radius: 16px;
            padding: 14px 16px;
          }

          .summary {
            border-radius: 18px;
            background: #171717;
            color: #ffffff;
            padding: 16px;
          }

          .summary-row {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            padding: 7px 0;
            color: rgba(255, 255, 255, 0.78);
          }

          .summary-row.total {
            border-top: 1px solid rgba(255, 255, 255, 0.18);
            margin-top: 8px;
            padding-top: 14px;
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
          }

          .footer {
            margin-top: 34px;
            border-top: 1px solid #eee8dd;
            padding-top: 12px;
            color: #8a8178;
            font-size: 10px;
            text-align: right;
          }

          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <main class="sheet">
          <section class="topbar">
            <div>
              <div class="brand">cick tools</div>
              <div class="brand-note">高質感客製商業工具設計</div>
              <h1>客製化報價單</h1>
            </div>
            <div class="quote-number">
              <span>Quote No.</span>
              <strong>${escapeHtml(form.quoteNumber || "未填寫")}</strong>
            </div>
          </section>

          <section class="meta">
            <div class="meta-card">
              <div class="label">客戶名稱</div>
              <div class="value">${escapeHtml(form.customerName || "未填寫")}</div>
            </div>
            <div class="meta-card">
              <div class="label">日期</div>
              <div class="value">${escapeHtml(formatPlainDate(form.date))}</div>
            </div>
            <div class="meta-card">
              <div class="label">聯絡人</div>
              <div class="value">${escapeHtml(form.contactPerson || "未填寫")}</div>
            </div>
            <div class="meta-card">
              <div class="label">報價單編號</div>
              <div class="value">${escapeHtml(form.quoteNumber || "未填寫")}</div>
            </div>
          </section>

          <table>
            <thead>
              <tr>
                <th>品項</th>
                <th class="numeric">單價</th>
                <th class="quantity">數量</th>
                <th class="numeric">小計</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>

          <section class="bottom">
            <div class="notes">
              <div class="label">備註</div>
              <div class="value">${escapeHtml(form.notes || "無")}</div>
            </div>
            <div class="summary">
              <div class="summary-row">
                <span>小計</span>
                <strong>${formatCurrency(totals.subtotal)}</strong>
              </div>
              <div class="summary-row">
                <span>折扣</span>
                <strong>- ${formatCurrency(totals.discount)}</strong>
              </div>
              <div class="summary-row">
                <span>稅額</span>
                <strong>${formatCurrency(totals.tax)}</strong>
              </div>
              <div class="summary-row total">
                <span>總金額</span>
                <strong>${formatCurrency(totals.total)}</strong>
              </div>
            </div>
          </section>

          <footer class="footer">Designed & built by cick tools.</footer>
        </main>
      </body>
    </html>`;
}

function SectionCard({ eyebrow, title, description, children, className = "" }) {
  return (
    <section className={`glass-panel rounded-[32px] p-5 sm:p-8 ${className}`}>
      <div className="mb-5 sm:mb-6">
        <p className="eyebrow mb-2 text-neutral-500">
          {eyebrow}
        </p>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">{title}</h2>
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
      <span
        className={`font-ui ${emphasized ? "text-lg font-semibold text-white" : "font-medium text-white/92"}`}
      >
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

  const exportQuotePdf = () => {
    const printWindow = window.open("", "_blank", "width=920,height=720");

    if (!printWindow) {
      window.alert("瀏覽器阻擋了 PDF 視窗，請允許彈出視窗後再試一次。");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(
      buildQuotePrintHtml({
        form,
        items: computedItems,
        totals,
      })
    );
    printWindow.document.close();
    printWindow.focus();

    window.setTimeout(() => {
      printWindow.print();
    }, 350);
  };

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:gap-8 sm:px-6 lg:px-8 lg:py-8">
        <SiteNav actionHref="/inquiry" actionLabel="預約客製報價" />

        <section className="glass-panel fade-up overflow-hidden rounded-[36px] px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-7">
              <div className="eyebrow text-neutral-600">
                客製化報價流程
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                即時生成
              </div>

              <div className="space-y-4">
                <h1 className="font-display hero-title text-4xl text-neutral-950 sm:text-5xl lg:text-6xl">
                  客製化報價單生成器
                </h1>
                <p className="max-w-xl text-base leading-7 text-neutral-600 sm:max-w-2xl sm:text-lg sm:leading-8">
                  <span className="sm:hidden">
                    整理報價流程、費用計算與對外溝通，打造能展示也能實用的客製工具 demo。
                  </span>
                  <span className="hidden sm:inline">
                    以高質感介面整理報價流程，讓商務提案、費用計算與對外溝通一次到位。這是一個適合放進作品集展示，也能作為真實商業工具 demo 的前端作品。
                  </span>
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

              <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                {[
                  ["即時計算", "單價、數量、折扣與稅額同步更新"],
                  ["流程整理", "輸入與預覽分區清楚，方便展示與操作"],
                  ["作品集等級", "保有商業感而不是制式後台畫面"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-[24px] border border-[#d8c7a5]/30 bg-white/72 p-3.5 shadow-[0_10px_26px_rgba(17,17,17,0.035)] sm:p-4">
                    <p className="mb-2 text-sm font-semibold text-neutral-900">{title}</p>
                    <p className="text-sm leading-7 text-neutral-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up-delay relative">
              <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[32px] bg-[linear-gradient(135deg,rgba(216,199,165,0.85),rgba(255,255,255,0.25))] blur-2xl" />
              <div className="soft-ring rounded-[32px] border-white/10 bg-[linear-gradient(150deg,#171717_0%,#0f0f0f_100%)] p-3.5 text-white shadow-[0_30px_80px_rgba(17,17,17,0.3)] sm:p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="eyebrow eyebrow-dark">工具預覽</p>
                    <p className="mt-2 text-lg font-semibold">報價摘要面板</p>
                  </div>
                  <div className="font-ui rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.18em] text-white/72 uppercase">
                    Live Demo
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/[0.075] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5">
                  <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <p className="text-sm text-white/50">客戶</p>
                      <p className="mt-1 text-xl font-semibold">{form.customerName || "未填寫客戶名稱"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/50">編號</p>
                      <p className="font-ui mt-1 font-medium">{form.quoteNumber || "自動產生中"}</p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {computedItems.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {item.name || "未命名品項"}
                          </p>
                          <p className="font-ui mt-1 text-xs text-white/50">
                            {toNumber(item.quantity)} x {formatCurrency(toNumber(item.price))}
                          </p>
                        </div>
                        <p className="font-ui text-sm font-semibold">{formatCurrency(item.subtotal)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[24px] bg-white px-5 py-4 text-neutral-950">
                    <div className="font-ui flex items-center justify-between text-sm text-neutral-500">
                      <span>最終總金額</span>
                      <span>含稅</span>
                    </div>
                    <p className="font-ui mt-2 text-3xl font-semibold tracking-tight">{formatCurrency(totals.total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8" id="editor">
          <div className="space-y-6 sm:space-y-8">
            <SectionCard
              eyebrow="基本資料"
              title="建立報價資訊"
              description="把客戶與報價單資料整理成可對外展示的標準格式。"
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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
                      className="field min-h-24 resize-none sm:min-h-28"
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
              <div className="space-y-3 sm:space-y-4">
                {computedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="soft-ring rounded-[28px] bg-white/80 p-3.5 sm:p-5"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4 sm:gap-4">
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

                    <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr]">
                      <Field label="品項名稱">
                        <input
                          className="field"
                          value={item.name}
                          onChange={(event) => updateItem(item.id, "name", event.target.value)}
                          placeholder="例如：報價工具介面設計"
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
                        <div className="field font-ui flex min-h-[54px] items-center justify-end bg-[rgba(23,23,23,0.03)] font-semibold">
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

          <div className="space-y-6 sm:space-y-8">
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

                <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(150deg,#171717_0%,#0d0d0d_100%)] p-5 text-white shadow-[0_18px_42px_rgba(17,17,17,0.16)]">
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
                <div className="rounded-[28px] border border-[#d8c7a5]/25 bg-[rgba(255,255,255,0.58)] p-5 shadow-[0_12px_30px_rgba(17,17,17,0.035)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-neutral-500">客戶名稱</p>
                      <p className="mt-1 text-xl font-semibold text-neutral-950">
                        {form.customerName || "尚未填寫"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-500">報價單編號</p>
                      <p className="font-ui mt-1 font-medium text-neutral-900">{form.quoteNumber || "-"}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-neutral-500">日期</p>
                      <p className="font-ui mt-1 font-medium text-neutral-900">{formatPlainDate(form.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">聯絡人</p>
                      <p className="mt-1 font-medium text-neutral-900">{form.contactPerson || "-"}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#d8c7a5]/25 bg-white/88 p-5 shadow-[0_12px_30px_rgba(17,17,17,0.035)]">
                  <p className="mb-4 text-sm font-semibold text-neutral-900">品項摘要</p>
                  <div className="space-y-3">
                    {computedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-neutral-900">{item.name || "未命名品項"}</p>
                          <p className="font-ui mt-1 text-xs text-neutral-500">
                            數量 {toNumber(item.quantity)} / 單價 {formatCurrency(toNumber(item.price))}
                          </p>
                        </div>
                        <p className="font-ui text-sm font-semibold text-neutral-900">{formatCurrency(item.subtotal)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#d8c7a5]/25 bg-white/88 p-5 shadow-[0_12px_30px_rgba(17,17,17,0.035)]">
                  <p className="mb-3 text-sm font-semibold text-neutral-900">備註</p>
                  <p className="text-sm leading-7 text-neutral-600">
                    {form.notes || "可在此補充交付內容、付款條件或合作說明。"}
                  </p>
                </div>

                <div className="rounded-[28px] border border-[#d8c7a5]/35 bg-[linear-gradient(180deg,#ffffff_0%,#f2ede5_100%)] p-5 shadow-[0_16px_36px_rgba(109,102,94,0.09)]">
                  <p className="text-sm text-neutral-500">最終報價</p>
                  <p className="font-ui mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
                    {formatCurrency(totals.total)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={exportQuotePdf}
                  className="inline-flex w-full items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                >
                  匯出 PDF 報價單
                </button>
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
              <div key={title} className="rounded-[28px] border border-[#d8c7a5]/28 bg-white/74 p-5 shadow-[0_12px_30px_rgba(17,17,17,0.035)]">
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
