"use client";

// https://react-hook-form.com/docs/useformstate
import { useFormState } from "react-dom";
import { createUserAction } from "@/actions";

const CreateUser = () => {
  const [formState, formStateAction] = useFormState(createUserAction, {
    message: "",
  });

  return (
    <form action={formStateAction} className="flex flex-col gap-3 w-1/2">
      <label>Full Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className="border rounded p-2 w-full"
      />
      <label>Username</label>
      <input
        type="text"
        id="username"
        name="username"
        className="border rounded p-2 w-full"
      />
      {/* <label>Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="border rounded p-2 w-full"
      /> */}
      <label>Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="border rounded p-2 w-full"
      />
      <input
        type="submit"
        value="Create User"
        className="rounded p-2 bg-blue-300 hover:bg-blue-200"
      />
      {formState.message && <p className="text-red-500">{formState.message}</p>}
    </form>
  );
};

export default CreateUser;
