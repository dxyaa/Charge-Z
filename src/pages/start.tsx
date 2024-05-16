import React from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import Server from "./server";
const Start = () => {
  return (
    <div className="bg-black h-screen text-white flex justify-center items-center">
      <Link
        href="/server"
        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md"
      >
        Start
      </Link>
    </div>
  );
};

export default Start;
