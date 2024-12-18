"use client";
import React from "react";

import { useActionState } from "react";
import { createUser } from "@/app/actions";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader, MessageCircleCodeIcon } from "lucide-react";

interface FormState {
  message: string;
  success?: boolean;
}

const initialState: FormState = {
  message: "",
};

export const CreateUser = () => {
  const [formState, formAction, pending] = useActionState(
    createUser,
    initialState
  );
  const [showMessage, setShowMessage] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
    let timeout: NodeJS.Timeout;

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
    <form
      action={formAction}
      className="container flex flex-col items-center w-full max-w-lg gap-y-6"
    >
      <h1 className="flex items-center text-4xl font-bold text-primary gap-x-1">
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
        className={cn("", {
          "border-red-500 placeholder:text-red-500 focus-visible:ring-red-500 animate-pulse":
            showMessage,
        })}
      />

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader className="animate-spin" />
            Conectando...
          </>
        ) : (
          "Conectar"
        )}
      </Button>
    </form>
  );
};
