import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import app from "@/app/firebase";
import "tailwindcss/tailwind.css";
import useSocket from "./useSocket";

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
  id: string;
  Name: string;
  Car: string;
}

const Timers = () => {
  const [carList, setCarList] = useState<Car[]>([]);
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [isRunning, setIsRunning] = useState(false);
  const [userList, setUserList] = useState<Users[]>([]);

  //const socket = useSocket();

  const socket = useSocket("http://localhost:4000")

  useEffect(() => {
    if (socket) {
      socket.on("timerUpdate", (data: { timer: boolean }) => {
        console.log("Received timer update:", data);
        setIsRunning(data.timer)
      });

      return () => {
        socket.off("timerUpdate");
      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const db = getFirestore(app);
        const userCollectionRef = collection(db, "Users");
        const querySnapshot = await getDocs(userCollectionRef);

        const cars: Car[] = [];
        const users: Users[] = [];
        const carPromises: Promise<void>[] = [];

        querySnapshot.forEach((userDoc) => {
          const userData = userDoc.data() as Users;
          const userWithId = { ...userData, id: userDoc.id };
          users.push(userWithId);

          if (userData.Car) {
            const carDocRef = doc(db, `Cars/${userData.Car}`);
            const carPromise = getDoc(carDocRef).then((carDocSnap) => {
              if (carDocSnap.exists()) {
                const carData = carDocSnap.data() as Car;
                carData.id = carDocSnap.id;
                cars.push(carData);
              }
            });

            carPromises.push(carPromise);
          }
        });

        await Promise.all(carPromises);

        setUserList(users);
        setCarList(cars);

        const initialTimers = cars.reduce((acc, car) => {
          acc[car.id] = car.CurrentCharge;
          return acc;
        }, {} as { [key: string]: number });
        setTimers(initialTimers);
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
                userList.forEach((user) => {
                  if (car.id === user.Car) {
                    //socket?.emit("timerReached", { userId: user.id });
                    console.log("Car:", car.id);
                    console.log("User:", user.id);
                  }
                });
                break;
              }
            }
          }
          return newTimers;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval!);
  }, [isRunning, carList, userList]);

  const handleStartPause = () => {
    const newIsRunning = !isRunning;
  
    // Check if the state has actually changed
    if (newIsRunning !== isRunning) {
      setIsRunning(newIsRunning);
      socket?.emit("timerUpdate", { timer: newIsRunning });
      console.log("Timer status updated and emitted:", newIsRunning);
    } else {
      console.log("Timer status unchanged, no emission");
    }
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

      <div className="grid grid-cols-5 gap-4 bg-black p-2">
        {userList.map(
          (user) =>
            user.Car && (
              <li
                key={user.id}
                className="list-none bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <p className="text-white">User: {user.Name}</p>
                {carList.find((car) => car.id === user.Car) && (
                  <div className="text-gray-300">
                    <p>
                      Car: {carList.find((car) => car.id === user.Car)?.Name}
                    </p>
                    <p>Charge: {timers[user.Car]}</p>
                    <p>
                      DrainRate:{" "}
                      {carList.find((car) => car.id === user.Car)?.DrainRate}
                    </p>
                  </div>
                )}
              </li>
            )
        )}
      </div>
    </div>
  );
};

export default Timers;
