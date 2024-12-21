import { getSession } from "./actions";
import { redirect } from "next/navigation";
import { CreateUser } from "@/components/create-user";

export default async function Home() {
  const { isLoggedIn } = await getSession();

  if (isLoggedIn) redirect("/chat");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <CreateUser />
    </main>
  );
}
