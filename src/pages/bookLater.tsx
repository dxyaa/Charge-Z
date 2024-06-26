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
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { format } from "date-fns";
import darknexon from "./../../public/darknexon.png";
import Stationsearch from "@/components/stationSearch";
/*end of imports */

interface Station {
  Name:string
}

const BookLater = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState<Station>({
  Name:""
  });
  const currentDate = new Date();

  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });


  const handleSelect = (selectedName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      Name : selectedName,
    }));
  };


  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
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
  //for calender :
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

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
      <div className="flex justify-center items-center mt-20 w-full h-3/4   px-10">
        <div className="w-full  h-full space-y-4 flex flex-col justify-center items-center p-4">
          {/*<Calendar />*/}{" "}
          <div className="bg-slate-800 flex flex-col w-1/2 h-1/2 items-center rounded-lg  p-5 space-y-4">
            {" "}
            <div className="w-1/2 text-black">
              {/*F O R   A B H I S H E K : change this datepicker to station dropdown */}
           <Stationsearch onSelect={handleSelect}/>
            </div>
            <div className="w-1/2 text-black">
              <Datepicker
                minDate={currentDate}
                asSingle={true}
                value={value}
                onChange={handleValueChange}
                inputClassName="text-black w-full rounded-lg"
              />
            </div>
            <div className="w-1/2 ">
              {/*timepicker here*/}{" "}
              <form className="">
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></div>
                  <input
                    type="time"
                    id="time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    min="09:00"
                    max="18:00"
                    defaultValue="00:00"
                    required
                  />
                </div>
              </form>
            </div>
           
            <Link
              href="/"
              className="bg-black w-1/3 hover:bg-gray-900 rounded-lg p-2 flex text-center justify-center items-center"
            >
              <p> Confirm Booking</p>
            </Link>
          </div>
          <div className="bg-slate-800 rounded-lg w-1/2 p-2 h-1/2 space-y-14 flex justify-center flex-col ">
            <div className="flex h-1/3 w-full  justify-center items-center rounded-lg">
              {" "}
              <Image
                alt="car"
                src={darknexon}
                height={400}
                width={400}
                className="pt-4"
              ></Image>
            </div>
            <div className="">
              <div className="flex flex-row space-x-3  ">
                <div className="bg-black h-24 w-1/2 rounded-lg flex flex-col  ">
                  <div className=" text-xs  text-gray-500 pt-2 pl-2">Speed</div>
                  <div className="flex flex-row space-x-3 justify-center items-center ">
                    <div className="text-5xl">80</div>
                    <div className=" flex text-sm mt-4 font-thin ">km/h</div>
                  </div>
                </div>
                <div className="bg-black h-24 w-1/2 rounded-lg flex flex-col  ">
                  <div className=" text-xs  text-gray-500 pt-2 pl-2">
                    Charge
                  </div>
                  <div className="flex flex-row space-x-3 justify-center items-center ">
                    <div className="text-5xl">60</div>
                    <div className=" flex text-sm mt-4 font-thin ">%</div>
                  </div>
                </div>
                <div className="bg-black h-24 w-1/2 rounded-lg flex flex-col  ">
                  <div className=" text-xs  text-gray-500 pt-2 pl-2">Range</div>
                  <div className="flex flex-row space-x-3 justify-center items-center ">
                    <div className="text-5xl">440</div>
                    <div className=" flex text-sm mt-4 font-thin ">km</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="absolute bottom-5 w-1/2 px-48  ">
          <div className="rounded-xl bg-gray-800 flex justify-center items-center h-16 flex-row space-x-2">
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
            {/*<Link
            href="/profile"
            className="p-2 rounded-md flex items-center group hover:bg-gray-700"
          >
            <IoPersonCircle size={24} className="mr-2" />
            <span className="hidden group-hover:inline  ">Profile</span>
          </Link>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLater;
