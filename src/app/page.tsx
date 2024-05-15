"use client"
import Confirmation from "@/pages/confirm-book";

import Home from "@/pages/main-page";
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
