"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { RxDividerVertical } from "react-icons/rx";
import { GiNetworkBars } from "react-icons/gi";
import { FaWifi, FaBluetoothB } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiBatteryChargeLine } from "react-icons/ri";
import { IoPauseCircle } from "react-icons/io5";
import Link from "next/link";
import { IoPlayForward } from "react-icons/io5";
import { IoPlayBack } from "react-icons/io5";
import "../app/globals.css";
import darknexon from "./../../public/darknexon.png";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { FaCar } from "react-icons/fa";
import Maps from "./maps";
import RouteMaps from "./maps-old";
/* end of imports*/

interface Trip {
  distance: string;
  duration: string;
  arrivaltime: string;
}

const DashBoard = () => {
  const currentDate = new Date();

  const router = useRouter();

  const searchParams = useSearchParams();

  const Starting = searchParams?.get("Starting");
  const Destination = searchParams?.get("Destination");

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

  const [trip, setTrip] = useState<Trip>({
    distance: "",
    duration: "",
    arrivaltime: "",
  });

  const handleDistanceDurationChange = (distance: string, duration: string) => {
    const durationParts = duration.split(" ");
    let totalMinutes = 0;

    for (let i = 0; i < durationParts.length; i++) {
      if (durationParts[i].includes("hour")) {
        totalMinutes += parseInt(durationParts[i - 1]) * 60;
      } else if (durationParts[i].includes("min")) {
        totalMinutes += parseInt(durationParts[i - 1]);
      }
    }

    const now = new Date();
    now.setMinutes(now.getMinutes() + totalMinutes);
    const arrivaltime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Updating trip state
    setTrip({ distance, duration, arrivaltime });
  };

  return (
    <div className="h-screen bg-black text-white w-screen">
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

      <div className="flex justify-center items-center mt-20 w-full h-3/4 flex-row space-x-5 px-10">
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
              <IoPlayBack size={30} color={"#475569"} className="pt-1" />
              <IoPauseCircle size={40} color={"#475569"} />
              <IoPlayForward size={30} color={"#475569"} className="pt-1" />
            </div>
            <div className="px-5 text-gray-600 pt-3">
              <input
                type="range"
                min="0"
                max={3000 / 1000}
                value={2}
                className="text-gray-600 bg-gray-600 w-full"
              />
            </div>
          </div>
        </div>
        <div className="w-2/3 rounded-xl bg-slate-800 h-full flex flex-col p-5 space-y-5">
          <div className="flex h-3/4 w-full bg-black rounded-lg justify-center items-center">
            <RouteMaps
              origin="Trivandrum"
              destination="KSEB,Nemom"
              onDistanceDurationChange={(distance, duration) => {
                console.log(`Distance: ${distance}, Duration: ${duration}`);
              }}
              onChargingStationsFound={(stations) => {
                console.log("Charging Stations:", stations);
              }}
            />
          </div>
          <div className="flex flex-row space-x-5 h-full">
            <div className="bg-black h-full flex flex-col rounded-lg p-5 w-4/5">
              <div className="flex justify-start flex-row space-x-7">
                <div className="rounded-sm bg-gray-700 w-10 h-10 flex justify-center items-center">
                  <FaCar size={20} />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm">Nexon EV</div>
                  <div className="text-sm text-gray-500">
                    Nexon EV Empowered Plus LR
                  </div>
                </div>
              </div>
              <hr className="w-2/3 h-1 mx-auto my-4 bg-gray-100 border-0 rounded" />
              <div className="flex justify-between">
                <div className="flex flex-row space-x-2">
                  <div>{trip.distance}</div>
                  <div>•</div>
                  <div className="text-blue-500">{trip.duration}</div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div className="text-sm text-gray-500 mt-1">Arrival Time</div>
                  <div className="text-xl">{trip.arrivaltime}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-black space-y-5 w-1/5 rounded-lg p-5">
              <Link
                href="/"
                className="w-full bg-blue-700 h-1/2 rounded-md text-center items-center text-sm flex justify-center hover:bg-blue-600"
              >
                Find Another Station
              </Link>
              <Link
                href="/"
                className="w-full bg-red-800 h-1/2 rounded-md text-center items-center flex justify-center hover:bg-red-700"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
