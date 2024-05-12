import Link from "next/link";

export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage({ children }) {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="bg-[url('/assets/login-background.jpg')] bg-center bg-cover container relative px-0 h-screen  flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-8 lg:px-0 ">
        <div
          style={{ backgroundColor: "rgba(25, 30, 43, 0.97)" }}
          className="lg:p-10 col-span-3 h-full w-full flex border-r border-[color:hsl(_0%,_0%,_18%)]"
        >
          <div className="lg:mx-auto mx-0 flex justify-between py-10 items-center flex-col space-y-6  w-full md:w-24 lg:w-full md:justify-between md:py-0">
            <div className="relative z-20 flex md:hidden items-center justify-start w-full text-lg font-medium text-white  px-10 ">
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
              Card Quest
            </div>

            <h1 className="text-white text-2xl font-bold tracking-tight">
              HAREM: PROJECT MAID
            </h1>

            {children}
            <p className="px-8 text-center text-[13px] text-muted-foreground text-gray-500 mt-auto max-w-[400px]">
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
        <div className="relative hidden col-span-5 h-full flex-col p-10 text-white lg:flex dark:border-r ">
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Dive into a world of endless possibilities and
                collectible treasures with our immersive card game, where each
                card holds the power to unlock thrilling adventures and
                unforgettable moments!.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
