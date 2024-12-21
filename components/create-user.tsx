"use client";
import React from "react";

import { useActionState } from "react";
import { createSession } from "@/app/actions";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader, MessageCircleCodeIcon, SendHorizonal } from "lucide-react";

interface FormState {
  message: string;
  success?: boolean | null;
}

const initialState: FormState = {
  message: "",
  success: null,
};

export const CreateUser = () => {
  const [formState, formAction, pending] = useActionState(
    createSession,
    initialState
  );
  const [showMessage, setShowMessage] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    // inputRef.current?.focus();

    if (formState?.success === false) {
      setShowMessage(true);
      inputRef.current!.value = "";

      timeout = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [formState]);

  return (
    <div className="container flex items-center justify-center w-full">
      <form
        action={formAction}
        className="flex flex-col w-full max-w-sm px-4 py-12 bg-white rounded-md shadow gap-y-6 dark:bg-card"
      >
        <h1 className="flex items-center justify-center text-4xl font-bold text-primary gap-x-1">
          <MessageCircleCodeIcon className="size-12" />
          UatZap
        </h1>
        <Input
          ref={inputRef}
          name="username"
          placeholder={
            showMessage ? formState?.message : "Digite seu nome de usuário"
          }
          required
          type="search"
          maxLength={20}
          disabled={pending}
          onChange={() => setShowMessage(false)}
          className={cn(
            "placeholder:text-sm text-sm border-primary placeholder:italic placeholder:tracking-tight",
            {
              "border-red-500 placeholder:text-red-500 focus-visible:ring-red-500 animate-pulse":
                showMessage,
            }
          )}
        />

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? (
            <>
              <Loader className="animate-spin" />
              Conectando...
            </>
          ) : (
            <>
              <SendHorizonal />
              Conectar
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
