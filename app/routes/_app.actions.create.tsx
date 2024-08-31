import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { requireUserId } from "../utils/auth.server";
import { prisma } from "../utils/prisma.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const action = form.get("action");
  if (typeof action !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  await prisma.action.create({
    data: {
      title: action,
      createdBy: { connect: { id: userId } },
      status: "TODO",
      priority: 0,
    },
  });

  return redirect("/");
};
