"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import signupFormSchema from "@/lib/signupFormSchema";
import axios from "axios";
import { useUploadThing } from "@/lib/uploadthing";
import { FileUploader } from "./FileUploader";
import Image from "next/image";

const Signup: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    const { username, email, password } = values;
    const imageUrl: string = "";
    const isPremiumUser: boolean = false;
    const premiumType: string = "Basic";

    const { data } = await axios.post("/api/auth/signup", {
      username,
      email,
      password,
      imageUrl,
      isPremiumUser,
      premiumType,
    });

    console.log(data);
  };

  return (
    <section className="form-wrapper">
      <h1 className="h1-bold w-full text-center mb-10">
        Welcome to <span className="text-red-600">Flixify</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="h-full w-full flex items-center justify-center mb-8">
            <div className="border-2 border-black h-full w-[60%] rounded-3xl">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="h-full">
                      <FileUploader
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};

export default Signup;
