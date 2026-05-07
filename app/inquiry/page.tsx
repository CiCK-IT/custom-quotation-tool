"use client";

import BrandFooter from "@/components/brand-footer";
import SiteNav from "@/components/site-nav";
import { useState, type FormEvent, type ReactNode } from "react";

const projectTypeOptions = [
  "報價系統",
  "表單 / 留單工具",
  "商業流程工具",
  "管理後台介面",
  "作品集 / 形象頁",
  "其他客製需求",
];

const budgetOptions = [
  "1 萬以下",
  "1–3 萬",
  "3–5 萬",
  "5–10 萬",
  "10 萬以上",
  "先討論需求",
];

const timelineOptions = [
  "一週內",
  "兩週內",
  "一個月內",
  "一到三個月",
  "尚未確定",
];

const processSteps = [
  "初步需求確認",
  "功能範圍評估",
  "報價方向整理",
  "後續合作討論",
];

const inquiryFitNotes = [
  "需要把重複流程整理成可使用的工具。",
  "希望從作品集展示延伸到實際商業詢價。",
  "已有概念，但需要先釐清功能範圍與預算方向。",
];

const suitableNeeds = [
  {
    title: "報價 / 試算工具",
    description: "適合需要自動計算價格、整理品項與輸出報價摘要的服務流程。",
  },
  {
    title: "客戶需求填寫表",
    description: "適合收集客戶資料、專案條件、預算與聯絡資訊。",
  },
  {
    title: "接案詢價流程",
    description: "適合自由工作者、小型品牌、設計與顧問服務整理合作入口。",
  },
  {
    title: "小型管理介面",
    description: "適合把 Excel、表單、人工紀錄轉成更清楚的內部工具。",
  },
];

const cickReasons = [
  {
    title: "流程整理",
    description: "協助你把零散需求、表單欄位與報價邏輯整理成清楚的使用流程。",
  },
  {
    title: "介面質感",
    description: "不只追求功能完成，也重視畫面質感、品牌一致性與使用者體驗。",
  },
  {
    title: "可延伸應用",
    description: "從詢價頁、報價工具到資料儲存與 PDF 匯出，未來都能依需求逐步擴充。",
  },
];

const initialForm = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  projectType: projectTypeOptions[0],
  budget: budgetOptions[5],
  timeline: timelineOptions[4],
  notes: "",
};

type InquiryForm = typeof initialForm;
type InquiryField = keyof InquiryForm;

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

export default function InquiryPage() {
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key: InquiryField, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <SiteNav actionHref="/" actionLabel="返回首頁" />

        <section className="glass-panel fade-up overflow-hidden rounded-[36px] px-6 py-9 sm:px-8 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-white/70 bg-white/65 px-4 py-2 text-xs font-medium tracking-[0.22em] text-neutral-600 uppercase">
                客製需求填寫
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-4xl font-semibold leading-tight text-neutral-950 sm:text-5xl lg:text-6xl">
                  把你的流程，整理成更好用的數位工具
                </h1>
                <p className="max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
                  不只是製作表單，而是協助你整理需求、規劃流程，打造更適合報價、接案、服務與客戶溝通的客製工具。
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                >
                  預約客製報價
                </a>
                <a
                  href="#suitable-needs"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white/80 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:bg-white"
                >
                  查看適合需求
                </a>
              </div>

              <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/80 bg-white/65 p-4">
                  <p className="text-sm font-semibold text-neutral-950">商業合作詢價入口</p>
                  <p className="mt-2 text-sm leading-7 text-neutral-600">
                    聚焦專案需求、流程工具與客製開發方向，而不是一般聯絡表單。
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/80 bg-white/65 p-4">
                  <p className="text-sm font-semibold text-neutral-950">先整理，再討論</p>
                  <p className="mt-2 text-sm leading-7 text-neutral-600">
                    讓合作前的範圍、預算與時程先有清楚輪廓。
                  </p>
                </div>
              </div>
            </div>

            <aside className="soft-ring rounded-[32px] bg-neutral-950 p-5 text-white shadow-[0_24px_70px_rgba(17,17,17,0.2)] sm:p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow text-white/45">Process</p>
                  <p className="mt-2 text-xl font-semibold">合作流程</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">Demo</span>
              </div>
              <div className="space-y-3">
                {processSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-950">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-white/90">{step}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="suitable-needs" className="space-y-5">
          <div className="max-w-3xl">
            <p className="eyebrow mb-2 text-neutral-500">
              Use Cases
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              適合製作的需求
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600 sm:text-base">
              如果你的服務流程需要整理資料、計算金額或讓客戶更清楚填寫內容，都可以先從這些方向開始討論。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {suitableNeeds.map((need, index) => (
              <article
                key={need.title}
                className="soft-ring rounded-[28px] border border-white/80 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-[0_16px_40px_rgba(17,17,17,0.06)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f2ede5] text-sm font-semibold text-neutral-950">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-950">{need.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{need.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="inquiry-form" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <form onSubmit={handleSubmit} className="glass-panel rounded-[34px] p-6 sm:p-8">
            <div className="mb-7">
              <p className="eyebrow mb-2 text-neutral-500">
                Inquiry Form
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">填寫需求內容</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600">
                這份表單用來整理合作方向，方便後續評估功能範圍、開發時程與報價區間。
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="mb-5 text-lg font-semibold text-neutral-950">基本資訊</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="公司 / 客戶名稱">
                    <input
                      className="field"
                      name="companyName"
                      autoComplete="organization"
                      value={form.companyName}
                      onChange={(event) => updateField("companyName", event.target.value)}
                      placeholder="例如：OOO 設計公司"
                    />
                  </Field>
                  <Field label="聯絡人">
                    <input
                      className="field"
                      name="contactName"
                      autoComplete="name"
                      value={form.contactName}
                      onChange={(event) => updateField("contactName", event.target.value)}
                      placeholder="例如：陳小姐"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      className="field"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="hello@example.com"
                    />
                  </Field>
                  <Field label="電話 / LINE">
                    <input
                      className="field"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      placeholder="電話或 LINE ID"
                    />
                  </Field>
                </div>
              </div>

              <div>
                <h3 className="mb-5 text-lg font-semibold text-neutral-950">專案需求</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="需求類型">
                    <select
                      className="field appearance-none"
                      name="projectType"
                      value={form.projectType}
                      onChange={(event) => updateField("projectType", event.target.value)}
                    >
                      {projectTypeOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="預算區間">
                    <select
                      className="field appearance-none"
                      name="budget"
                      value={form.budget}
                      onChange={(event) => updateField("budget", event.target.value)}
                    >
                      {budgetOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="預計時程" className="sm:col-span-2">
                    <select
                      className="field appearance-none"
                      name="timeline"
                      value={form.timeline}
                      onChange={(event) => updateField("timeline", event.target.value)}
                    >
                      {timelineOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="補充需求" className="sm:col-span-2">
                    <textarea
                      className="field min-h-36 resize-none"
                      name="notes"
                      rows={5}
                      value={form.notes}
                      onChange={(event) => updateField("notes", event.target.value)}
                      placeholder="可以補充希望完成的功能、參考網站、目前遇到的流程問題，或希望報價時優先評估的項目。"
                    />
                  </Field>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-neutral-500">
                目前為作品集展示版本，送出後僅顯示前端提示，不會實際保存或寄送資料。
              </p>
              <button
                type="submit"
                className="inline-flex min-w-[8rem] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-neutral-950 px-7 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                送出需求
              </button>
            </div>

            {submitted ? (
              <div
                aria-live="polite"
                className="mt-6 rounded-[24px] border border-[#d8c7a5]/70 bg-[#f2ede5]/80 px-5 py-4 text-sm leading-7 text-neutral-800"
              >
                需求已送出，感謝你的填寫。這是作品集 demo 版本，未來可串接 Email、Google Sheet 或 Supabase 收集資料。
              </div>
            ) : null}
          </form>

          <aside className="space-y-6 lg:sticky lg:top-6">
            <div className="glass-panel rounded-[34px] p-6 sm:p-8">
              <p className="eyebrow mb-2 text-neutral-500">
                Summary
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">需求摘要</h2>
              <div className="mt-6 space-y-4">
                {[
                  ["需求類型", form.projectType],
                  ["預算區間", form.budget],
                  ["預計時程", form.timeline],
                  ["聯絡方式", form.email || form.phone || "尚未填寫"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[22px] border border-white/80 bg-white/70 px-4 py-3"
                  >
                    <p className="text-xs font-medium text-neutral-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-neutral-950">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-ring rounded-[30px] bg-[#171717] p-6 text-white shadow-[0_18px_45px_rgba(17,17,17,0.14)]">
              <p className="text-lg font-semibold">不知道怎麼描述需求也沒關係</p>
              <p className="mt-4 text-sm leading-7 text-white/70">
                你可以先簡單描述目前遇到的流程問題，例如報價太慢、資料分散、客戶填寫不完整，後續再一起整理成適合製作的工具方向。
              </p>
            </div>

            <div className="soft-ring rounded-[30px] bg-white/70 p-6">
              <p className="text-lg font-semibold text-neutral-950">適合討論的內容</p>
              <div className="mt-4 space-y-3">
                {inquiryFitNotes.map((note) => (
                  <p
                    key={note}
                    className="rounded-[20px] border border-white/80 bg-white/65 px-4 py-3 text-sm leading-7 text-neutral-600"
                  >
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl">
            <p className="eyebrow mb-2 text-neutral-500">
              Why cick tools
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              為什麼選擇 cick tools？
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600 sm:text-base">
              以客製商業工具為核心，讓需求整理、介面呈現與後續擴充都維持清楚而有質感。
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {cickReasons.map((reason) => (
              <article
                key={reason.title}
                className="soft-ring rounded-[28px] border border-white/80 bg-white/70 p-6"
              >
                <p className="text-lg font-semibold text-neutral-950">{reason.title}</p>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{reason.description}</p>
              </article>
            ))}
          </div>
        </section>

        <BrandFooter />
      </div>
    </main>
  );
}
