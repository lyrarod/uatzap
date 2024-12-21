import { redirect } from "next/navigation";
import { ChatComponent } from "@/components/chat-component";
import { getSession } from "../actions";

export default async function Chat() {
  const { session, isLoggedIn } = await getSession();

  if (!isLoggedIn) {
    redirect("/");
  }

  return <ChatComponent session={session} />;
}
