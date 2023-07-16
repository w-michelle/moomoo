"use client";
import React, { useState } from "react";
import Menu from "./Menu";

const Page = () => {
  const [toggleActive, setToggleActive] = useState("fairview");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();

  return (
    <div className="flex flex-col items-center mx-4">
      <h1 className="text-2xl mb-4">DAILY MENU</h1>
      <h2 className="text-xl mb-4">
        {monthNames[month].toUpperCase()} {day}
      </h2>
      <div className="w-full">
        <div className="w-full">
          <button
            className={`${
              toggleActive === "fairview" ? "border-b-0" : ""
            } w-1/2 border-[1px] border-r-0 border-black text-2xl py-2`}
            onClick={() => setToggleActive("fairview")}
          >
            FAIRVIEW
          </button>
          <button
            className={`${
              toggleActive === "yorkdale" ? "border-b-0" : ""
            } w-1/2 border-[1px] border-black text-2xl py-2`}
            onClick={() => setToggleActive("yorkdale")}
          >
            YORKDALE
          </button>
        </div>
        <div>
          <Menu place={toggleActive} />
        </div>
      </div>
    </div>
  );
};

export default Page;
