"use client";
import Image from "next/image";
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
import App from "next/app";
import Maps from "./maps";
import { FaRegPauseCircle } from "react-icons/fa";
import starboy from "../../public/starboy.png";
const DashBoard = () => {
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
      <div className="flex justify-center">
        <div className="flex justify-center  items-center rounded-b-lg bg-gradient-to-r from-gray-900 to-gray-800 w-1/6 h-9 p-1">
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

      <div className="flex justify-center items-center mt-20 w-full h-3/4  flex-row space-x-5 px-10">
        <div className="w-1/3 rounded-xl bg-slate-800 h-full flex flex-col p-5 space-y-5">
          <div className="flex h-1/3 w-full bg-black justify-center items-center rounded-lg">
            {" "}
            car image here
          </div>
          <div className="flex flex-row space-x-5 ">
            <div className="bg-blue-600 h-32 w-1/2 rounded-md flex justify-center items-center">
              speed
            </div>
            <div className="bg-blue-600 h-32 w-1/2 rounded-md flex justify-center items-center">
              charge
            </div>
          </div>
          <div className="flex flex-row space-x-5 h-1/3">
            <div className=" h-full w-1/2 rounded-md flex justify-center items-center flex-col">
              <Image
                alt="starboy"
                src={starboy}
                height={200}
                width={150}
              ></Image>
              <div className="flex justify-between space-x-20">
                {" "}
                <div className="text-sm text-white mt-1 flex flex-col">
                  {" "}
                  <div>Starboy</div>
                  <div className="text-xs text-gray-400">Weekend</div>
                </div>
                <button>
                  <FaRegPauseCircle className="mt-2" size={24} />
                </button>
              </div>
            </div>
            <div className="bg-blue-600 h-full w-1/2 rounded-md flex justify-center items-center">
              2 buttons
            </div>
          </div>
        </div>
        <div className="w-2/3 rounded-xl bg-slate-800 h-full flex flex-col p-5 space-y-5">
          <div className="flex h-3/4 w-full bg-black rounded-lg  justify-center items-center">
            <Maps />
          </div>
          <div className="bg-black h-1/4 flex flex-col rounded-lg p-5">
            <div className="flex justify-start flex-row space-x-7">
              <div className="rounded-sm bg-gray-700 w-10 h-10 flex justify-center items-center">
                icon
              </div>
              <div className="flex flex-col">
                <div className="text-sm">Car Name</div>
                <div className="text-sm text-gray-500">Car name detailed</div>
              </div>
            </div>
            <hr className="w-2/3 h-1 mx-auto my-4 bg-gray-100 border-0 rounded "></hr>
            <div className="flex justify-between">
              <div className="flex flex-row space-x-2">
                <div>x km</div>
                <div>•</div>
                <div className="text-blue-600">y min</div>
              </div>
              <div className="flex flex-row space-x-2">
                <div className="text-sm text-gray-500 mt-1"> Arrival Time</div>
                <div className="text-xl"> 00:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
