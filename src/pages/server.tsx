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
const Server = () => {
  return (
    <div className="h-screen bg-black text-white flex justify-center ">
      server
      <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md">
        Start
      </button>
    </div>
  );
};

export default Server;
