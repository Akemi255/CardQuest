"use client";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileButton(props) {
  const path = usePathname();
  const { icon, text, href, className, ...rest } = props;

  return (
    <Link href={href}>
      <Button
        className={cn(
          "px-2 py-1 text-white h-auto",
          className,
          path === href ? null : "bg-transparent"
        )}
        {...rest}
      >
        {icon}
        {text}
      </Button>
    </Link>
  );
}
