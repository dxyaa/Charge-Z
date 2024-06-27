import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { RxDividerVertical } from "react-icons/rx";
import { FaWifi, FaBluetoothB } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import Datepicker from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import darknexon from "../../../public/darknexon.png";
import Stationsearch from "@/components/stationSearch";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { FaBolt } from "react-icons/fa";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import app from "@/app/firebase";

interface Bookings {
  Date: string ;
  Name: string;
  location: string | null;
}

interface Cars {
  Name: string;
  Capacity: number;
  DrainRate: number;
  Mileage: number;
}

const BookLater = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState<Bookings>({
    Date: "",
    Name: "",
    location: null,
  });

  const [carData, setCarData] = useState<Cars>({
    Name: "",
    Capacity: 0,
    DrainRate: 0,
    Mileage: 0,
  });

  const currentDate = new Date();

  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSelect = (selectedName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      Name: selectedName,
    }));
  };

  const router = useRouter();
  const { userId } = router.query;

  const searchParams = useSearchParams();
  const Car = searchParams?.get("car");

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const dayOfWeek = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
  });

  const monthAndDate = currentDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const addBookings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.Date) {
        throw new Error('Date is required.'); // Handle validation for Date input
      }
  
      const db = getFirestore(app);
      const bookingsCollectionRef = collection(db, 'bookings');
  
      // Get the time input value
      const timeInput = e.currentTarget.getElementById('time').value;
      const [hours, minutes] = timeInput.split(':').map(Number);
  
      // Create a new Date object with selected date and time
      const selectedDateTime = new Date(formData.Date);
      selectedDateTime.setHours(hours, minutes, 0, 0);
  
      const bookingData = {
        Date: Timestamp.fromDate(selectedDateTime),
        Name: formData.Name,
        location: formData.location,
      };
  
      await addDoc(bookingsCollectionRef, bookingData);
      console.log('Booking added successfully:', bookingData);
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error adding booking:', error);
      // Handle error as needed
    }
  };
  

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const db = getFirestore(app);
        if (Car) {
          const carDocRef = doc(db, `Cars/${Car}`);
          const carDoc = await getDoc(carDocRef);
          if (carDoc.exists()) {
            const carData = carDoc.data() as Cars;
            setCarData(carData);
          } else {
            console.log("No such document");
          }
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchCarData();
  }, [Car]);

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
          <div className="text-3xl">{formattedTime}</div>
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

      <form onSubmit={addBookings}>
        <div className="flex justify-center items-center mt-20 w-full h-3/4 px-10">
          <div className="w-full h-full space-y-4 flex flex-col justify-center items-center p-4">
            <div className="bg-slate-800 flex flex-col w-1/2 h-1/2 items-center rounded-lg p-5 space-y-4">
              <div className="w-1/2 text-black">
                {/* Replace with Stationsearch component */}
                <Stationsearch onSelect={handleSelect} />
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
              <div className="w-1/2">
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></div>
                  <input
                    type="time"
                    id="time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    min="09:00"
                    max="18:00"
                    defaultValue="00:00"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-black w-1/3 hover:bg-gray-900 rounded-lg p-2 flex text-center justify-center items-center"
              >
                Confirm Booking
              </button>
            </div>

            <div className="bg-slate-800 rounded-lg w-1/2 p-2 h-1/2 space-y-14 flex justify-center flex-col">
              <div className="flex h-1/3 w-full justify-center items-center rounded-lg">
                <Image
                  alt="car"
                  src={darknexon}
                  height={400}
                  width={400}
                  className="pt-4"
                />
              </div>

              <div className="">
                <div className="flex flex-row space-x-3">
                  <div className="bg-black h-24 w-1/2 rounded-lg flex flex-col">
                    <div className="text-xs text-gray-500 pt-2 pl-2">Speed</div>
                    <div className="flex flex-row space-x-3 justify-center items-center">
                      <div className="text-5xl">80</div>
                      <div className="flex text-sm mt-4 font-thin">km/h</div>
                    </div>
                  </div>
                  <div className="bg-black h-24 w-1/2 rounded-lg flex flex-col">
                    <div className="text-xs text-gray-500 pt-2 pl-2">Charge</div>
                    <div className="flex flex-row space-x-3 justify-center items-center">
                      <div className="text-5xl">60</div>
                      <div className="flex text-sm mt-4 font-thin">%</div>
                    </div>
                  </div>
                  <div className="bg-black h-24 w-1/2 rounded-lg flex flex-col">
                    <div className="text-xs text-gray-500 pt-2 pl-2">Range</div>
                    <div className="flex flex-row space-x-3 justify-center items-center">
                      <div className="text-5xl">{carData.Capacity}</div>
                      <div className="flex text-sm mt-4 font-thin">km</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="flex justify-center">
        <div className="absolute bottom-5 w-1/2 px-48">
          <div className="rounded-xl bg-gray-800 flex justify-center items-center h-16 flex-row space-x-2">
            <Link
              href="/"
              className="p-2 rounded-md flex items-center group hover:bg-gray-700"
            >
              <IoHomeSharp size={24} className="mr-2" />
              <span className="hidden group-hover:inline">Home</span>
            </Link>
            <Link
              href="/chargeNow"
              className="p-2 rounded-md flex items-center group hover:bg-gray-700"
            >
              <FaBolt size={24} className="mr-2" />
              <span className="hidden group-hover:inline">Charge Now</span>
            </Link>
            <Link
              href="/bookLater"
              className="p-2 rounded-md flex items-center group hover:bg-gray-700"
            >
              <RiCalendarScheduleFill size={24} className="mr-2" />
              <span className="hidden group-hover:inline">Book Later</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLater;
