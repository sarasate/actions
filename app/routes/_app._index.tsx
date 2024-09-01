import { authenticator } from "~/services/auth.server";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { requireUserId } from "../utils/auth.server";
import { prisma } from "../utils/prisma.server";
import { LucideCheck, LucideTrash } from "lucide-react";
import { useEffect, useRef } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Action Tools" },
    { name: "description", content: "Welcome to Action Tools!" },
  ];
};

export const loader = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const actions = await prisma.action.findMany({
    where: { createdById: userId, status: { not: "DONE" } },
    orderBy: { priority: "asc" },
  });

  return json({ actions });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireUserId(request);

  const form = await request.formData();
  const status = form.get("status");
  const actionId = form.get("actionId");
  if (typeof status !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  await prisma.action.update({
    where: {
      id: actionId,
    },
    data: {
      status: "DONE",
    },
  });

  return json({ action });
};

export default function Index() {
  const { actions } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const $form = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();

  // Reset form
  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === "idle") {
        $form.current?.reset();
      }
    },
    [navigation.state]
  );

  return (
    <div className="container mx-auto">
      {/* <input
        type="checkbox"
        value="light"
        className="toggle theme-controller"
      /> */}
      <Form
        method="post"
        action="/actions/create"
        className="space-y-4 mb-8"
        ref={$form}
      >
        <input
          type="text"
          name="action"
          className="input input-bordered"
          placeholder="New Action..."
        />
      </Form>

      <div>
        <h2 className="text-lg font-semibold mb-4">Actions</h2>
        <div className="flex flex-col gap-4">
          {actions.map((action) => (
            <div key={action.id}>
              <div className="flex items-center gap-4">
                <div className="flex-1">{action.title}</div>
                <div>Priority: {action.priority}</div>
                <div>Effort: {action.effort}</div>
                <div>
                  <fetcher.Form method="post">
                    <input type="hidden" name="actionId" value={action.id} />
                    <button name="status" value="DONE">
                      <LucideCheck />
                    </button>
                  </fetcher.Form>
                </div>
                <div className="badge badge-neutral">{action.status}</div>
                <div>
                  <fetcher.Form method="post" action="/actions/delete">
                    <button name="delete" value={action.id}>
                      <LucideTrash />
                    </button>
                  </fetcher.Form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
