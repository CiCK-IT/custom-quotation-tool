"use client";

import SiteNav from "@/components/site-nav";
import { useEffect, useState, type FormEvent } from "react";

export default function CickAdminLoginPage() {
  const [password, setPassword] = useState("");
  const [nextPath, setNextPath] = useState("/cick-admin");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");

    if (next?.startsWith("/cick-admin")) {
      setNextPath(next);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setMessage("密碼不正確，請再確認一次。");
        setIsSubmitting(false);
        return;
      }

      window.location.href = nextPath;
    } catch {
      setMessage("目前無法驗證密碼，請稍後再試。");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:gap-8 sm:px-6 lg:px-8 lg:py-8">
        <SiteNav brandLabel="後台登入" actionHref="/" actionLabel="返回首頁" />

        <section className="flex flex-1 items-center justify-center py-10">
          <form
            onSubmit={handleSubmit}
            className="glass-panel w-full max-w-md rounded-[34px] p-6 shadow-[0_24px_70px_rgba(17,17,17,0.09)] sm:p-8"
          >
            <p className="eyebrow mb-3 text-neutral-500">Private Admin</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              cick tools 後台登入
            </h1>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              請輸入後台密碼以查看管理中心與合作詢問資料。公開展示頁不受影響。
            </p>

            <label className="mt-7 block">
              <span className="label">後台密碼</span>
              <input
                className="field"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="輸入 ADMIN_PASSWORD"
                autoComplete="current-password"
              />
            </label>

            {message ? (
              <p className="mt-4 rounded-2xl border border-[#d8c7a5]/40 bg-[#f8f4ec]/70 px-4 py-3 text-sm leading-6 text-neutral-700">
                {message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isSubmitting ? "驗證中..." : "登入後台"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
