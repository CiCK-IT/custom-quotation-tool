import "./globals.css";
import { Manrope, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

const notoSerifTc = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-noto-serif-tc",
  display: "swap",
});

export const metadata = {
  title: "客製化報價單生成器",
  description: "高質感、現代感的客製化報價單生成器作品展示頁。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className={`${manrope.variable} ${notoSansTc.variable} ${notoSerifTc.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
