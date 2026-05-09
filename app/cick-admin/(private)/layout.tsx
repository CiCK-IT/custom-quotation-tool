import { adminAuthCookieName, createAdminToken, getAdminPassword } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function PrivateAdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const currentToken = cookieStore.get(adminAuthCookieName)?.value;
  const expectedToken = await createAdminToken(getAdminPassword());

  if (currentToken !== expectedToken) {
    redirect("/cick-admin/login");
  }

  return children;
}
