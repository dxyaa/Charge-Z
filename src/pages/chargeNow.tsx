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
import { IoPauseCircle } from "react-icons/io5";
import { IoPlayForward } from "react-icons/io5";
import { IoPlayBack } from "react-icons/io5";
import "../app/globals.css";
import darknexon from "./../../public/darknexon.png";

/*imports end*/
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
          <div className="flex h-1/3 w-full  justify-center items-center rounded-lg">
            {" "}
            <Image
              alt="car"
              src={darknexon}
              height={400}
              width={400}
              className=""
            ></Image>
          </div>
          <div className="flex flex-row space-x-5 ">
            <div className="bg-blue-700 h-32 w-1/2 rounded-lg flex flex-col  space-y-2">
              <div className=" text-sm pl-5 pt-4 ">Speed</div>
              <div className="flex flex-row space-x-3 justify-center items-center">
                <div className="text-7xl">80</div>
                <div className=" flex text-sm mt-10 font-thin">km/h</div>
              </div>
            </div>
            <div className="bg-blue-700 h-32 w-1/2 rounded-lg flex flex-col  space-y-2">
              <div className=" text-sm pl-5 pt-4 ">Charge</div>
              <div className="flex flex-row space-x-3 justify-center items-center">
                <div className="text-7xl">60</div>
                <div className=" flex text-sm mt-10 font-thin">%</div>
              </div>
            </div>
          </div>
          <div className="flex h-1/3 bg-black rounded-lg flex-col">
            <div className="">
              <div className="flex justify-center text-xl pt-4 font-semibold ">
                Starboy
              </div>
              <div className="flex text-gray-500 text-md justify-center text-sm">
                Weekend
              </div>
            </div>
            <div className="flex justify-around fkex-row pt-5">
              <div>
                <IoPlayBack size={30} color={"#475569"} className="pt-1" />
              </div>
              <div>
                <IoPauseCircle size={40} color={"#475569"} />
              </div>
              <div>
                <IoPlayForward size={30} color={"#475569"} className="pt-1" />
              </div>
            </div>
            <div className="px-5 text-gray-600 pt-3">
              <input
                type="range"
                min="0"
                max={3000 / 1000}
                value={2}
                className="text-gray-600 bg-gray-600 w-full "
              />
            </div>
          </div>
        </div>

        <div className="w-2/3 rounded-xl bg-slate-800 h-full flex flex-col p-5 space-y-5">
          <div className="flex  w-full bg-transparent  justify-center items-center">
            <p className="text-5xl p-7 mt-7 font-light w-full  text-center">
              Charge Now
            </p>
          </div>
          <div className="flex h-full w-full bg-black rounded-xl  justify-center items-center">
            <Link
              href={{
                pathname: "/dashBoard",
                query: { Starting: "", Destination: "string" },
              }}
            >
              <button className=" p-11 bg-slate-800  rounded-xl ">
                Find Nearest Station
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargeNow;
