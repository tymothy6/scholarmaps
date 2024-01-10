import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import AuthImage from '../../public/auth-image.jpg'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Scholar Maps",
}

export default function AuthPage() {
  return (
    <main>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/main"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <Image 
            src={AuthImage}
            alt="Scholar Maps auth image"
            fill
            className="object-cover inset-0"
          />
          {/* <div className="absolute inset-0 bg-zinc-900" /> */}
          <div className="relative z-20 flex items-center text-xl font-medium">
            Scholar Maps
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
