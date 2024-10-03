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
import { SubmitButton } from "./SubmitButton";
import { useFormState } from "react-dom";
import { SettingsAction } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { error } from "console";

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}
export function SettingForm({ fullName, email, profileImage }: iAppProps) {
  const [lastResult, action] = useFormState(SettingsAction, undefined);
  const [currentProfileImg, setCurrentProfileImg] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // delete user fprofile
  const handleDeletImage = () => {
    setCurrentProfileImg("");
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              defaultValue={fullName}
              name={fields.fullName.name}
              key={fields.fullName.key}
              placeholder="calendryl"
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input
              disabled
              defaultValue={email}
              placeholder="calendryl@test.com"
            />
          </div>
          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            {currentProfileImg ? (
              <div className="relative size-16">
                <img
                src={currentProfileImg}
                alt="Profile Image"
                className="size-16 rounded-lg"
              />
              <Button 
              onClick={handleDeletImage}
              variant="destructive" 
              size="icon"
              type="button"
              className="absolute -top-3 -right-3">
                <X className="size-4"/>
              </Button>
                </div>
            ) : (
              <UploadDropzone
              onClientUploadComplete={(res) => {
                setCurrentProfileImg(res[0].url)
              }}
              onUploadError={(error) => {
                console.log("something went wrong", error)
              }}
              endpoint="imageUploader"/>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
