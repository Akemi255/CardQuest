import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserTable({ username, userUrl, imageUrl }) {
  return (
    <div className="flex flex-row max-w-[400px] gap-3 items-center">
      <Avatar className="h-8 w-8">
        <AvatarImage src={imageUrl} alt="" />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <span>{username}</span>
    </div>
  );
}
