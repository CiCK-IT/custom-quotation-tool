"use client";

import BrandFooter from "@/components/brand-footer";
import SiteNav from "@/components/site-nav";
import { useEffect, useMemo, useState } from "react";

const inquiryStorageKey = "cick-tools-inquiries";

const statusOptions = ["新需求", "已聯絡", "報價中", "已完成", "已封存"] as const;
const statusFilterOptions = ["全部", ...statusOptions] as const;
const typeFilterOptions = [
  "全部",
  "報價系統",
  "表單 / 留單工具",
  "商業流程工具",
  "管理後台介面",
  "作品集 / 形象頁",
  "其他客製需求",
] as const;

type InquiryStatus = (typeof statusOptions)[number];
type StatusFilter = (typeof statusFilterOptions)[number];
type TypeFilter = (typeof typeFilterOptions)[number];

type InquiryRecord = {
  id: string;
  submittedAt: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  notes: string;
  status: InquiryStatus;
  internalNote: string;
};

const demoInquiries: InquiryRecord[] = [
  {
    id: "demo-001",
    submittedAt: "2026-05-09T09:30:00.000Z",
    companyName: "OOO 設計公司",
    contactName: "陳小姐",
    email: "hello@example.com",
    phone: "LINE: cick-demo",
    projectType: "報價系統",
    budget: "5–10 萬",
    timeline: "一個月內",
    notes: "希望把目前人工整理報價的流程改成線上工具，可依品項自動計算價格並產出摘要。",
    status: "新需求",
    internalNote: "適合先回覆需求盤點問題，確認是否需要 PDF 匯出。",
  },
  {
    id: "demo-002",
    submittedAt: "2026-05-08T14:12:00.000Z",
    companyName: "OOO 顧問工作室",
    contactName: "林先生",
    email: "service@example.com",
    phone: "0912-000-000",
    projectType: "表單 / 留單工具",
    budget: "3–5 萬",
    timeline: "兩週內",
    notes: "想建立一個合作詢價入口，讓客戶填寫專案需求、預算與聯絡方式。",
    status: "報價中",
    internalNote: "已整理初步頁面架構，可補一份功能範圍估價。",
  },
  {
    id: "demo-003",
    submittedAt: "2026-05-07T03:45:00.000Z",
    companyName: "OOO 品牌企劃",
    contactName: "王小姐",
    email: "brand@example.com",
    phone: "LINE: brand-demo",
    projectType: "小型管理介面",
    budget: "10 萬以上",
    timeline: "一到三個月",
    notes: "目前使用 Excel 管理案件狀態，希望改成可搜尋、可篩選的內部管理工具。",
    status: "已完成",
    internalNote: "需求完整，適合作為後台管理介面案例。",
  },
];

const statusStyles: Record<InquiryStatus, string> = {
  新需求: "bg-[#f2ede5] text-neutral-900 border-[#d8c7a5]/60",
  已聯絡: "bg-white text-neutral-700 border-neutral-200",
  報價中: "bg-neutral-950 text-white border-neutral-950",
  已完成: "bg-[#e8eee7] text-[#31523b] border-[#b9c9b8]",
  已封存: "bg-neutral-100 text-neutral-500 border-neutral-200",
};

const normalizeStatus = (status: unknown): InquiryStatus =>
  statusOptions.includes(status as InquiryStatus) ? (status as InquiryStatus) : "新需求";

const formatSubmittedAt = (value: string) => {
  const isoParts = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);

  if (isoParts) {
    return `${isoParts[1]}/${isoParts[2]}/${isoParts[3]} ${isoParts[4]}:${isoParts[5]}`;
  }

  return value || "尚未紀錄";
};

const normalizeInquiry = (record: Partial<InquiryRecord>, index: number): InquiryRecord => ({
  id: record.id || `inquiry-${index}-${Date.now()}`,
  submittedAt: record.submittedAt || new Date().toISOString(),
  companyName: record.companyName || "未填寫客戶名稱",
  contactName: record.contactName || "未填寫",
  email: record.email || "",
  phone: record.phone || "",
  projectType: record.projectType || "其他客製需求",
  budget: record.budget || "先討論需求",
  timeline: record.timeline || "尚未確定",
  notes: record.notes || "尚未填寫補充需求。",
  status: normalizeStatus(record.status),
  internalNote: record.internalNote || "",
});

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(demoInquiries);
  const [selectedId, setSelectedId] = useState(demoInquiries[0]?.id ?? "");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("全部");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("全部");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(inquiryStorageKey);
      const parsed = stored ? JSON.parse(stored) : null;
      const records = Array.isArray(parsed)
        ? parsed.map((item, index) => normalizeInquiry(item, index))
        : [];

      if (records.length > 0) {
        setInquiries(records);
        setSelectedId(records[0].id);
      }
    } catch {
      setInquiries(demoInquiries);
      setSelectedId(demoInquiries[0]?.id ?? "");
    }
  }, []);

  const saveInquiries = (next: InquiryRecord[]) => {
    setInquiries(next);
    window.localStorage.setItem(inquiryStorageKey, JSON.stringify(next));
  };

  const filteredInquiries = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const matchesKeyword =
        keyword.length === 0 ||
        [inquiry.companyName, inquiry.contactName, inquiry.email]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      const matchesStatus = statusFilter === "全部" || inquiry.status === statusFilter;
      const matchesType = typeFilter === "全部" || inquiry.projectType === typeFilter;

      return matchesKeyword && matchesStatus && matchesType;
    });
  }, [inquiries, searchTerm, statusFilter, typeFilter]);

  const selectedInquiry =
    inquiries.find((inquiry) => inquiry.id === selectedId) || filteredInquiries[0] || inquiries[0];

  const stats = useMemo(
    () => [
      { label: "總需求數", value: inquiries.length },
      { label: "新需求", value: inquiries.filter((inquiry) => inquiry.status === "新需求").length },
      { label: "報價中", value: inquiries.filter((inquiry) => inquiry.status === "報價中").length },
      { label: "已完成", value: inquiries.filter((inquiry) => inquiry.status === "已完成").length },
    ],
    [inquiries]
  );

  const updateInquiry = (id: string, updates: Partial<InquiryRecord>) => {
    const next = inquiries.map((inquiry) =>
      inquiry.id === id ? { ...inquiry, ...updates } : inquiry
    );
    saveInquiries(next);
  };

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:gap-8 sm:px-6 lg:px-8 lg:py-8">
        <SiteNav
          brandLabel="需求管理中心"
          actionHref="/"
          actionLabel="返回首頁"
          secondaryActionHref="/inquiry"
          secondaryActionLabel="查看詢價頁"
        />

        <section className="glass-panel fade-up overflow-hidden rounded-[36px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <p className="eyebrow text-neutral-600">Admin Demo</p>
              <div className="space-y-3">
                <h1 className="font-display hero-title text-4xl text-neutral-950 sm:text-5xl">
                  需求管理中心
                </h1>
                <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:leading-8">
                  集中查看客戶詢價、追蹤狀態與整理內部備註，作為客製商業工具的 demo 管理端。
                </p>
              </div>
            </div>
            <div className="rounded-[28px] border border-[#d8c7a5]/30 bg-white/72 p-4 shadow-[0_12px_30px_rgba(17,17,17,0.035)]">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Demo Storage
              </p>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                目前資料儲存在本機瀏覽器 localStorage。沒有送出資料時會顯示 demo 假資料，方便審核完整流程。
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
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {stat.label}
              </p>
              <p className="font-ui mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
                {stat.value}
              </p>
            </article>
          ))}
        </section>

        <section className="glass-panel rounded-[34px] p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.7fr_0.7fr]">
            <label>
              <span className="label">搜尋客戶名稱 / 聯絡人 / Email</span>
              <input
                className="field"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="輸入關鍵字"
              />
            </label>
            <label>
              <span className="label">狀態篩選</span>
              <select
                className="field appearance-none"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              >
                {statusFilterOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">需求類型</span>
              <select
                className="field appearance-none"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value as TypeFilter)}
              >
                {typeFilterOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="glass-panel rounded-[34px] p-5 sm:p-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-2 text-neutral-500">Requests</p>
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">需求列表</h2>
              </div>
              <p className="font-ui text-sm text-neutral-500">{filteredInquiries.length} 筆</p>
            </div>

            <div className="space-y-3">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <article
                    key={inquiry.id}
                    className={`rounded-[28px] border p-4 transition ${
                      selectedInquiry?.id === inquiry.id
                        ? "border-[#d8c7a5]/70 bg-[#f8f4ec]"
                        : "border-[#d8c7a5]/24 bg-white/76 hover:bg-white/90"
                    }`}
                  >
                    <div className="grid gap-4 xl:grid-cols-[1fr_1fr_auto] xl:items-center">
                      <div>
                        <p className="font-ui text-xs font-medium tracking-[0.12em] text-neutral-500">
                          {formatSubmittedAt(inquiry.submittedAt)}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-neutral-950">
                          {inquiry.companyName}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-600">
                          {inquiry.contactName} / {inquiry.email || "未填 Email"}
                        </p>
                      </div>
                      <div className="grid gap-2 text-sm text-neutral-600 sm:grid-cols-3 xl:grid-cols-1">
                        <span>{inquiry.projectType}</span>
                        <span>{inquiry.budget}</span>
                        <span>{inquiry.timeline}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[inquiry.status]}`}
                        >
                          {inquiry.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedId(inquiry.id)}
                          className="rounded-full border border-neutral-300 bg-white/90 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-white"
                        >
                          查看詳情
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-[28px] border border-[#d8c7a5]/30 bg-white/72 p-6 text-sm leading-7 text-neutral-600">
                  目前沒有符合條件的需求。可以調整搜尋或篩選條件。
                </div>
              )}
            </div>
          </div>

          <aside className="glass-panel rounded-[34px] p-5 sm:p-6 lg:sticky lg:top-6">
            {selectedInquiry ? (
              <div className="space-y-6">
                <div>
                  <p className="eyebrow mb-2 text-neutral-500">Detail</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">需求詳情</h2>
                  <p className="mt-2 text-sm leading-7 text-neutral-600">
                    {selectedInquiry.companyName} / {formatSubmittedAt(selectedInquiry.submittedAt)}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["客戶名稱", selectedInquiry.companyName],
                    ["聯絡人", selectedInquiry.contactName],
                    ["Email", selectedInquiry.email || "未填寫"],
                    ["電話 / LINE", selectedInquiry.phone || "未填寫"],
                    ["需求類型", selectedInquiry.projectType],
                    ["預算區間", selectedInquiry.budget],
                    ["預計時程", selectedInquiry.timeline],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[22px] border border-[#d8c7a5]/25 bg-white/74 p-4">
                      <p className="font-ui text-xs font-medium tracking-[0.12em] text-neutral-500">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-neutral-950">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[24px] border border-[#d8c7a5]/25 bg-white/74 p-4">
                  <p className="font-ui text-xs font-medium tracking-[0.12em] text-neutral-500">補充需求</p>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">{selectedInquiry.notes}</p>
                </div>

                <label>
                  <span className="label">狀態</span>
                  <select
                    className="field appearance-none"
                    value={selectedInquiry.status}
                    onChange={(event) =>
                      updateInquiry(selectedInquiry.id, {
                        status: event.target.value as InquiryStatus,
                      })
                    }
                  >
                    {statusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="label">內部備註</span>
                  <textarea
                    className="field min-h-32 resize-none"
                    value={selectedInquiry.internalNote}
                    onChange={(event) =>
                      updateInquiry(selectedInquiry.id, {
                        internalNote: event.target.value,
                      })
                    }
                    placeholder="記錄聯絡進度、報價方向或待確認事項"
                  />
                </label>
              </div>
            ) : null}
          </aside>
        </section>

        <BrandFooter />
      </div>
    </main>
  );
}
