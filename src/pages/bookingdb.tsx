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
import DatePicker from "react-datepicker";

interface SearchResult {
  id: string;
  name: string;
}

interface Bookings {
  id: string;
  Name: string;
  Date: number ;
  Time: number ;
}

const BookingsSelect: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState<Bookings>({
    id: "",
    Name: "",
    Date: 0,
    Time: 0,
  });
  const [BookingsList, setBookingsList] = useState<Bookings[]>([]);
  const [BookingsDetails, setBookingsDetails] = useState<Bookings | null>(null);

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addBookingsData = async () => {
    try {
      const db = getFirestore(app);
      const BookingsCollectionRef = collection(db, "bookings");

      const {id, ...BookingsData } = formData;

      await setDoc(doc(BookingsCollectionRef, formData.Name), BookingsData);
    } catch (error) {
      console.error("Error adding car data:", error);
    }
  };

  useEffect(() => {
    const fetchBookingsList = async () => {
      try {
        const db = getFirestore(app);
        const BookingsCollectionRef = collection(db, "bookings");
        const querySnapshot = await getDocs(BookingsCollectionRef);

        const Bookings: Bookings[] = [];
        querySnapshot.forEach((doc) => {
          const BookingsData = doc.data() as Bookings;
          const BookingsWithId = { ...BookingsData, id: doc.id };
          Bookings.push(BookingsWithId);
        });
        setBookingsList(Bookings);
      } catch (error) {
        console.error("Error fetching car list:", error);
      }
    };

    fetchBookingsList();
  }, []);

  return (
    <div className="border-2 flex flex-col gap-lg-5  lg:w-1/2 align-self-lg-center ml-32">
      <input
        type="text"
        value={formData.Name}
        className="w-full"
        onChange={handleFormData}
        name="Name"
        placeholder="Car name"
      />
    <input
        type="text"
        value={formData.Date}
        className="w-full"
        onChange={handleFormData}
        name="Date"
        placeholder="Date"
      />
        <input
        type="text"
        value={formData.Time}
        className="w-full"
        onChange={handleFormData}
        name="Time"
        placeholder="Timer"
      />


   

      <button onClick={addBookingsData}>Add Bookings</button>

      <h2>Bookings List</h2>
      <ul>
        {BookingsList.map((Bookings, index) => (
          <li key={index}>
            <p>Name: {Bookings.id}</p>
            <p>Date:{Bookings.Date}</p>
            <p>Time:{Bookings.Time}</p>
            <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsSelect;
