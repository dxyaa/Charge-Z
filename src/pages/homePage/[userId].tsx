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
import BookLater from "../bookLater";
import ChargeNow from "../chargeNow";
import Profile from "../profile";
import { Cursor } from "@/components/cursor";
import CircularProgressBar from "@/components/battery";
import { Poppins } from "next/font/google";
import { FaCar } from "react-icons/fa";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import ImmCharge from "../immCharge";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { Roboto } from "next/font/google";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "@/app/firebase";

import { useSearchParams } from "next/navigation";


import { createContext, useContext } from "react";
import io from "socket.io-client";
import { useSocket } from "@/components/websocketcontext";

/*end of imports*/
/*const typewriter = new Typewriter("#typewriter", {
  strings: ["Hello", "World"],
  autoStart: true,
});*/

interface WebSocketContextType {
  timerReached: boolean;
  setTimerReached: React.Dispatch<React.SetStateAction<boolean>>;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);
interface Users {
  id: string;
  Name: string;
  Car: string;
}

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});
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
  const iconSize = 60;
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

  // FOR A B H I S H E K : the video currently disappears after playing has ended,which is handled just above with useeffect above.

  const [videoFinished, setVideoFinished] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userData, setUserData] = useState<Users[]>([]);
  const onChangeProgress = () => {
    setProgress((prev) => prev + 20);
  };
  const [userName, setUserName] = useState("");
  const COLORS = ["#1E67C6", "#ADD8E6"];
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(150% 150% at 50% 0%, #020617 50%,${color})`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const router = useRouter();
  const { userId } = router.query;

  const locParams = useSearchParams();
  const loc = locParams?.get("loc");

  const border = useMotionTemplate`1px  ${color}`;
  const boxShadow = useMotionTemplate`8px 4px 24px ${color}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getFirestore(app);
        const userCollectionRef = collection(db, "Users");
        console.log("starting fetch using  ", userId);

        if (userId) {
          const userDocRef = doc(db, `Users/${userId}`);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = { ...userDoc.data(), id: userDoc.id } as Users;
            setUserData([userData]);
            setUserName(userData.Name);
            console.log(userData);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const [map, setMap] = useState<google.maps.Map | null>(null);


  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //websocket

  const socket = useSocket();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (socket) {
      socket.on("timerReached", ({ userId: reachedUserId }) => {
        if (reachedUserId === userId) {
          setMessage("Hello");
          console.log("hello");
        }
      });

      return () => {
        socket.off("timerReached");
      };
    }
  }, [socket, userId]);
  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative h-screen overflow-hidden w-screen bg-black"
    >
      <div className="relative h-screen overflow-hidden w-screen">
        {!videoFinished && (
          <video
            autoPlay
            muted
            className={`absolute inset-0 z-0 w-full h-full object-cover mr-12 transform scale-200 transition-opacity duration-1500 ${
              videoFinished
                ? "opacity-0 ease-in-out-back"
                : "opacity-100 ease-in-out-back" // Smoother easing
            }`}
          >
            <source src="/charge-z-2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <motion.div
          style={{ border }}
          className="z-50 flex flex-col gap-7 justify-center items-center text-center text-white  text-4xl font-bold pt-36"
        >
          <div
            className={` ${
              poppins.variable
            } flex justify-center items-center text-center text-white font-light text-6xl pt-14 transition-opacity duration-1000 ${
              videoFinished ? "opacity-100 ease-out" : "opacity-0 ease-in"
            }`}
          >
            Welcome Back, {userName}
          </div>
          <div className="font-light text-gray-400 text-lg">
            <Typewriter
              options={{
                strings: ["Some ev stuff!", "Ev stuff pnem"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>

          <div
            className={` flex justify-center items-center    transition-opacity duration-1000 
            ${videoFinished ? "opacity-100 ease-out" : "opacity-0 ease-in"}`}
          >
            {/* <FaCar className="absolute  " size={iconSize} />*/}
            <div
              onMouseOver={() => {
                setIsActive(true);
              }}
              onMouseLeave={() => {
                setIsActive(false);
              }}
              className="flex flex-col  absolute"
            >
              <svg width="300" height="300">
                <circle
                  cx="150"
                  cy="150"
                  r="80"
                  fill="transparent"
                  stroke="#36454F"
                  strokeWidth="4"
                />
                <text
                  x="150"
                  y="150"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFFFFF"
                >
                  <tspan className="flex flex-col font-extralight text-7xl">
                    <tspan className="font-light">80</tspan>
                  </tspan>
                </text>
              </svg>
              {/* <div className="text-xs text-gray-600 pt-1">km/h</div>*/}
            </div>
            <CircularProgressBar strokeWidth={2} sqSize={220} progress={60} />
          </div>
          <div>
            <button
              className="p-2 bg-black text-white"
              onClick={() => setIsModalOpen(true)}
            >
              {" "}
              open
            </button>
          </div>
        </motion.div>
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

            {/*<div>
           <GiNetworkBars />
         </div>*/}
          </div>
        </div>
        <div
          className={`absolute bottom-5 w-1/2 px-48    ${
            videoFinished ? "opacity-100 ease-out" : "opacity-0 ease-in"
          }`}
        >
          <div className="rounded-xl bg-gray-800 flex justify-center items-center h-16 flex-row space-x-2">
            <Link
              href="/"
              className="p-2 rounded-md flex items-center group hover:bg-gray-700"
            >
              <IoHomeSharp size={24} className="mr-2" />
              <span className="hidden group-hover:inline  ">Home</span>
            </Link>
            <Link
              href={{
                pathname: `/chargeNow/${userId}`,
                query: { car: userData[0]?.Car },
              }}
              className="p-2 rounded-md flex items-center group hover:bg-gray-700"
            >
              <FaBolt size={24} className="mr-2" />
              <span className="hidden group-hover:inline  ">Charge Now</span>
            </Link>
            <Link
              href={{
                pathname: `/bookLater/${userId}`,
                query: { car: userData[0]?.Car },
              }}
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
      <Cursor isActive={isActive} />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center w-screen h-screen  justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black text-white w-1/2 h-2/5 p-6 rounded-lg shadow-lg flex-flex-col">
            <div className="h-4/5">
              <div className="">
                <p className="text-md text-gray-500 p-4 ">Your charge is at</p>
                <div className="text-8xl text-center">20%</div>
                <p className="text-gray-500 text-center mt-4">
                  We recommend you to charge now for best effeciency.
                </p>
              </div>
            </div>
            <div className="flex justify-center h-1/5 flex-col space-y-2 items-center">
              <Link
                href="/immCharge"
                className="bg-green-500 hover:bg-green-400 hover:text-white text-white w-1/4 p-2 rounded-md flex h-32 justify-center items-center"
              >
                Charge Now
              </Link>
              <button
                className="bg-white text-black hover:bg-gray-300 w-1/4 p-2 flex rounded-md h-32 justify-center items-center"
                onClick={() => setIsModalOpen(false)}
              >
                Remind me later
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default HomePage;
