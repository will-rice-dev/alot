import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    console.log("Made it to actions");

    const formData = await request.formData();
    const password = formData.get("password");
    const response = await fetch("http://127.0.0.1:3000/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    console.log(response);
    if (response.status === 200) {
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
