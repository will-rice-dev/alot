import { redirect, type Handle } from "@sveltejs/kit";

const unProtectedRoutes = ["/login"];

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("sessionId");
  if (!sessionId && !unProtectedRoutes.includes(event.url.pathname)) {
    throw redirect(303, "/login");
  }
  return resolve(event);
};
