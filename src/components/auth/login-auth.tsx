"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Loader2Icon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FaGoogle } from "react-icons/fa";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userAuthFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export function RegisterAuth({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const registerForm = useForm<z.infer<typeof userAuthFormSchema>>({
    resolver: zodResolver(userAuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userAuthFormSchema>) {
    setIsLoading(true);

    try {
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      toast.success("Registration successful!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit)}
          className="grid gap-2"
        >
          <div className="grid gap-0">
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Continue with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="relative grid gap-2">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => signIn("google")}
        >
          {isLoading ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => signIn("github")}
        >
          {isLoading ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
      </div>
    </div>
  );
}

export function LoginAuth({ className, ...props }: UserAuthFormProps) {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginForm = useForm<z.infer<typeof userAuthFormSchema>>({
    resolver: zodResolver(userAuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  React.useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);

  async function onSubmit(values: z.infer<typeof userAuthFormSchema>) {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (!result || !result.ok) {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login failed. Please check your credentials & try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="grid gap-2"
        >
          <div className="grid gap-0">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Continue with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="relative grid gap-2">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => signIn("google")}
        >
          {isLoading ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => signIn("github")}
        >
          {isLoading ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
      </div>
    </div>
  );
}
