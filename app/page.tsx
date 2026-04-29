'use client'

import { useMemo, useState } from 'react'

type QuoteItem = {
  id: string
  name: string
  price: number
  quantity: number
}

const today = new Date().toISOString().split('T')[0]

const initialItems: QuoteItem[] = [
  { id: crypto.randomUUID(), name: '室內設計諮詢', price: 3000, quantity: 1 },
  { id: crypto.randomUUID(), name: '系統櫃規劃', price: 18000, quantity: 1 },
  { id: crypto.randomUUID(), name: '燈具安裝', price: 2500, quantity: 2 },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)
}

function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-stone-900">{title}</h2>
        {description ? <p className="mt-1 text-sm text-stone-500">{description}</p> : null}
      </div>
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-3xl border border-stone-200/90 bg-white/90 p-5 shadow-[0_14px_40px_rgba(120,93,69,0.08)] backdrop-blur ${className}`}
    >
      {children}
    </section>
  )
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-stone-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100/80"
      />
    </label>
  )
}

export default function QuoteGeneratorPage() {
  const [clientName, setClientName] = useState('室內設計')
  const [quoteNumber, setQuoteNumber] = useState('QT-2026-001')
  const [quoteDate, setQuoteDate] = useState(today)
  const [contactPerson, setContactPerson] = useState('蔡小姐')
  const [note, setNote] = useState('本報價單自開立日起 14 日內有效，實際金額依現場需求微調。')
  const [discount, setDiscount] = useState(0)
  const [taxRate, setTaxRate] = useState(5)
  const [items, setItems] = useState<QuoteItem[]>(initialItems)

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const discountAmount = useMemo(() => Math.max(0, discount), [discount])
  const taxableAmount = useMemo(() => Math.max(0, subtotal - discountAmount), [subtotal, discountAmount])
  const taxAmount = useMemo(() => Math.round(taxableAmount * (Math.max(0, taxRate) / 100)), [taxableAmount, taxRate])
  const total = useMemo(() => taxableAmount + taxAmount, [taxableAmount, taxAmount])

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: '',
        price: 0,
        quantity: 1,
      },
    ])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, key: keyof QuoteItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item

        if (key === 'price' || key === 'quantity') {
          return { ...item, [key]: Math.max(0, Number(value) || 0) }
        }

        return { ...item, [key]: value }
      }),
    )
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,228,210,0.8),_transparent_35%),linear-gradient(to_bottom,_#fcfaf7,_#f5efe8)] text-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="grid items-center gap-8 rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-[0_24px_90px_rgba(120,93,69,0.10)] backdrop-blur-xl sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <div className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 shadow-sm">
              商業工具作品展示・客製化報價流程
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-stone-950 sm:text-5xl">
              客製化報價單生成器
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
              以現代化介面整理報價流程，快速建立報價內容、即時計算金額，並同步預覽輸出摘要，適合作為作品集展示與商業工具 demo。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:translate-y-[-1px] hover:bg-stone-800">
                立即體驗工具
              </button>
              <button className="rounded-full border border-stone-300 bg-[#fbf7f2] px-5 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-[#f6eee5]">
                查看報價預覽
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['減少手動錯誤', '自動計算小計、折扣、稅額與總金額'],
                ['提升溝通效率', '快速整理客戶資訊與品項內容'],
                ['適合商業展示', '可延伸成實際報價流程工具'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-stone-200 bg-white/85 p-4 shadow-[0_8px_24px_rgba(120,93,69,0.05)]">
                  <p className="text-sm font-semibold text-stone-900">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-[#ead8c8]/60 blur-3xl sm:block" />
            <div className="absolute -bottom-4 right-0 hidden h-28 w-28 rounded-full bg-[#dcc4af]/60 blur-3xl sm:block" />

            <div className="relative rounded-[2rem] border border-stone-200/80 bg-[#fffdfa] p-4 shadow-[0_16px_60px_rgba(120,93,69,0.12)] sm:p-5">
              <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <p className="text-sm font-semibold text-stone-900">工具預覽</p>
                  <p className="mt-1 text-xs text-stone-500">即時摘要與金額狀態</p>
                </div>
                <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  即時計算中
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl bg-[#f8f2ec] p-4">
                  <div className="flex items-center justify-between text-sm text-stone-500">
                    <span>報價單編號</span>
                    <span className="font-medium text-stone-900">{quoteNumber}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-stone-500">
                    <span>客戶名稱</span>
                    <span className="font-medium text-stone-900">{clientName}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-stone-900 p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-300">Total Amount</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">{formatCurrency(total)}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-stone-300">
                    <div className="rounded-xl bg-white/10 p-3">
                      <p>小計</p>
                      <p className="mt-1 text-sm font-medium text-white">{formatCurrency(subtotal)}</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-3">
                      <p>折扣</p>
                      <p className="mt-1 text-sm font-medium text-white">{formatCurrency(discountAmount)}</p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-3">
                      <p>稅額</p>
                      <p className="mt-1 text-sm font-medium text-white">{formatCurrency(taxAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 p-4">
                  <p className="text-sm font-semibold text-stone-900">流程優勢</p>
                  <ul className="mt-3 space-y-2 text-sm text-stone-600">
                    <li>• 多品項報價整理更直覺</li>
                    <li>• 金額與稅額即時更新</li>
                    <li>• 適合設計、接案、工程、顧問服務</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Card>
              <SectionTitle title="基本資料" description="填寫報價對象與聯絡資訊，建立完整報價內容。" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="客戶名稱" value={clientName} onChange={setClientName} placeholder="請輸入客戶名稱" />
                <Input label="報價單編號" value={quoteNumber} onChange={setQuoteNumber} placeholder="例如 QT-2026-001" />
                <Input label="日期" value={quoteDate} onChange={setQuoteDate} type="date" />
                <Input label="聯絡人" value={contactPerson} onChange={setContactPerson} placeholder="請輸入聯絡人" />
              </div>
              <div className="mt-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-stone-700">備註</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder="輸入報價備註、合作條件或有效期限"
                    className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100/80"
                  />
                </label>
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-stone-900">品項清單</h2>
                  <p className="mt-1 text-sm text-stone-500">可新增多筆品項，系統會自動計算各項小計。</p>
                </div>
                <button
                  onClick={addItem}
                  className="rounded-full border border-stone-300 bg-[#fbf7f2] px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-[#f6eee5]"
                >
                  ＋ 新增品項
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => {
                  const lineTotal = item.price * item.quantity

                  return (
                    <div key={item.id} className="rounded-3xl border border-stone-200 bg-[#fcf8f4] p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold text-stone-900">品項 {index + 1}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className="text-sm text-stone-400 transition hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          刪除
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-[1.4fr_0.8fr_0.7fr_0.8fr]">
                        <Input
                          label="品項名稱"
                          value={item.name}
                          onChange={(value) => updateItem(item.id, 'name', value)}
                          placeholder="請輸入品項名稱"
                        />
                        <Input
                          label="單價"
                          type="number"
                          value={item.price}
                          onChange={(value) => updateItem(item.id, 'price', value)}
                          placeholder="0"
                        />
                        <Input
                          label="數量"
                          type="number"
                          value={item.quantity}
                          onChange={(value) => updateItem(item.id, 'quantity', value)}
                          placeholder="1"
                        />
                        <div>
                          <span className="mb-2 block text-sm font-medium text-stone-700">小計</span>
                          <div className="flex h-[50px] items-center rounded-2xl border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-900">
                            {formatCurrency(lineTotal)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6">
              <SectionTitle title="金額摘要" description="折扣與稅額調整後，即時計算最終總金額。" />

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="折扣金額"
                    type="number"
                    value={discount}
                    onChange={(value) => setDiscount(Math.max(0, Number(value) || 0))}
                    placeholder="0"
                  />
                  <Input
                    label="稅額 (%)"
                    type="number"
                    value={taxRate}
                    onChange={(value) => setTaxRate(Math.max(0, Number(value) || 0))}
                    placeholder="5"
                  />
                </div>

                <div className="rounded-3xl bg-[#f8f2ec] p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between text-stone-600">
                      <span>小計</span>
                      <span className="font-medium text-stone-900">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-600">
                      <span>折扣</span>
                      <span className="font-medium text-stone-900">-{formatCurrency(discountAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-600">
                      <span>稅額</span>
                      <span className="font-medium text-stone-900">{formatCurrency(taxAmount)}</span>
                    </div>
                    <div className="h-px bg-stone-200" />
                    <div className="flex items-center justify-between text-base font-semibold text-stone-950">
                      <span>總金額</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle title="報價預覽" description="即時整理主要資訊，方便快速確認與展示。" />
              <div className="rounded-[1.75rem] border border-stone-200 bg-[#fffdfa] p-5">
                <div className="flex flex-col gap-4 border-b border-stone-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Quotation Preview</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">{clientName || '未填寫客戶名稱'}</h3>
                  </div>
                  <div className="space-y-1 text-sm text-stone-500">
                    <p>編號：{quoteNumber || '—'}</p>
                    <p>日期：{quoteDate || '—'}</p>
                    <p>聯絡人：{contactPerson || '—'}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8f2ec] px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium text-stone-900">{index + 1}. {item.name || '未命名品項'}</p>
                        <p className="mt-1 text-stone-500">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-stone-900">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-stone-900 p-5 text-white">
                  <div className="flex items-center justify-between text-sm text-stone-300">
                    <span>最終總金額</span>
                    <span className="text-xl font-semibold text-white">{formatCurrency(total)}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-300">{note || '尚未填寫備註。'}</p>
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle title="工具價值" description="不只是畫面好看，也要能說明它為什麼值得被採用。" />
              <div className="grid gap-4">
                {[
                  {
                    title: '減少錯誤',
                    desc: '自動計算小計、折扣與稅額，降低人工輸入或手算失誤。',
                  },
                  {
                    title: '提升效率',
                    desc: '報價資訊集中管理，方便業務、設計、工程或顧問服務快速整理內容。',
                  },
                  {
                    title: '符合流程',
                    desc: '可延伸整合 PDF 匯出、列印、客戶簽核與 CRM 流程，具備商業落地潛力。',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-stone-200 bg-[#fcf8f4] p-4">
                    <h3 className="text-sm font-semibold text-stone-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}