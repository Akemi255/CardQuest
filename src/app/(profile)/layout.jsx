"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Pencil,
  AreaChart,
  Star,
  UserCheck,
  Eye,
  Facebook,
  User,
  Twitter,
  Instagram,
} from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileButton from "./components/ProfileButton";
import MyDrawer from "../(main)/components/MyDrawer";

import Nav from "../(main)/components/Nav";
import SearchBar from "../(main)/components/SearchBar";
import { SetEmail } from "@/helpers/SetEmail";

export default function Layout({ children }) {
  const [profileData, setProfileData] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);
  const email = SetEmail();

  useEffect(() => {
    if (typeof email === "string") {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            "https://api-rest-card-quest.vercel.app/api/users/profile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }

          const data = await response.json();
          setProfileData(data.user);
          setLoadingImage(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [email]);

  return (
    <div className="grid flex-1 md:grid-cols-[240px_1fr] h-screen">
      <aside className="hidden md:flex w-[240px] flex-col bg-background2 border-r border-[#2E2E2E]">
        <Nav />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden bg-background2  h-max md:h-auto">
        <SearchBar />
        <div className="overflow-y-auto overflow-x-hidden ">
          <div className="relative flex flex-col">
            {profileData.banner && (
              <Image
                src={profileData.banner}
                fill={true}
                quality={100}
                priority={true}
                alt="bannerImage"
                className="object-cover bg-center"
              />
            )}
            <div className="relative z-10 flex flex-col grow justify-center pt-10">
              <div className=" flex flex-row gap-4 items-center">
                <Avatar className="lg:h-36 lg:w-36 h-16 w-16 ">
                  <Image
                    src={profileData.image}
                    width={500}
                    height={500}
                    alt="Avatar"
                  />
                </Avatar>
                <div className="flex flex-col text-white">
                  <div>
                    <span className="text-lg">{profileData.name}</span>
                  </div>
                  <div>
                    <span className="text-lg text-gray-400">
                      {profileData.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-end">
                <div className="flex flex-row flex-wrap gap-4 text-white mr-2">
                  <div className="flex items-center justify-center bg-black hover:bg-gray-900 cursor-pointer  rounded-lg w-10 h-10">
                    <FaSpotify className="h-7 w-7 text-green-500" />
                  </div>
                  <div className="flex items-center justify-center bg-black hover:bg-gray-900 cursor-pointer w-10 h-10 rounded-lg">
                    <Facebook className="h-7 w-7 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-center bg-black hover:bg-gray-900 cursor-pointer w-10 h-10 rounded-lg">
                    <Instagram className="h-7 w-7 text-red-400" />
                  </div>
                  <div className="flex items-center justify-center bg-black hover:bg-gray-900 cursor-pointer rounded-lg w-10 h-10">
                    <Twitter className="h-7 w-7 text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between pb-2">
                <div className="flex flex-row gap-4">
                  <ProfileButton
                    icon={<User className="h-5 w-5 mr-1" />}
                    href={"/profile"}
                    text={"Profile"}
                  />
                  <ProfileButton
                    icon={<Pencil className="h-5 w-5 mr-1" />}
                    href={"/edit-profile"}
                    text={"Edit Profile"}
                  />
                  <ProfileButton
                    icon={<Star className="h-5 w-5 mr-1" />}
                    href={"/favorite"}
                    text={"Favorite"}
                  />
                  <ProfileButton
                    icon={<AreaChart className="h-5 w-5 mr-1" />}
                    href={"/ranking"}
                    text={"Ranking"}
                  />
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-row gap-2 text-white">
                    <UserCheck className="h-5 w-5" />
                    <span className="text-sm">
                      {profileData?.following?.length}
                    </span>
                    <span className="text-sm hidden lg:block">Following</span>
                  </div>
                  <div className="flex flex-row gap-2 text-white">
                    <Eye className="h-5 w-5" />
                    <span className="text-sm">3452</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </main>
      <MyDrawer />
    </div>
  );
}
