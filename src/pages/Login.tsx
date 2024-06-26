"use client";
import "tailwindcss/tailwind.css";
import React, { useRef, useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "@/app/firebase";
import "tailwindcss/tailwind.css";
import Carsearch from "@/components/carSearch";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Login {
  id: string;
  Name: string;
  Car: string;
  Location: string;
}

interface LoginProps {
  onLocationEntered: (location: string) => void;
}

const Login: React.FC = ({}) => {
  const [formData, setFormData] = useState<Login>({
    id: "",
    Name: "",
    Car: "",
    Location: "",
  });
  const [putdocID, setDocID] = useState<string | null>(null); // State to hold the document ID
  const [location, setLocation] = useState<string>("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    if (loadError) {
      console.error("Error loading Google Maps API:", loadError);
    }
  }, [loadError]);

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const searchLocation = () => {
    if (!locationRef.current || !locationRef.current.value) {
      alert("Please enter a location.");
      return;
    }

    const geocoder = new google.maps.Geocoder();
    const address = locationRef.current.value;

    geocoder.geocode({ address }, (results, status) => {
      if (
        status === google.maps.GeocoderStatus.OK &&
        results &&
        results[0].geometry.location
      ) {
        console.log("Location added successfuly");
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const addUserData = async () => {
    try {
      const db = getFirestore(app);
      const userCollectionRef = collection(db, "Users");

      const userData = {
        Name: formData.Name,
        Car: formData.Car,
      };

      const docRef = await addDoc(userCollectionRef, userData);
      console.log("Document ID:", docRef.id);
      const userId = docRef.id; // Log the generated document ID
      setDocID(userId);
    } catch (error) {
      console.error("Error adding user data:", error);
    }
  };

  const handleSelect = (selectedName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      Car: selectedName,
    }));
  };

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <>
      <div className=" flex h-screen w-screen border-2 justify-center bg-black text-white">
        <div className="w-1/3  flex flex-col space-y-2 p-5 text-center">
          <div>
            <input
              type="text"
              name="Name"
              className="w-full rounded-md text-black"
              onChange={handleFormData}
              value={formData.Name}
              placeholder="Name"
            />
          </div>
          <div>
            <Carsearch onSelect={handleSelect} />
          </div>
          <div>
            <Autocomplete>
              <input
                name="Location"
                onChange={handleFormData}
                value={formData.Location}
                type="text"
                placeholder="Enter location"
                ref={locationRef}
                className="text-black rounded-md w-full"
              />
            </Autocomplete>
          </div>

          <div className="flex justify-center bg-red-100">
            {/*<button
              onClick={searchLocation}
              className="p-2 bg-blue-600  hover:bg-blue-500 w-1/2 rounded-md  "
            >
              Search Charging Stations
            </button>*/}

            <Link
              href={{
                pathname: `/homePage/${putdocID}`,
                query: { loc: formData?.Location },
              }}
              onClick={addUserData}
              className="p-2 bg-blue-600  hover:bg-blue-500 w-1/2 rounded-md "
            >
              Add User
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
