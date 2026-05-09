"use client";

export default function AdminAuthGate({ children }) {
  const logout = async () => {
    try {
      await fetch("/api/admin-auth", { method: "DELETE" });
    } finally {
      window.sessionStorage.removeItem("cick-admin-authenticated");
      window.location.href = "/cick-admin/login";
    }
  };

  return (
    <>
      {children}
      <button
        type="button"
        onClick={logout}
        className="fixed bottom-5 right-5 z-50 rounded-full border border-[#d8c7a5]/45 bg-white/92 px-4 py-2.5 text-sm font-medium text-neutral-800 shadow-[0_14px_34px_rgba(17,17,17,0.12)] backdrop-blur transition hover:bg-white"
      >
        登出後台
      </button>
    </>
  );
}
