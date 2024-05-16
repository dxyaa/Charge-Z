"use client";
import React from "react";
import "tailwindcss/tailwind.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useEffect } from "react";
import { useState } from "react";
import { RxDividerVertical } from "react-icons/rx";
import { GiNetworkBars } from "react-icons/gi";
import { FaWifi } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiBatteryChargeLine } from "react-icons/ri";
import { FaBluetoothB } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import { FaBolt } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoPersonCircle } from "react-icons/io5";
import BookLater from "./bookLater";
import ChargeNow from "./chargeNow";
import Profile from "./profile";

const HomePage = () => {
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const dayOfWeek = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
  });
  const monthAndDate = currentDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.defaultPlaybackRate = 5.0;
      videoElement.addEventListener("ended", handleVideoEnded);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, []);

  const handleVideoEnded = () => {
    setVideoFinished(true);
  };

  // FOR A B H I S H E K : the video currently disappears after playing has ended,which is handled just above with useeffect.

  const [videoFinished, setVideoFinished] = useState(false);
  return (
    <div className="relative h-screen overflow-hidden w-screen bg-black">
      <div className="relative h-screen overflow-hidden w-screen bg-black">
        {!videoFinished && (
          <video
            autoPlay
            muted
            className="absolute inset-0 z-0 w-full h-full object-cover transform scale-75"
          >
            <source src="/carvideolast.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="z-50 flex justify-center items-center text-center text-white  text-4xl font-bold pt-20">
          Charge-Z
        </div>
      </div>
      <div className=" flex justify-center text-white z-10 w-full">
        <div className="flex justify-center z-10 w-full absolute top-0">
          <div className="flex justify-center  items-center rounded-b-lg bg-gradient-to-r from-gray-900 to-gray-800 w-1/6 h-9 p-1 z-10">
            {" "}
            <TiWeatherPartlySunny />{" "}
            <p className="ml-2 text-sm  font-bold">24°C</p>
          </div>
        </div>
        <div className="absolute top-5 left-5">
          {" "}
          <div className="flex flex-col">
            <div className="text-3xl ">{formattedTime}</div>
            <div className="flex flex-row text-sm">
              <div>{dayOfWeek} </div>
              <div>
                <RxDividerVertical className="mt-1" />
              </div>
              <div className="text-sm">
                {monthAndDate}, {currentDate.getFullYear()}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-5 right-5">
          <div className="flex flex-row space-x-2">
            <div>
              <FaBluetoothB size={20} />
            </div>
            <div>
              <FaLocationDot size={18} />
            </div>
            <div>
              <FaWifi size={20} />
            </div>
            <div>
              <RiBatteryChargeLine size={24} />
            </div>
            {/*<div>
           <GiNetworkBars />
         </div>*/}
          </div>
        </div>
        <div className="absolute bottom-5 w-full p-5 ">
          <div className="rounded-md bg-gray-800 flex justify-center items-center h-16 flex-row space-x-2">
            <Link
              href="/"
              className="p-2 rounded-md flex items-center group hover:bg-gray-700"
            >
              <IoHomeSharp size={24} className="mr-2" />
              <span className="hidden group-hover:inline  ">Home</span>
            </Link>
            <Link
              href="/chargeNow"
              className="p-2 rounded-md flex items-center group hover:bg-gray-700"
            >
              <FaBolt size={24} className="mr-2" />
              <span className="hidden group-hover:inline  ">Charge Now</span>
            </Link>
            <Link
              href="/bookLater"
              className="p-2 rounded-md flex items-center group hover:bg-gray-700"
            >
              <RiCalendarScheduleFill size={24} className="mr-2" />
              <span className="hidden group-hover:inline  ">Book Later</span>
            </Link>
            <Link
              href="/profile"
              className="p-2 rounded-md flex items-center group hover:bg-gray-700"
            >
              <IoPersonCircle size={24} className="mr-2" />
              <span className="hidden group-hover:inline  ">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
