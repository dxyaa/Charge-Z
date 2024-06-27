"use client";
import Confirmation from "@/pages/confirmBook";
import HomePage from "@/pages/homePage";
import Home from "@/pages/mainPage";
import { CarChargeProvider } from "@/components/carChargeContext";
import Login from "../pages/Login";
import Server from "@/pages/server";
import { useRouter } from "next/navigation";
export default function main() {
  return (
    <CarChargeProvider>
      <div className="flex flex-col w-screen min-h-screen">
        <div id="1">
          {/*<Server />*/}

          <Login />
        </div>
        {/*<div id="2">
      <Confirmation />
</div>*/}
      </div>
    </CarChargeProvider>
  );
}
