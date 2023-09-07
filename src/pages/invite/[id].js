import UserNav from "@/components/UserNav";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { BsFillCalendarDayFill } from "react-icons/bs";
import {
  MdEmail,
  MdLocationOn,
  MdTransgender,
  MdOutlineEditNote
} from "react-icons/md";

function InviteForm() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(
    () => {
      if (id) {
        fetchUser();
      }
    },
    [id]
  );

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/visitors/${id}`);
      const userProfile = response.data;
      setUser(userProfile);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-[#4598FE] flex h-screen items-center justify-center">
      <UserNav />
        <div className="w-[400px] flex rounded-lg bg-slate-50 shadow-lg shadow-black relative overflow-hidden">
          <Image
            src={"/bg.jpeg"}
            fill
            objectFit="cover"
            className="z-0 opacity-20"
          />
          <div className="info flex flex-col items-center text-black w-full z-10">
              <div className="w-full px-8 py-8">
                <h1 className="flex items-center justify-center font-bold text-2xl p-4 mb-5">
                  Invitation Receipt
                </h1>
                <div className="w-[90%] items-center justify-center mb-5">
                  <div className="flex items-center justify-between w-full mx-auto">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden">
                      <Image src={"/profile.png"} fill objectFit="cover" />
                    </div>
                    <div className="flex-flex-col">
                      <div className="font-bold text-2xl">
                        {user.name}
                      </div>
                      <div>
                        {user._id}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2 items-center">
                    <MdEmail />
                    <div>Email</div>
                  </div>
                  <div className="w-[60%]">
                    {user.email}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2 items-center">
                    <MdEmail />
                    <div>Host</div>
                  </div>
                  <div className="w-[60%]">
                    {user.host}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2 items-center">
                    <MdLocationOn />
                    <div>Address</div>
                  </div>
                  <div className="w-[60%]">
                    {user.address}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2 items-center">
                    <BiPhoneCall />
                    <div>Telephone</div>
                  </div>
                  <div className="w-[60%]">
                    {user.phone}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2 items-center">
                    <BsFillCalendarDayFill />
                    <div>Date</div>
                  </div>
                  <div className="w-[60%]">
                    {user.date}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2 items-center">
                    <MdTransgender />
                    <div>Gender</div>
                  </div>
                  <div className="w-[60%]">
                    {user.gender}
                  </div>
                </div>
                <div className="flex items-center px-3 py-1 bg-[#4598FE] w-[100px] rounded-lg">
                  <MdOutlineEditNote size={25} />
                  <button className="">Send Mail</button>
                </div>
              </div>
          </div>
        </div>
    </div>
  );
}

export default InviteForm;
