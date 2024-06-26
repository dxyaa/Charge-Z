"use client";
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

const Login: React.FC<LoginProps> = ({ onLocationEntered }) => {
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

  const router = useRouter();

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
      console.log("Document ID:", docRef.id); // Log the generated document ID
      setDocID(docRef.id);

      router.push(`/homePage/${docRef.id}`); // Navigate to the HomePage with the userID
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
      <div className="flex flex-col h-full gap-lg-5 border-2 lg:w-1/2 align-self-lg-center ml-32">
        <div>
          <input
            type="text"
            name="Name"
            className="w-full"
            onChange={handleFormData}
            value={formData.Name}
            placeholder="Name"
          />
        </div>
        <Carsearch onSelect={handleSelect} />
        <Autocomplete>
          <Input
            name="Location"
            onChange={handleFormData}
            value={formData.Location}
            type="text"
            placeholder="Enter location"
            ref={locationRef}
          />
        </Autocomplete>

        <Button onClick={searchLocation}>Search Charging Stations</Button>
      
        <Button onClick={addUserData}>Add User</Button>
        
      </div>
    </>
  );
};
export default Login;
