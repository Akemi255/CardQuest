"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getEmail } from "@/helpers/getEmail";
import { toast } from "react-toastify";
import { Form } from "@/components/ui/form";

import { getProfileData } from "./helpers/getProfileData";
import { dataURItoBlob } from "./helpers/data-to-blob";
import Image from "next/image";
import { useRouter } from "next/navigation";

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  nick: z
    .string()
    .min(2, { message: "Nickname must be at least 2 characters." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  twitter: z
    .string()
    .optional()
    .refine((value) => !value || urlRegex.test(value), {
      message: "Invalid Twitter URL.",
    }),
  instagram: z
    .string()
    .optional()
    .refine((value) => !value || urlRegex.test(value), {
      message: "Invalid Instagram URL.",
    }),
  facebook: z
    .string()
    .optional()
    .refine((value) => !value || urlRegex.test(value), {
      message: "Invalid Facebook URL.",
    }),
  spotify: z
    .string()
    .optional()
    .refine((value) => !value || urlRegex.test(value), {
      message: "Invalid Spotify URL.",
    }),
});

const ProfileForm = () => {
  const email = getEmail();
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Default Form Values
  useEffect(() => {
    getProfileData(
      email,
      register,
      setProfileImage,
      setBannerImage,
      setValue,
      setShowForm
    );
  }, [email, register, setValue]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar el tipo de archivo
      const fileType = file.type;
      if (
        !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          fileType
        )
      ) {
        toast.error("The profile image must be jpg, jpeg, png, or gif");
        return; // Cancelar la carga de la imagen
      }

      // Verificar el tamaño del archivo
      if (file.size > 5 * 1024 * 1024) {
        // 5MB en bytes
        toast.error("The profile image must be smaller than 5MB");
        return; // Cancelar la carga de la imagen
      }

      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar el tipo de archivo
      const fileType = file.type;
      if (
        !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          fileType
        )
      ) {
        toast.error("The banner image must be jpg, jpeg, png, or gif");
        return; // Cancelar la carga de la imagen
      }

      // Verificar el tamaño del archivo
      if (file.size > 5 * 1024 * 1024) {
        // 5MB en bytes
        toast.error("The banner image must be smaller than 5MB");
        return; // Cancelar la carga de la imagen
      }

      const reader = new FileReader();
      reader.onload = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData) => {
    if (email) {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("nick", formData.nick);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("email", email);
      formDataToSend.append("twitter", formData.twitter || "");
      formDataToSend.append("instagram", formData.instagram || "");
      formDataToSend.append("facebook", formData.facebook || "");
      formDataToSend.append("spotify", formData.spotify || "");

      function isURL(str) {
        return /^(http|https):\/\/[^ "]+$/.test(str);
      }

      if (profileImage && !isURL(profileImage)) {
        formDataToSend.append("profileImage", dataURItoBlob(profileImage));
      }

      if (bannerImage && !isURL(bannerImage)) {
        formDataToSend.append("bannerImage", dataURItoBlob(bannerImage));
      }

      try {
        const response = await fetch(
          "https://api-rest-card-quest.vercel.app/api/users/update",
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        if (response.ok) {
          toast.success("User updated");
          router.push("/profile");
        }
        if (response.status == 403) {
          toast.error("The image must be smaller than 5MB");
        }
        if (response.status == 500) {
          toast.error("The image must be smaller than 5MB");
        }
      } catch (error) {
        console.error(
          "Error al realizar la solicitud de actualización:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log(
        "Email not available. User might not be authenticated or email data is missing."
      );
    }
  };

  return (
    <div className="bg-[#161827]">
      <div className="mx-auto px-4">
        {showForm && (
          <Form {...formSchema}>
            <form
              className="flex flex-col items-center relative bottom-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="bg-gray-300 h-[100px] lg:w-1/2 w-1/2 rounded shadow-lg relative top-12 cursor-pointer overflow-hidden banner-edit">
                {bannerImage ? (
                  <Image
                    src={bannerImage}
                    alt="Banner Preview"
                    className="object-cover w-full h-full cursor-pointer"
                    width={500}
                    height={500}
                  />
                ) : (
                  <span className="absolute top-[45px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl color-insert">
                    Banner
                  </span>
                )}
                <Input
                  type="file"
                  id="bannerImageInput"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleBannerImageChange}
                />
              </div>

              <Label
                htmlFor="profileImageInput"
                className="block cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full shadow-lg relative cursor-pointer overflow-hidden">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile Preview"
                      className="object-cover w-full h-full cursor-pointer"
                      width={500}
                      height={500}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex justify-center items-center cursor-pointer">
                      <span className="color-insert text-center">Profile</span>
                    </div>
                  )}
                  <Input
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleProfileImageChange}
                  />
                </div>
              </Label>

              <Input
                type="text"
                name="name"
                placeholder="Name"
                className="p-2 border rounded-md mt-2 w-1/2"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              <Input
                type="text"
                name="nick"
                placeholder="Nickname"
                className="p-2 border rounded-md mt-2 w-1/2"
                {...register("nick")}
              />
              {errors.nick && (
                <span className="text-red-500">{errors.nick.message}</span>
              )}

              <Textarea
                name="bio"
                placeholder="Bio"
                className="p-2 border rounded-md mt-2 w-1/2 textArea resize-none outline-none"
                rows="4"
                {...register("bio")}
              />
              {errors.bio && (
                <span className="text-red-500">{errors.bio.message}</span>
              )}

              <Input
                type="text"
                name="twitter"
                placeholder="Twitter"
                className="p-2 border rounded-md mt-2 w-1/2"
                {...register("twitter")}
              />
              {errors.twitter && (
                <span className="text-red-500">{errors.twitter.message}</span>
              )}

              <Input
                type="text"
                name="instagram"
                placeholder="Instagram"
                className="p-2 border rounded-md mt-2 w-1/2"
                {...register("instagram")}
              />
              {errors.instagram && (
                <span className="text-red-500">{errors.instagram.message}</span>
              )}

              <Input
                type="text"
                name="facebook"
                placeholder="Facebook"
                className="p-2 border rounded-md mt-2 w-1/2"
                {...register("facebook")}
              />
              {errors.facebook && (
                <span className="text-red-500">{errors.facebook.message}</span>
              )}

              <Input
                type="text"
                name="spotify"
                placeholder="Spotify"
                className="p-2 border rounded-md mt-2 w-1/2"
                {...register("spotify")}
              />
              {errors.spotify && (
                <span className="text-red-500">{errors.spotify.message}</span>
              )}

              <div className="flex justify-center w-full mt-6 gap-4">
                <Button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Save changes"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
