"use client";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import app from "@/app/firebase";
import "tailwindcss/tailwind.css";

interface SearchResult {
  id: string;
  name: string;
}

interface Car {
  Name: string;
  Capacity: string;
}

interface CarsearchProps {
  onSelect: (selectedName: string) => void;
}

const Carsearch: React.FC<CarsearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [capacity, setCapacity] = useState<string | null>(null);
  const [formData, setFormData] = useState<Car>({
    Name: "",
    Capacity: "",
  });

  const handleSearch = async (queryStr: string) => {
    console.log("Connected to Collections");
    setSearchTerm(queryStr);
    if (!queryStr.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const db = getFirestore(app);
      const carCollectionRef = collection(db, "Cars");
      const querySnapshot = await getDocs(carCollectionRef);

      const results: SearchResult[] = [];
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        results.push({
          id,
          name: id,
        });
      });

      const filteredResults = results.filter((result) =>
        result.name.toLowerCase().includes(queryStr.toLowerCase())
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSelect = async (selectedItem: SearchResult) => {
    setSelectedItem(selectedItem);
    setSearchTerm(selectedItem.name);
    setSearchResults([]);
    onSelect(selectedItem.name);

    try {
      const db = getFirestore(app);
      const carDocRef = doc(db, "Cars", selectedItem.id);
      const carDocSnapshot = await getDoc(carDocRef);
      const carData = carDocSnapshot.data() as Car | undefined;

      if (carData) {
        setCapacity(carData.Capacity);

        const capacityNumericPart = carData.Capacity.match(/\d+(?=\s*Km)/)?.[0];
        console.log("Data to be sent to the model:", capacityNumericPart);
      }
    } catch (error) {
      console.error("Error fetching car capacity:", error);
    }
  };

  return (
    <div className=" flex flex-col  ">
      <input
        type="text"
        value={searchTerm}
        className="w-full rounded-md text-black"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Car name"
      />
      {searchResults.length > 0 && (
        <ul className="bg-white text-black rounded-md">
          {searchResults.map((result) => (
            <li
              key={result.id}
              onClick={() => handleSelect(result)}
              className="hover:bg-gray-300 p-2"
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
      {/*{selectedItem && capacity && (
        <div>
          Capacity of {selectedItem.name} is {capacity}
        </div>
      )}*/}
    </div>
  );
};

export default Carsearch;
