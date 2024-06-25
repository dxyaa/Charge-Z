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
import { format } from "date-fns";
/*end of imports */
const BookLater = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const currentDate = new Date();

  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
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
      <div className="flex justify-center items-center mt-20 w-full h-3/4 flex-row   px-10">
        <div className="w-1/2  h-full p-4 flex flex-col space-y-5">
          {/*<Calendar />*/}{" "}
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
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4  "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="time"
                  id="time"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  min="09:00"
                  max="18:00"
                  defaultValue="00:00"
                  required
                />
              </div>
            </form>
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
