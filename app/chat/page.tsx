import { redirect } from "next/navigation";
import { ChatComponent } from "@/components/chat-component";
import { getSession } from "../actions";

export default async function Chat() {
  const { session, loggedIn } = await getSession();

  if (!loggedIn) {
    redirect("/");
  }

  return <ChatComponent session={session} />;
}
