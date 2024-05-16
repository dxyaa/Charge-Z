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
    <div className="h-screen bg-black text-white flex text-center flex-col space-y-5">
      <div> server</div>
      <div>
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md w-1/6">
          Start
        </button>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col">
          <div> User : </div>
          <div> Car : </div>
          <div> Charge :</div>
          <div className="font-bold font-lg">79%</div>
        </div>
      </div>
    </div>
  );
};

export default Server;
