"use client";
import Confirmation from "@/pages/confirmBook";
import HomePage from "@/pages/homePage";
import Home from "@/pages/mainPage";

import { AppProps } from "next/app";
import Login from "../pages/Login";

export default function main() {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <div id="1">
        {/*<Server />*/}

        <Login />
      </div>
      {/*<div id="2">
      <Confirmation />
</div>*/}
    </div>
  );
}
