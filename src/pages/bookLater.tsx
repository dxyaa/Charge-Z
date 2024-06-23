"use client";
import "tailwindcss/tailwind.css";
import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { RxDividerVertical } from "react-icons/rx";
import { GiNetworkBars } from "react-icons/gi";
import { FaWifi, FaBluetoothB } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiBatteryChargeLine } from "react-icons/ri";
import { IoPauseCircle } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { FaBolt } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoPersonCircle } from "react-icons/io5";
import Link from "next/link";
import Calendar from "@/components/calender";
const BookLater = () => {
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
  return (
    <div className="h-screen bg-black text-white w-screen">
      {" "}
      <div className="flex justify-center">
        <div className="flex justify-center items-center rounded-b-lg bg-gradient-to-r from-gray-900 to-gray-800 w-1/6 h-9 p-1">
          <TiWeatherPartlySunny />
          <p className="ml-2 text-sm font-bold">24°C</p>
        </div>
      </div>
      <div className="absolute top-5 left-5">
        <div className="flex flex-col">
          <div className="text-3xl ">{formattedTime}</div>
          <div className="flex flex-row text-sm">
            <div>{dayOfWeek}</div>
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
          <FaBluetoothB size={20} />
          <FaLocationDot size={18} />
          <FaWifi size={20} />
        </div>
      </div>
      <div className="flex justify-center items-center mt-20 w-full h-3/4 flex-row space-x-5 bg-gray-800 px-10">
        <div>
          hi
          <Calendar />
        </div>
      </div>
      <div className="absolute bottom-5 w-full px-48  ">
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
  );
};

export default BookLater;
