import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

import bcrypt from "bcrypt";
import { SECRET_LOGIN_HASH } from "$env/static/private";

export const actions: Actions = {
  default: async ({ request, cookies }) => {    
    const formData = await request.formData();
    const password = formData.get("password")?.toString();
    if (password === undefined) return fail(400, {error: "Null password entered"});    
    const result = await bcrypt.compare(password, SECRET_LOGIN_HASH);    
    if (result) {
      // Password is correct, navigate to the main page
      cookies.set("sessionId", "userId", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        path: "/",
        maxAge: 60 * 60,
      });
      redirect(301, "/");
    }

    return fail(400, { error: "Invalid login or password" });
  },
};
