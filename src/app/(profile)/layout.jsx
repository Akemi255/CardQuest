"use client";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import useSWR from "swr";

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
import ProfileButton from "./components/ProfileButton";
import MyDrawer from "../(main)/components/MyDrawer";

import Nav from "../(main)/components/Nav";
import SearchBar from "../(main)/components/SearchBar";
import { SetEmail } from "@/helpers/SetEmail";

const fetcher = async (...args) =>
  await fetch(...args).then((res) => res.json());

export default function Layout({ children }) {
  let email = SetEmail();

  const isEmailValid =
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { data, isLoading } = useSWR(
    isEmailValid
      ? `https://api-rest-card-quest.vercel.app/api/users/ProfileWithEmail/${encodeURIComponent(
          email
        )}`
      : null,
    fetcher
  );

  return (
    <div className="grid flex-1 md:grid-cols-[240px_1fr] h-screen">
      <aside className="hidden md:flex w-[240px] flex-col bg-background2 border-r border-[#2E2E2E]">
        <Nav />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden bg-background2 h-max md:h-auto">
        <SearchBar />
        <div className="overflow-y-auto overflow-x-hidden relative">
          {isLoading && (
            <div className="h-screen flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
              <ClipLoader color={"#ffffff"} loading={isLoading} size={20} />
            </div>
          )}
          <div className="relative flex flex-col">
            {data?.banner && (
              <Image
                src={data?.banner}
                fill={true}
                quality={100}
                priority={true}
                alt="bannerImage"
                className="object-cover bg-center"
              />
            )}
            <div className="relative z-10 flex flex-col grow justify-center pt-10">
              <div className="flex flex-row gap-4 items-center sm:justify-start justify-center ">
                <Avatar className="lg:h-36 lg:w-36 h-16 w-16 ">
                  {data?.image && (
                    <Image
                      src={data?.image}
                      width={500}
                      height={500}
                      quality={100}
                      priority={true}
                      alt="avataar"
                    />
                  )}
                </Avatar>

                <div className="flex flex-col text-white">
                  <div>
                    <span className="text-lg">{data?.name}</span>
                  </div>
                  <div>
                    <span className="text-lg text-gray-400 sm:flex hidden">
                      {data?.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row sm:justify-end justify-center">
                <div className="flex flex-row flex-wrap gap-4 text-white mr-2">
                  {data?.spotify && (
                    <a
                      href={data?.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center lg:bg-black hover:bg-gray-900 cursor-pointer  rounded-lg w-10 h-10 sm:bg-transparent"
                    >
                      <FaSpotify className="h-7 w-7  text-green-500" />
                    </a>
                  )}
                  {data?.facebook && (
                    <a
                      href={data?.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center lg:bg-black hover:bg-gray-900 cursor-pointer  rounded-lg w-10 h-10 sm:bg-transparent"
                    >
                      <Facebook className="h-7 w-7 text-blue-500" />
                    </a>
                  )}
                  {data?.instagram && (
                    <a
                      href={data?.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center lg:bg-black hover:bg-gray-900 cursor-pointer  rounded-lg w-10 h-10 sm:bg-transparent"
                    >
                      <Instagram className="h-7 w-7 text-red-400" />
                    </a>
                  )}
                  {data?.twitter && (
                    <a
                      href={data?.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center lg:bg-black hover:bg-gray-900 cursor-pointer  rounded-lg w-10 h-10 sm:bg-transparent"
                    >
                      <Twitter className="h-7 w-7 text-blue-500" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-row sm:justify-between justify-center pb-2">
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

                <div className="sm:flex flex-row gap-4 items-center hidden">
                  <div className="flex flex-row gap-2 text-white">
                    <UserCheck className="h-5 w-5" />
                    <span className="text-sm">{data?.following?.length}</span>
                    <span className="text-sm hidden lg:block ">Following</span>
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
