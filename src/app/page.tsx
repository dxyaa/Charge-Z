"use client";
import Confirmation from "@/pages/confirmBook";

import Home from "@/pages/mainPage";
export default function main() {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <div id="1">
        <Home />
      </div>
      <div id="2">
        <Confirmation />
      </div>
    </div>
  );
}
