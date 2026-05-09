export default function BrandFooter() {
  return (
    <footer className="glass-panel brand-footer-panel overflow-hidden rounded-[34px] px-5 py-6 sm:px-8 sm:py-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl border-l border-[#d8c7a5]/70 pl-4 sm:pl-5">
          <p className="eyebrow mb-2 text-neutral-500">
            cick tools
          </p>
          <h2 className="font-display max-w-xl text-2xl text-neutral-950 sm:text-3xl">關於 cick tools</h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-7 text-neutral-600 sm:mt-3">
            cick tools 專注於打造高質感、實用且可延伸的客製化商業工具。希望每一個工具不只是能完成任務，也能讓流程更清楚、溝通更有效率，並呈現更好的品牌體驗。
          </p>
        </div>
        <p className="font-ui w-fit rounded-full border border-neutral-200/80 bg-white/60 px-3.5 py-2 text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase sm:px-4 sm:tracking-[0.16em]">
          Designed & built by cick tools.
        </p>
      </div>
    </footer>
  );
}
