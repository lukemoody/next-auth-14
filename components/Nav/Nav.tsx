import Link from "next/link";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  //   console.log("session", session);

  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between w-full px-10 py-4">
        <div>My Site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          {session?.user.role == "ADMIN" && (
            <Link href="/CreateUser">Create user</Link>
          )}
          <Link href="/ClientMember">Client Member</Link>
          <Link href="/Member">Member</Link>
          <Link href="/Public">Public</Link>
          {session ? (
            <>
              <p>{session.user.name}</p>
              <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            </>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
