import { getSession } from "./actions";
import { redirect } from "next/navigation";
import { CreateUser } from "@/components/create-user";

export default async function Home() {
  const { session, loggedIn } = await getSession();
  console.log("session: ", session);

  if (loggedIn) redirect("/chat");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <CreateUser />
    </main>
  );
}
