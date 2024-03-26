import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./components/UserAuthForm";

import { SignIn } from "@clerk/nextjs";
import "public/css/login.css";

import backgroundImage from "../../../../public/assets/login-background.jpg";

export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen">
      <Image src={backgroundImage} layout="fill" objectFit="cover" />
      {/* <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="container relative px-0 h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="lg:p-8 bg-black bg-opacity-90 h-full flex rounded-r-3xl">
          <div className="mx-auto  flex  w-full flex-col justify-center space-y-6 w-24 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Welcome
              </h1>
              <p className="text-sm text-muted-foreground text-white">
                Enter your email to login
              </p>
            </div>
            {/* <UserAuthForm /> */}
            <SignIn />
            <p className="px-8 text-center text-sm text-muted-foreground text-white">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary text-white"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary text-white"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="relative hidden h-full flex-col  p-10 text-white lg:flex dark:border-r">
          {/* <div className="absolute inset-0 bg-zinc-900" /> */}
          {/* <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div> */}
        </div>
      </div>
    </div>
  );
}