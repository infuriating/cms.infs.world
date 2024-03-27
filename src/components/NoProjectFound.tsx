import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

export default function NoProjectFound() {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center h-svh text-center">
      <p className="text-4xl lg:text-6xl font-bold">No project found</p>
      <p className="text-2xl lg:text-4xl text-muted-foreground">¯\_(ツ)_/¯</p>
      <Link
        className={buttonVariants({
          className: "text-lg lg:text-2xl",
        })}
        href="/"
      >
        Head back!
      </Link>
    </div>
  );
}
