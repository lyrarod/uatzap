import { getUser } from "../actions";
import { redirect } from "next/navigation";
import { ChatComponent } from "@/components/chat-component";

export default async function Chat() {
  const user = await getUser();
  if (!user.loggedIn) return redirect("/");

  return <ChatComponent user={user} />;
}
