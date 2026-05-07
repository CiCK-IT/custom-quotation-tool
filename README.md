# 客製化報價單生成器

這是一個使用 `Next.js + React + Tailwind CSS` 製作的高質感報價單生成器 demo，適合放入個人作品集，也可作為商業工具展示原型。

## 功能

- 基本資料輸入：客戶名稱、報價單編號、日期、聯絡人、備註
- 多筆品項管理：可新增與刪除品項
- 自動計算：單價 x 數量、小計、折扣、稅額與總金額
- 即時預覽：同步顯示整理後的報價摘要
- 響應式設計：桌面與手機皆可使用

## 啟動方式

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 即可查看。

## 技術配置

- `Next.js` App Router
- `React`
- `Tailwind CSS` v4 PostCSS 設定

## 專案結構

```text
app/
  layout.jsx
  page.jsx
  globals.css
components/
  quote-generator.jsx
```
