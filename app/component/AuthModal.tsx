
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { signIn } from "../lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButton";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>try for free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex flex-row justify-center items-center gap-2">
          <Image src={Logo} alt="logo" className="size-10" />
          <h4 className="text-3xl font-semibold">
            Cal<span className="text-blue-500">endryl</span>
            </h4>

        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
            <form action={async () => {
                "use server"
                await signIn("google");
            }} className="w-full">
            <GoogleAuthButton/>

            </form>
            <form action={async () => {
                "use server"
                await signIn("github");
            }}>
                <GitHubAuthButton/>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
