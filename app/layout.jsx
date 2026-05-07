import "./globals.css";
import { Manrope, Noto_Sans_TC } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

export const metadata = {
  title: "客製化報價單生成器",
  description: "高質感、現代感的客製化報價單生成器作品展示頁。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className={`${manrope.variable} ${notoSansTc.variable}`}>{children}</body>
    </html>
  );
}
