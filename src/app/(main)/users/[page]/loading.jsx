"use client";
import { ClipLoader } from "react-spinners";

export default function loading() {
  return (
    <>
      <div className="flex justify-center items-center mt-[200px]">
        <ClipLoader color={"#ffffff"} size={150} />
      </div>
    </>
  );
}
