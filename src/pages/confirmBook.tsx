"use client"
import { Poppins } from "next/font/google";
import "tailwindcss/tailwind.css";
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Confirmation() {
  return (
    <div className="h-screen  flex justify-center border-black bg-gradient-to-r from-[#2C3E50] to-[#000000]  items-center flex-col">
    <div className="border border-7 rounded backdrop-blur bg-transparent text-white shadow-md hover:shadow-lg flex flex-col gap-11 p-36">
        <div className="text-center">
            <p className={`${poppins.variable} font-sans text-3xl   font-bold`}>
                Confirm Booking
            </p>
        </div>
        <div className="text-left"> {/* Adjusted alignment for the subtext */}
            <p className={`${poppins.variable} ft-sans text-xl  `}>
                Your charge appears to be low <br />
                The nearest booking is at Palayam (nearly 3km)
            </p>
        </div>
        <div className="flex flex-row lg:pt-10 lg:gap-11 ">
            <button className={`${poppins.variable} font-sans text-xl font-semi-bold`}>
                Cancel
            </button>
            <button className={`${poppins.variable} font-sans text-xl font-semi-bold`}>
                Confirm Booking
            </button>
            <button className={`${poppins.variable} font-sans text-xl font-semi-bold`}>
                Locate next station
            </button>
        </div>
    </div>
</div>

  );
}
