"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

/**
 * Notes
 * You can't use getServerSession() on a client side page.
 * To get authentication to work, we need to use useSession()
 * and set it up like below, and explicity say required: true
 * and handle unauthentictaed uses. In this case we set a redirect.
 *
 * But if we just do this, we get a runtime error "Error: [next-auth]: `useSession` must be wrapped in a <SessionProvider />"
 * I've made a custom component to provide this data. /components/AuthProvider.
 * Then in Layout.tsx, i've called this custom provider and now Signin options
 * are available on the frontend using client side code.
 */
const ClientMember = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });

  return (
    <div>
      <h1>Member Client Page</h1>
      <p>{session?.user.email}</p>
      <p>{session?.user.role}</p>
    </div>
  );
};

export default ClientMember;
