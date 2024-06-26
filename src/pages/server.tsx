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

interface Users {
  id:string;
  Name:string;
  Car:string;
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
  const [userList,setUserList] = useState<Users[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const db = getFirestore(app);
  
        // Fetch users first
        const userCollectionRef = collection(db, "Users");
        const querySnapshot = await getDocs(userCollectionRef);
  
        const cars: Car[] = [];
        const users: Users[] = [];
  
        querySnapshot.forEach(async (userDoc) => {
          const userData = userDoc.data() as Users;
          const userWithId = { ...userData, id: userDoc.id }; // Access id directly
          users.push(userWithId);
          setUserList(users);
  
          // Check if userData.Car exists
          if (userData.Car) {
            const carDocRef = doc(db, `Cars/${userData.Car}`);
            const carDocSnap = await getDoc(carDocRef);
  
            if (carDocSnap.exists()) {
              const carData = carDocSnap.data() as Car;
              cars.push(carData);
            } // Handle case where Car document doesn't exist for a user (optional)
          }
        });
  
        // Update car state with fetched data
        setCarList(cars);
      } catch (error) {
        console.error("Error fetching user or car data:", error);
      }
    };
  
    fetchCars();
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
                console.log("this car : ", car.id);
                //send car.id to car
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
