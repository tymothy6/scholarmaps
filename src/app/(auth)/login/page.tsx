import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import AuthImage from '../../../../public/auth-image.jpg'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { LoginAuth } from '@/components/auth/login-auth'
import { LoginTestimonialCarousel } from '@/components/patterns/login-carousel'
import { BoxIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Scholar Maps",
}

export default function Login() {
  return (
    <main>
      <div className="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Register
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <Image 
            src={AuthImage}
            alt="Scholar Maps auth image"
            fill
            sizes="(max-width: 1200px) 50vw"
            className="object-cover"
          />
          <div className="w-full h-full z-20 flex flex-col justify-between items-start text-2xl font-hubotSans font-medium">
            <div className="flex gap-4">
              <BoxIcon className="h-8 w-8" /> 
              Scholar Maps
            </div>
            <LoginTestimonialCarousel className="w-full flex items-center justify-center" />
          </div>


        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back. Ready to get started?
              </p>
              <LoginAuth />
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
