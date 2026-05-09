import { cookies } from "next/headers";
import { adminAuthCookieName, createAdminToken, getAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";
    const expectedPassword = getAdminPassword();

    if (password !== expectedPassword) {
      return Response.json({ ok: false }, { status: 401 });
    }

    const cookieStore = await cookies();
    const token = await createAdminToken(expectedPassword);

    cookieStore.set(adminAuthCookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();

  cookieStore.set(adminAuthCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return Response.json({ ok: true });
}
