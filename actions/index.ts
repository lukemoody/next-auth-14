"use server";

import { db } from "@/types/db";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

type userAction = {
  message: string;
};

export async function createUserAction(
  formState: userAction,
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    let password = formData.get("password") as string;

    // If no values exist, dislay below message
    if (!name || !username || !password) {
      return {
        message: "All fields are required",
      };
    }

    // Wait for user call to DB and check everything is uniqe with the current username being created so we don't get duplicates
    const duplicate = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (duplicate) {
      return {
        message: "Username already exists",
      };
    }

    // Example validation for password length
    if (password.length < 5) {
      return {
        message: "Password is too short",
      };
    }

    /**
     * We can continue with more validation variations to make the registration process more robust
     * ...
     */

    // Hash the users password before storing in DB to make more secure
    password = await bcrypt.hash(password, 10);

    // Create new user in database
    await db.user.create({
      data: {
        name,
        username,
        password,
      },
    });
  } catch (error: unknown) {
    return {
      message: "Unknown error occured!",
    };
  }

  // Send user back to homepage on successful entry
  redirect("/");
}
