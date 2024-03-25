"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SetEmail } from "@/helpers/SetEmail";

const allowedEmails = [
  "leothesanisimp@gmail.com",
  "facundopavon9@gmail.com",
  "imritikjha93@gmail.com",
  "arrofirezasatria@gmail.com",
  "joseb2031@hotmail.com",
  "endermite152@gmail.com",
  "clanoficial1234@gmail.com",
  "lale53265@gmail.com",
  "delfii2111@gmail.com",
  "zacaryp2005@gmail.com",
  "alexislanchiotti14@gmail.com",
  "estebannfbi17@gmail.com",
  "maxalejandrorodriguezgonzalez@gmail.com",
  "animex2013@hotmail.com",
  "fernandocalderon2203@gmail.com",
  "alexislanchiotti13@gmail.com",
  "penguinlord06@gmail.com",
  "hirumi061@gmail.com",
  "y.orellanaandrada@gmail.com",
  "elcabezadepinga12@gmail.com",
  "valhedelahoz@gmail.com",
  "juliancamara70@gmail.com",
  "millern124@gmail.com",
  "zhongli217@hotmail.com",
  "adrianserranogarcia20@gmail.com",
  "estebann17e@gmail.com",
  "sandrarh1974@gmail.com",
  "elias.quinteros1998@gmail.com",
  "ruyzusandoval@gmail.com",
  "gusvet1465@gmail.com",
  "gus1465@aol.com",
];

const Checkauth = () => {
  const email = SetEmail();
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    let timeoutId;

    if (email) {
      timeoutId = setTimeout(() => {
        if (!allowedEmails.includes(email)) {
          signOut(() => {
            router.push("/");
            setTimeout(() => {
              window.location.reload();
            }, 500);
          });
        } else {
          console.log("welcome");
        }
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [email, signOut, router]);

  return <></>;
};

export default Checkauth;
