"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import GoogleLogo from "@/public/google.webp";
import GitHubLogo from "@/public/github.png";

import Image from "next/image";
import { Loader, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface iAppPros {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}

export function SubmitButton({ text, variant, className }: iAppPros) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={cn("w-fit", className)}>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn("w-fit", className)}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader className="size-4 mr-2 animate-spin" />
          Please wait
        </Button>
      ) : (
        <>
          <Button variant="outline" className="w-full">
            <Image src={GoogleLogo} alt="googe-log" className="size-4 mr-2" />
            Signin with Google
          </Button>
        </>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader className="size-4 mr-2 animate-spin" />
          Please wait
        </Button>
      ) : (
        <>
          <Button variant="outline" className="w-full">
            <Image src={GitHubLogo} alt="googe-log" className="size-4 mr-2" />
            Signin with GitHub
          </Button>
        </>
      )}
    </>
  );
}
