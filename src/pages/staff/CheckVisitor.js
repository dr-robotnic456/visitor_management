import Auth from "@/components/Auth";
import Image from "next/image";
import React, { useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { BsFillCalendarDayFill, BsGenderTrans } from "react-icons/bs";
import { MdEmail, MdLocationOn, MdTransgender, MdOutlineEditNote} from "react-icons/md";

function CheckVisitor() {
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [checkTime, setCheckTime] = useState(null);

    const toggleCheckInOut = () => {
      if (isCheckedIn) {
        // If currently checked in, set the check-out time and disable the button
        setCheckTime(new Date());
        setIsCheckedIn(false);
      } else {
        // If currently checked out, set the check-in time and enable the button
        setCheckTime(new Date());
        setIsCheckedIn(true);
      }
    };
  return (
    <div className="bg-[#4598FE] flex items-center justify-center h-screen">
      <div className="w-[400px] flex rounded-lg bg-slate-50 shadow-lg shadow-black relative overflow-hidden">
        <Image
          src={"/bg.jpeg"}
          fill
          objectFit="cover"
          className="z-0 opacity-20"
          alt="bg"
        />
        <div className="info flex flex-col items-center text-black w-full z-10">
          <div className="w-full px-8 py-8">
            <h1 className="flex items-center justify-center font-bold text-2xl p-4 mb-5">
              Visitors Profile
            </h1>
            <div className="w-[90%] items-center justify-center mb-5">
              <div className="flex items-center justify-between w-full mx-auto">
                <div className="relative h-24 w-24 rounded-full overflow-hidden">
                  <Image src={"/profile.png"} fill objectFit="cover" alt="profile"/>
                </div>
                <div className="flex-flex-col">
                <div className="font-bold text-2xl">Gyamfi Austine</div>
                <div>#232343433g</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2 items-center">
                <MdEmail />
                <div>Email</div>
              </div>
              <div className="w-[60%]">Gyamfi Austine@gmail.com</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2 items-center">
                <MdEmail />
                <div>Host</div>
              </div>
              <div className="w-[60%]">Joseph Eshun</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2 items-center">
                <MdLocationOn />
                <div>Address</div>
              </div>
              <div className="w-[60%]">Gyamfi Austine</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2 items-center">
                <BiPhoneCall />
                <div>Telephone</div>
              </div>
              <div className="w-[60%]">Gyamfi Austine</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2 items-center">
                <BsFillCalendarDayFill />
                <div>Date</div>
              </div>
              <div className="w-[60%]">Gyamfi Austine</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2 items-center">
                <MdTransgender />
                <div>Gender</div>
              </div>
              <div className="w-[60%]">Male</div>
            </div>
            <div className="flex items-center px-3 py-1 bg-[#4598FE] rounded-lg">
                <button onClick={toggleCheckInOut} className="w-full">{isCheckedIn ? "Check In" : "Check Out"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth(CheckVisitor)
