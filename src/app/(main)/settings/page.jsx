import { UserProfile } from "@clerk/nextjs";
import "./settings.css";

export default function page() {
  return (
    <>
      <div className="flex justify-center">
        <UserProfile />
      </div>
    </>
  );
}
