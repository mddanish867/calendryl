"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { OnBoardingAction } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { OnBoardingSchema } from "../lib/zodSchemas";
import { SubmitButton } from "../component/SubmitButton";
export default function OnBoarding() {

  // form validation using zod and conform
  const [lastResult, action] = useFormState(OnBoardingAction, undefined);
  const [form, fiels] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: OnBoardingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className=" min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to Cal<span className="text-primary">endryl</span>{" "}
          </CardTitle>
          <CardDescription>
            we need the following information to set your profile!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label>Full Name</Label>
              <Input
                name={fiels.fullName.name}
                defaultValue={fiels.fullName.initialValue}
                key={fiels.fullName.key}
                placeholder="Danis akhtar"
              />
              <p className="text-red-500 text-sm">{fiels.fullName.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>User Name</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Calendryl.com
                </span>
                <Input
                  name={fiels.userName.name}
                  defaultValue={fiels.userName.initialValue}
                  key={fiels.userName.key}
                  placeholder="eample-user-1"
                  className=" rounded-l-none"
                />
                <p className="text-red-500 text-sm">{fiels.userName.errors}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" className="w-full"/>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
