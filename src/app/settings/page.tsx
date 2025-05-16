"use client";

import { useForm } from "react-hook-form";
import { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import ChangeEmailDialog from "@/components/settings/ChangeEmailDialouge";
import ChangePasswordDialog from "@/components/settings/ChangePasswordDialouge";
import UploadPhotoDialog from "@/components/settings/UploadPhotoDialouge";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SettingsProfile() {
    const [avatarUrl, setAvatarUrl] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Abdul Mo",
    },
  });

  const [email] = useState("abdulmoiz@gmail.com");
  const [isEmailDialogOpen, setEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);

  const openEmailDialog = () => setEmailDialogOpen(true);
  const closeEmailDialog = () => setEmailDialogOpen(false);

  const openPasswordDialog = () => setPasswordDialogOpen(true);
  const closePasswordDialog = () => setPasswordDialogOpen(false);

  const openUploadDialog = () => setUploadDialogOpen(true);
  const closeUploadDialog = () => setUploadDialogOpen(false);

  function onSubmit(data: ProfileFormData) {
    console.log("Profile updated:", data);
  }
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const goToMainScreen = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        goToMainScreen();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div className="py-[20px] px-[16px]">
      <div className="flex w-full border-b justify-between items-center py-3 lg:px-6">
        <h1 className="text-[30px] font-semibold">Settings</h1>
        <div className="text-sm text-muted-foreground">
          <span
            className="text-green-800 bg-green-100 px-2 py-1 rounded cursor-pointer"
            onClick={goToMainScreen}
          >
            Close <kbd className="ml-1 text-xs">Esc</kbd>
          </span>
        </div>
      </div>

      <div className="lg:flex ">
        <div className="lg:border-r w-full lg:w-[200px] h-auto">
          <div className="flex lg:flex-col gap-[16px] py-5 px-2 lg:px-4 ">
            <Button className="justify-start bg-[#DCFCE7] text-[#16A34A] text-[16px] font-[500] hover:bg-green-200">
              Profile
            </Button>
            <Button variant="ghost" className="justify-start text-[16px] font-[500]">
              Plans & Billing
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full p-3 lg:p-6">
          <div className="text-[16px] font-[500] mb-4 border-b w-full pb-5">Profile</div>
          <div className="flex lg:flex-row flex-col justify-between items-center lg:w-[70%]">
            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-[14px] font-[500] ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Email</FormLabel>
                  <div className="flex items-center gap-2  mt-1 w-full">
                    <Input disabled value={email} className="" />
                    <Button type="button" variant="link" className="text-blue-600 px-0" onClick={openEmailDialog}>
                      Change
                    </Button>
                  </div>
                </div>

                <div>
                  <FormLabel>Password</FormLabel>
                  <div className="flex items-center gap-2 w-full mt-1">
                    <Input disabled value="***************" className="" />
                    <Button type="button" variant="link" className="text-blue-600 px-0" onClick={openPasswordDialog}>
                      Change
                    </Button>
                  </div>
                </div>
              </form>
            </Form>

            <div className="flex flex-col items-center gap-4 mt-4 lg:mt-2">

              <Avatar className="w-[104px] h-[104px]">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} />
                ) : (
                  <AvatarFallback>CN</AvatarFallback>
                )}
              </Avatar>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[14px] font-[400] text-[#52525B]"
                >
                    Upload Photo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              </div>
          </div>
        </div>
      </div>

    
      <ChangeEmailDialog isOpen={isEmailDialogOpen} onClose={closeEmailDialog} />
      <ChangePasswordDialog isOpen={isPasswordDialogOpen} onClose={closePasswordDialog} />
    </div>
  );
}
