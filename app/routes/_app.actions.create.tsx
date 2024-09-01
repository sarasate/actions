import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { requireUserId } from "../utils/auth.server";
import { prisma } from "../utils/prisma.server";
import { processAction } from "../utils/anthropic";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const actionTitle = form.get("action");
  if (typeof actionTitle !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  // Create new action
  const action = await prisma.action.create({
    data: {
      title: actionTitle,
      createdBy: { connect: { id: userId } },
      status: "TODO",
      priority: 0,
    },
  });

  // Process action with Anthropic
  const result = processAction(action.title);

  result.then(async (msg) => {
    const jsonResult = JSON.parse(msg?.content[0]?.text);

    if (!jsonResult) {
      return json(
        { error: "Invalid response from Anthropic" },
        { status: 500 }
      );
    }

    // Update action with the result from Anthropic
    const update = await prisma.action.update({
      where: { id: action.id },
      data: {
        priority: jsonResult.priority,
        // dueDate: jsonResult.dueDate,
        effort: jsonResult.effort,
      },
    });
    console.log(update);
  });

  return redirect("/");
};
