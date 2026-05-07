export default function BrandFooter() {
  return (
    <footer className="glass-panel rounded-[32px] px-6 py-6 sm:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow mb-2 text-neutral-500">
            cick tools
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-neutral-950">關於 cick tools</h2>
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            cick tools 專注於打造高質感、實用且可延伸的客製化商業工具。希望每一個工具不只是能完成任務，也能讓流程更清楚、溝通更有效率，並呈現更好的品牌體驗。
          </p>
        </div>
        <p className="text-sm font-medium text-neutral-500">Designed & built by cick tools.</p>
      </div>
    </footer>
  );
}
