"use client";
import React from "react";

import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export const UserLoginClient = () => {
  const [btnIsLoading, setBtnIsLoading] = React.useState(false);

  const nameRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const data = localStorage.getItem("chatApp:user");
    if (data) redirect("/chat");
  }, []);

  const handleLocalStorageSetItem = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setBtnIsLoading(true);

    if (!nameRef.current?.value.trim()) {
      nameRef.current!.value = "";
      nameRef.current!.focus();
      return;
    }

    localStorage.setItem(
      "chatApp:user",
      JSON.stringify({
        uid: String(Date.now()),
        name: nameRef.current?.value.trim(),
        agent: navigator?.userAgent,
      })
    );

    setTimeout(() => {
      redirect("/chat");
    }, 1000);
  };

  return (
    <form
      onSubmit={handleLocalStorageSetItem}
      className="container flex flex-col w-full max-w-sm gap-4"
    >
      <Input
        ref={nameRef}
        placeholder="Digite seu nome ou apelido..."
        required
        type="search"
        maxLength={20}
        className="focus-visible:ring-0"
      />
      <Button variant={"default"} className="w-full">
        {btnIsLoading ? <Loader className="animate-spin" /> : "Entrar"}
      </Button>
    </form>
  );
};
