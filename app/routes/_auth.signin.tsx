import { useState } from "react";
import { FormField } from "../components/form-fields";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators.server";
import { login, register } from "../utils/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let name = form.get("name");

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: "Invalid Form Data", form: action }, { status: 400 });
  }

  if (action === "register" && typeof name !== "string") {
    return json({ error: "Invalid Form Data", form: action }, { status: 400 });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          name: validateName((name as string) || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { email, password, name },
        form: action,
      },
      { status: 400 }
    );

  switch (action) {
    case "login": {
      return await login({ email, password });
    }
    case "register": {
      name = name as string;
      return await register({ email, password, name });
    }
    default:
      return json({ error: "Invalid Form Data" }, { status: 400 });
  }
};

export default function Signin() {
  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // Updates the form data when an input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };
  return (
    <div className="h-full justify-center items-center flex flex-col gap-y-4">
      <button
        onClick={() => setAction(action == "login" ? "register" : "login")}
        className="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
      >
        {action === "login" ? "Sign Up" : "Sign In"}
      </button>
      <h2 className="text-5xl font-extrabold">Welcome</h2>

      <Form
        method="post"
        className="rounded-2xl bg-gray-800 p-6 w-96 text-gray-900"
      >
        <FormField
          htmlFor="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleInputChange(e, "email")}
        />

        <FormField
          htmlFor="password"
          label="Password"
          value={formData.password}
          onChange={(e) => handleInputChange(e, "password")}
          type="password"
        />
        {action === "register" && (
          <FormField
            htmlFor="name"
            label="Name"
            onChange={(e) => handleInputChange(e, "name")}
            value={formData.name}
          />
        )}

        <div className="w-full text-center">
          <button
            type="submit"
            name="_action"
            value={action}
            className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            {action === "login" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </Form>
    </div>
  );
}
