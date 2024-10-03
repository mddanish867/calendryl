"use server";

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import {
  onBoradingUniqueUsernameValidation,
  settingsSchema,
} from "./lib/zodSchemas";
import { redirect } from "next/navigation";

export async function OnBoardingAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onBoradingUniqueUsernameValidation({
      async isUserNameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });
        return !existingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });
  return redirect("/onboarding/grant-id");
}

// action method for update setting
export async function SettingsAction(prevState: any,formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const user = await prisma.user.update({
    where: {
      id:session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage
    },
  });

  return redirect("/dashboard")
}
