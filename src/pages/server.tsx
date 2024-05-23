import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import app from "@/app/firebase";
import "tailwindcss/tailwind.css";

interface Car {
  id: string;
  Name: string;
  UserName: string;
  Capacity: string;
  Mileage: string;
  DrainRate: string;
  CurrentCharge: number;
}

const Server = () => {
  const [formData, setFormData] = useState<Car>({
    id: "",
    Name: "",
    Capacity: "",
    UserName: "",
    Mileage: "",
    DrainRate: "",
    CurrentCharge: 0,
  });

  const [carList, setCarList] = useState<Car[]>([]);
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const fetchCarList = async () => {
      try {
        const db = getFirestore(app);
        const carCollectionRef = collection(db, "Cars");
        const querySnapshot = await getDocs(carCollectionRef);

        const cars: Car[] = [];
        querySnapshot.forEach((doc) => {
          const carData = doc.data() as Car;
          const carWithId = { ...carData, id: doc.id };
          cars.push(carWithId);
        });
        setCarList(cars);
        // Initialize timers with CurrentCharge values
        const initialTimers = cars.reduce((acc, car) => {
          acc[car.id] = car.CurrentCharge;
          return acc;
        }, {} as { [key: string]: number });
        setTimers(initialTimers);
      } catch (error) {
        console.error("Error fetching car list:", error);
      }
    };

    fetchCarList();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers };
          for (const car of carList) {
            if (newTimers[car.id] > 20) {
              newTimers[car.id] -= parseFloat(car.DrainRate);
              if (newTimers[car.id] <= 20) {
                setIsRunning(false);
                break;
              }
            }
          }
          return newTimers;
        });
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval!);
  }, [isRunning, carList]);

  const handleStartPause = () => {
    setIsRunning((prevState) => !prevState);
  };

  return (
    <div className="h-screen bg-black text-white flex text-center flex-col space-y-5">
      <div>Server</div>
      <div>
        <button
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md w-1/6"
          onClick={handleStartPause}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
      <div className="flex flex-row justify-around">
        {carList.map((car, index) => (
          <li key={index} className="list-none">
            <p>User: {car.UserName}</p>
            <p>Car: {car.Name}</p>
            <p>Charge: {timers[car.id]}</p>
            <p>DrainRate: {car.DrainRate}</p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Server;
