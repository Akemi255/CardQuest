import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import "../../../public/css/login.css";

// import backgroundImage from "../../../../public/assets/login-background.jpg";
import backgroundImage from "../../../public/assets/login-background.jpg";

export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage({ children }) {
  return (
    <div className="relative h-screen">
      {/* <Image src={backgroundImage} layout="fill" objectFit="cover" /> */}

      <div className="container relative px-0 h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-8 lg:px-0 ">
        <div className="lg:p-10 col-span-8 bg-[#1C1C1C] h-full flex border-r border-[color:hsl(_0%,_0%,_18%)]">
          <div className="lg:mx-auto mx-0 flex flex-col space-y-6 w-24 lg:w-full justify-between">
            {/* <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Welcome
              </h1>
              <p className="text-sm text-muted-foreground text-white">
                Enter your email to login
              </p>
            </div> */}
            {/* <UserAuthForm /> */}
            <div></div>
            {children}
            {/* <SignIn /> */}

            <p className="px-8 text-center text-[13px] text-muted-foreground text-gray-500 mt-auto">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary text-gray-500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary text-gray-500"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="relative hidden col-span-0 h-full flex-col p-10 text-white lg:flex dark:border-r bg-gray-500">
          {/* <div className="absolute inset-0 bg-zinc-900" /> */}
          <div className="relative z-20 flex items-center text-lg font-medium">
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
            Card Quest Inc.
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
          </div>
        </div>
      </div>
    </div>
  );
}
