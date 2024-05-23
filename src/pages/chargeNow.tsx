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
import nexonside2 from "./../../public/nexonside2.png";
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
        <div className="w-2/3 rounded-xl bg-slate-800 h-full flex flex-col p-8 space-y-5">
          <div className="flex h-1/3 w-full flex-row justify-center rounded-lg">
            {" "}
            <Image alt="car" src={darknexon} height={500} width={400}></Image>
          </div>

          <div className="flex justify-start flex-row space-x-7">
            <div className="rounded-sm bg-gray-700 w-10 h-10 flex justify-center items-center">
              icon
            </div>
            <div className="flex flex-col">
              <div className="text-md font-semibold">Nexon EV</div>
              <div className="text-sm text-gray-500">
                Nexon EV Empowered Plus LR
              </div>
            </div>
          </div>

          <hr className="w-full h-1 mx-auto my-4 bg-gray-700 border-0 rounded  "></hr>
          <div className="flex flex-row space-x-5 ">
            <div className="bg-black h-32 w-1/2 rounded-lg flex flex-col  space-y-2">
              <div className=" text-sm pl-5 pt-4 ">Speed</div>
              <div className="flex flex-row space-x-3 justify-center items-center">
                <div className="text-7xl">80</div>
                <div className=" flex text-sm mt-10 font-thin">km/h</div>
              </div>
            </div>

            <div className="bg-black h-32 w-1/2 rounded-lg flex flex-col  space-y-2">
              <div className=" text-sm pl-5 pt-4 ">Kms left</div>
              <div className="flex flex-row space-x-3 justify-center items-center">
                <div className="text-7xl">43 </div>
                <div className=" flex text-sm mt-10 font-thin">km</div>
              </div>
            </div>
            <div className="bg-black h-32 w-1/2 rounded-lg flex flex-col  space-y-2">
              <div className=" text-sm pl-5 pt-4 ">Charge</div>
              <div className="flex flex-row space-x-3 justify-center items-center">
                <div className="text-7xl">60</div>
                <div className=" flex text-sm mt-10 font-thin">%</div>
              </div>
            </div>
            <div className="bg-black h-32 w-1/2 rounded-lg flex flex-col  space-y-2">
              <div className=" text-sm pl-5 pt-4 ">Range</div>
              <div className="flex flex-row space-x-3 justify-center items-center">
                <div className="text-7xl">350</div>
                <div className=" flex text-sm mt-10 font-thin">km</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full h-1/2 justify-between items-center ">
            <Link
              href="/"
              className=" w-1/4 h-1/2 flex justify-center items-center bg-red-800 rounded-xl hover:bg-red-700 "
            >
              Cancel
            </Link>
            <Link
              href="/"
              className=" w-1/4 h-1/2 flex justify-center items-center bg-blue-700  rounded-xl hover:bg-blue-600 "
            >
              <div className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full  group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Find nearest station
                </span>
                <span className="relative invisible">Find nearest station</span>
              </div>
            </Link>
            <Link
              href={{
                pathname: "/dashBoard",
                query: { Starting: "", Destination: "string" },
              }}
            >
              confirm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargeNow;
