"use client";
import React from "react";

import { db } from "@/lib/firebase";
import { redirect } from "next/navigation";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { cn, delay } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, SendHorizonal } from "lucide-react";
import { getSession } from "@/app/actions";

type MessagesType = {
  [x: string]: any;
}[];

type SessionType = {
  uid?: string;
  user?: string;
};

export const ChatComponent = ({ session }: { session: SessionType }) => {
  const [messages, setMessages] = React.useState<MessagesType>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const messageRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  React.useEffect(() => {
    const q = query(collection(db, "chatapp"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setMessages(data);
    });

    return () => unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!messageRef.current?.value.trim()) {
      messageRef.current!.value = "";
      messageRef.current?.focus();
      return;
    }

    setIsLoading(true);

    const { loggedIn } = await getSession();
    if (!loggedIn) {
      await delay(500);
      redirect("/");
    }

    await addDoc(collection(db, "chatapp"), {
      user: {
        uid: session?.uid,
        name: session?.user,
      },
      text: messageRef.current?.value.trim(),
      agent: navigator?.userAgent,
      timestamp: serverTimestamp(),
    });

    messageRef.current!.value = "";
    setIsLoading(false);
  }

  return (
    <>
      <ul
        ref={scrollRef}
        className="w-full flex flex-col h-[calc(100vh-84px*1.5)] !overflow-y-auto py-10 gap-y-6 container"
      >
        {messages?.map((message) => (
          <li
            key={message.id}
            className={cn("w-full flex first:mt-auto", {
              "justify-end": message.user.uid === session?.uid,
            })}
          >
            {
              <div
                className={cn(
                  `dark:bg-secondary bg-white px-4 py-1.5 rounded-3xl w-max max-w-[90%] overflow-hidden break-words shadow rounded-bl-none dark:text-white`,
                  {
                    "!bg-primary/25 rounded-br-none rounded-bl-3xl":
                      message.user.uid === session?.uid,
                  }
                )}
              >
                <strong>{message.user.name}:</strong> {message.text}
              </div>
            }
          </li>
        ))}
      </ul>

      <div className="fixed bottom-0 z-50 w-full py-6 bg-background">
        <form
          onSubmit={handleSubmit}
          className="container flex items-center w-full gap-x-2"
        >
          <Input
            ref={messageRef}
            name="message"
            type="search"
            placeholder="Digite sua mensagem"
            className="w-full bg-white border-0 dark:border dark:bg-background"
            onFocus={() =>
              scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
            }
            onBlur={() =>
              scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
            }
          />
          <Button
            size={"default"}
            variant={"default"}
            disabled={isLoading}
            className="rounded-[100%] size-9 flex justify-center items-center"
          >
            {!isLoading ? (
              <SendHorizonal />
            ) : (
              <Loader className="animate-spin" />
            )}
          </Button>
        </form>
      </div>
    </>
  );
};
