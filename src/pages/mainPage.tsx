//import "../styles/global.css";
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Home = () => {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    setId(2);
  }, []);

  const handleChargeNowClick = () => {
    setId(2);
    smoothScrollToId("2");
  };

  const smoothScrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      const start = window.pageYOffset;
      const distance = offsetTop - start;
      const duration = 750; // milliseconds

      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        window.scrollTo(0, easeInOutQuad(progress, start, distance, duration));
        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  };

  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  return (
    <div className="relative">
      <div className="relative h-screen">
        <Image
          src={"/car.png"}
          alt="bgImage"
          width={1000}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 text-white">
        <div className="mx-2 flex items-end justify-center p-2 lg:p-5 text-white">
          <div className="flex flex-1 justify-center ">
            <div className="flex flex-col space-y-4 pt-6">
              <p
                className={`${poppins.variable} font-sans text-center text-7xl font-bold`}
              >
                Charge-Z{" "}
              </p>
              <div
                className={`${poppins.variable} font-sans text-center text-xl text-slate-600`}
              ></div>
            </div>
          </div>
          <div className="flex justify-end absolute top-10 right-10">
            <Link href="/" className="p-4 rounded-lg hover:bg-gray-800">
              <IoSettingsSharp size={30} />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-28 py-11 w-full flex items-center  gap-11 justify-evenly">
          <div className="relative">
            <Link
              href={`#${id}`}
              onClick={handleChargeNowClick}
              className="font-bold text-gray-700 rounded-3xl w-64 flex items-center justify-center bg-blue-600"
              style={{ height: 100 }}
            >
              Charge Now
            </Link>
          </div>
          <div className="relative">
            <Link
              href="/"
              className="font-bold text-gray-700 rounded-3xl w-64 flex items-center justify-center bg-green-600"
              style={{ height: 100 }}
            >
              Book Later
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
