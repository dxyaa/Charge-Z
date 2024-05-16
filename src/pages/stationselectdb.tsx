import React, { useState, useEffect, ChangeEvent } from "react";
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

interface SearchResult {
  id: string;
  name: string;
}

interface Station {
  id: string;
  Name: string;
  Status: boolean;
}

const StationSelect: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [formData, setFormData] = useState<Station>({
    id: "",
    Name: "",
    Status: false,
  });
  const [stationList, setStationList] = useState<Station[]>([]);
  const [stationDetails, setStationDetails] = useState<Station | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addStationData = async () => {
    try {
      const db = getFirestore(app);
      const stationCollectionRef = collection(db, "stations");

      const {id, ...stationData } = formData;

      await setDoc(doc(stationCollectionRef, formData.Name), stationData);
    } catch (error) {
      console.error("Error adding car data:", error);
    }
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setFormData((prevData) => ({
      ...prevData,
      Status: e.target.checked,
    }));
  };

  useEffect(() => {
    const fetchStationList = async () => {
      try {
        const db = getFirestore(app);
        const stationCollectionRef = collection(db, "stations");
        const querySnapshot = await getDocs(stationCollectionRef);

        const station: Station[] = [];
        querySnapshot.forEach((doc) => {
          const stationData = doc.data() as Station;
          const stationWithId = { ...stationData, id: doc.id };
          station.push(stationWithId);
        });
        setStationList(station);
      } catch (error) {
        console.error("Error fetching car list:", error);
      }
    };

    fetchStationList();
  }, []);

  return (
    <div className="flex flex-col gap-lg-5 border-2 lg:w-1/2 align-self-lg-center ml-32">
      <input
        type="text"
        value={formData.Name}
        className="w-full"
        onChange={handleFormData}
        name="Name"
        placeholder="Station name"
      />
      <div className="">
      <p>Status:</p>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheck}
        className="w-6 h-6 text-black text-sm bg-transparent border-none rounded-md focus:ring-transparent  accent-black"
      />
      </div>
      

      <button onClick={addStationData}>Add Station</button>

      <h2>Station List</h2>
      <ul>
        {stationList.map((station, index) => (
          <li key={index}>
            <p>Name: {station.id}</p>
            <p>Status:{station.Status?'Active':'Inactive'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StationSelect;
