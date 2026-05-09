export const demoAdminPassword = "CickTools2026!";
export const adminAuthCookieName = "cick_admin_auth";

export const getAdminPassword = () => process.env.ADMIN_PASSWORD || demoAdminPassword;

export const createAdminToken = async (password: string) => {
  const data = new TextEncoder().encode(`cick-tools-admin:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};
