"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";

import { Eye, Facebook, Twitter, Instagram } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { Avatar } from "@/components/ui/avatar";

import { SetEmail } from "@/helpers/SetEmail";
import { Button } from "@/components/ui/button";

import { fetchFollowDataById } from "../helpers/fetchFollowDataById";
import { checkIfMe } from "../helpers/checkIfMe";
import { checkIfFollowing } from "../helpers/checkIfFollowing";
import { fetchProfile } from "../helpers/fetchProfile";
import { handleFollow } from "../helpers/handleFollow";

const ExploreProfile = () => {
  const { user } = useParams();
  const router = useRouter();
  const email = SetEmail();
  const [profileData, setProfileData] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isItMe, setIsItMe] = useState(false);
  const [followData, setFollowData] = useState(null);

  useEffect(() => {
    if (typeof email === "string") {
      if (email) {
        fetchProfile(user, setProfileData);
        fetchFollowDataById(user, setFollowData);
        checkIfFollowing(email, user, setIsFollowing);
        checkIfMe(user, email, setIsItMe);
      }
    }
  }, [user, email]);

  return (
    <div className="overflow-y-auto overflow-x-hidden relative">
      {(loadingImage || loadingBanner) && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ClipLoader
            color={"#ffffff"}
            loading={loadingImage || loadingBanner}
            size={20}
          />
        </div>
      )}
      <div className="relative flex flex-col">
        {profileData.banner && (
          <div className="w-[1000px] h-[30px]">
            <Image
              src={profileData.banner}
              fill={true}
              quality={100}
              priority={true}
              alt="bannerImage"
              className="object-cover bg-center"
              onLoad={() => setLoadingBanner(false)}
            />
          </div>
        )}
        <div className="relative z-10 flex flex-col grow justify-center pt-10">
          <div className="flex flex-row gap-4 items-center sm:justify-start justify-center ">
            <Avatar className="lg:h-36 lg:w-36 h-16 w-16">
              <Image
                src={profileData.image}
                width={500}
                height={500}
                alt="Avatar"
                onLoad={() => setLoadingImage(false)}
              />
            </Avatar>
            <div className="flex flex-col text-white">
              <div>
                <span className="text-lg">{profileData.name}</span>
              </div>
              <div>
                <span className="text-lg text-gray-400 sm:flex hidden">
                  {profileData.email}
                </span>
              </div>
            </div>
          </div>

          {!profileData.spotify &&
            !profileData.facebook &&
            !profileData.instagram &&
            !profileData.twitter && <br />}

          <div className="flex flex-row sm:justify-end justify-center">
            <div className="flex flex-row flex-wrap gap-4 text-white mr-2">
              {profileData.spotify && (
                <a
                  href={profileData.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center lg:bg-black hover:bg-gray-900 cursor-pointer  rounded-lg w-10 h-10 sm:bg-transparent"
                >
                  <FaSpotify className="h-7 w-7  text-green-500" />
                </a>
              )}
              {profileData.facebook && (
                <a
                  href={profileData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center lg:bg-black hover:bg-gray-900 cursor-pointer  rounded-lg w-10 h-10 sm:bg-transparent"
                >
                  <Facebook className="h-7 w-7 text-blue-500" />
                </a>
              )}
              {profileData.instagram && (
                <a
                  href={profileData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center lg:bg-black hover:bg-gray-900 cursor-pointer  rounded-lg w-10 h-10 sm:bg-transparent"
                >
                  <Instagram className="h-7 w-7 text-red-400" />
                </a>
              )}
              {profileData.twitter && (
                <a
                  href={profileData.twitter}
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
            {!isItMe && (
              <Button
                className="sm:ml-6 hover:bg-gray-700 relative bottom-2 right-2"
                onClick={() =>
                  handleFollow(
                    user,
                    isFollowing,
                    setIsFollowing,
                    setFollowData,
                    profileData
                  )
                }
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}

            <div className="flex flex-row sm:justify-end justify-center gap-3 sm:ml-auto">
              <div className="flex flex-row gap-2 text-white">
                <span className="text-sm">{followData?.followingCount}</span>
                <span className="text-sm lg:block ">Following</span>
              </div>
              <div className="flex flex-row gap-2 text-white">
                <span className="text-sm">{followData?.followersCount}</span>
                <span className="text-sm lg:block ">Followers</span>
              </div>
              <div className="sm:flex flex-row gap-2 text-white hidden">
                <Eye className="h-5 w-5" />
                <span className="text-sm">3452</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProfile;
