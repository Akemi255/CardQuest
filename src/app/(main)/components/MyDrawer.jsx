import { DrawerContent } from "@/components/ui/drawer";

import MobileNav from "./Nav";

export default function MyDrawer() {
  return (
    <DrawerContent className="h-screen rounded-none md:w-1/4 sm:w-2/4 w-3/4 bg-[#252736] border-transparent">
      <MobileNav />
    </DrawerContent>
  );
}
