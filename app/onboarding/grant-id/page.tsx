import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import VideoGif from "@/public/work-is-almost-over-happy.gif";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
export default function OnBoardingRoutTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Your are almost done!</CardTitle>
          <CardDescription>
            We have to now connect your calender to your account.
          </CardDescription>
          <Image
            src={VideoGif}
            alt="Almost finished gift"
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 mr-2" /> Connect Calender to
              your Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
