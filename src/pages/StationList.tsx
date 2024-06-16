import { useState, useEffect } from "react";
import stationdata from "../../public/stationdata.json";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import app from "@/app/firebase";

interface Station {
  id: string;
  Name: string;
  Status: boolean;
  time?: string; // Optional time property
}

export default function StationList() {
  const [stationsWithStatus, setStationsWithStatus] = useState<Station[]>([]);

  useEffect(() => {
    // Function to generate a random time string in HH:MM:SS format
    const getRandomTime = () => {
      const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
      const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    // Iterate and add random statuses and times on component mount
    const stationsWithRandomStatus = Object.values(stationdata).flatMap((cityStations) => {
      return cityStations.map((stationName, index) => {
        const status = Math.random() < 0.5;
        return {
          id: index.toString(), // You'll need unique IDs in Firestore
          Name: stationName,
          Status: status,
          time: status ? getRandomTime() : undefined,
        };
      });
    });
    setStationsWithStatus(stationsWithRandomStatus);
  }, []); 

  const addStatus = async () => {
    try {
      const db = getFirestore(app);
      const stationCollectionRef = collection(db, "stations");

      for (const station of stationsWithStatus) {
        const { id, ...stationData } = station; // Destructure to exclude ID
        
        // Create a new object without the `time` property if it's undefined
        const stationDataToUpload = station.Status 
          ? stationData 
          : { ...stationData, time: null };

        await setDoc(doc(stationCollectionRef, station.Name), stationDataToUpload);
      }

      console.log("Station data sent to Firestore successfully!");
    } catch (error) {
      console.error("Error adding station data:", error);
    }
  };

  return (
    <>
      <button onClick={addStatus} className="bg-red-300">
        Add status and send to DB
      </button>
      {/* Optionally display the stations with status for debugging */}
      <ul>
        {stationsWithStatus.map((station) => (
          <li key={station.id}>
            {station.Name}: {station.Status ? `Online at ${station.time}` : 'Offline'}
          </li>
        ))}
      </ul>
    </> 
  );  
}
  