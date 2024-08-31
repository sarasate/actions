import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { requireUserId } from "../utils/auth.server";
import { prisma } from "../utils/prisma.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireUserId(request);

  const form = await request.formData();
  const actionId = form.get("delete");
  if (typeof actionId !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  await prisma.action.delete({
    where: {
      id: actionId,
    },
  });

  return redirect("/");
};
