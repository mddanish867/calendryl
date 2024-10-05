import { conformZodMessage } from "@conform-to/zod";
import { url } from "inspector";
import { z } from "zod";

export const OnBoardingSchema = z.object({
  fullName: z.string().min(3).max(150),
  userName: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username can only contains letters, numbers and -",
    }),
});

export function onBoradingUniqueUsernameValidation(options?: {
  isUserNameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string()
      .min(3)
      .max(150)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username can only contains letters, numbers and -",
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUserNameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }
          return options.isUserNameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Username is already used",
              });
            }
          });
        })
      ),
    fullName: z.string().min(3).max(150),
  });
}


export const settingsSchema = z.object({
fullName: z.string().min(3).max(150),
profileImage: z.string(),
});


export const eventTypeSchema = z.object({
  title: z.string().min(3).max(150),
  duration: z.string().min(1).max(60),
  url: z.string().min(3).max(150),
  description: z.string().min(3).max(300),
  videoCallSoftware: z.string().min(3),
})