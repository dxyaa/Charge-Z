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
import Link from "next/link";



const ChargeNow = () => {
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
          <div className=" h-full w-1/2 rounded-md flex justify-center items-center flex-col space-y-5">
            <Link
              href="/"
              className="w-full bg-yellow-600 h-1/3 rounded-md text-center items-center flex justify-center hover:bg-yellow-500"
            >
              {" "}
              Find Another Station
            </Link>
            <Link
              href="/"
              className="w-full bg-red-800 h-1/3 rounded-md text-center items-center flex justify-center hover:bg-red-700"
            >
              {" "}
              Cancel
            </Link>
          </div>
        </div>
      </div>



      <div className="w-2/3 rounded-xl bg-slate-800 h-full flex flex-col p-5 space-y-5">
        <div className="flex  w-full bg-transparent  justify-center items-center">
           <p className="text-5xl p-7 mt-7 font-light w-full  text-center">
            Charge Now
           </p>
        </div>
        <div className="flex h-full w-full bg-blue-600 rounded-xl  justify-center items-center">
          <Link href={{pathname:"/dashBoard",
            query:{Starting:"",Destination:"string"}
          }}>
           <button className=" p-11 bg-slate-800  rounded-xl ">Find Nearest Station</button>
           </Link>
        </div>
       
      </div>
    </div>
  </div>
  );
};

export default ChargeNow;
