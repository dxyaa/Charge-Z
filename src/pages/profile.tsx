"use client";
import "tailwindcss/tailwind.css";
import React from "react";

import { Cursor } from "@/components/cursor";

import { useState } from "react";

export default function Scene2() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center text-center bg-black">
      <div
        onMouseOver={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          setIsActive(false);
        }}
        className="  flex justify-center text-center text-white items-center"
      >
        thingy
      </div>

      <Cursor isActive={isActive} />
    </div>
  );
}
