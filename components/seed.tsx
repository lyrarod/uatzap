"use client";
import React from "react";

import { seed } from "@/app/data";
import { Button } from "./ui/button";
import { Loader, PlusCircle } from "lucide-react";

export const Seed = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSeed() {
    setIsLoading(true);
    await seed();
    setIsLoading(false);
  }
  return (
    <div className="flex items-center justify-center gap-x-4">
      <h1 className="text-3xl">Firebase Data Example</h1>
      <Button onClick={handleSeed} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader className="animate-spin" /> Seed
          </>
        ) : (
          <>
            <PlusCircle /> Seed
          </>
        )}
      </Button>
    </div>
  );
};
