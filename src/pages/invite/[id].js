import UserNav from "@/components/UserNav";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BiPhoneCall, BiUserCircle, BiSolidUserPin } from "react-icons/bi";
import { BsFillCalendarDayFill, BsFillSendFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { MdEmail, MdLocationOn} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

    
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
    [id, fetchUser]
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
  
  const sendEmail = () => {
    const userData = {
      name:user.name,
      id:user.id,
      email:user.email,
      host:user.host,
      address:user.address,
      phone:user.telephone,
      date:user.date,
      time:user.time
    }

    axios.post("/api/send", userData)
    .then((response) => {
      toast.success("Message sent successfully", response.data)
      router.push("/UserDashboard")
    })
    .catch((error) => {
      toast.error("Error sending message", error)
    })
  }
  return (
    <div className="bg-[#4598FE] flex h-screen items-center justify-center">
      <UserNav />
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
                <ToastContainer />
                <h1 className="flex items-center justify-center font-bold text-2xl p-4 mb-5">
                  Invitation Receipt
                </h1>
                    <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2 items-center">
                    <BiUserCircle />
                    <div>Name</div>
                  </div>
                  <div className="w-[60%]">
                    {user.name}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2 items-center">
                    <BiSolidUserPin />
                    <div>Id</div>
                  </div>
                  <div className="w-[60%]">
                    {user._id}
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
                    <FaUserTie />
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
                    <BsFillCalendarDayFill />
                    <div>Time</div>
                  </div>
                  <div className="w-[60%]">
                    {user.time}
                  </div>
                </div>
                <div className="flex items-center text-white justify-center py-1 bg-[#4598FE] w-full rounded-lg space-x-3">
                  <BsFillSendFill size={15} />
                  <button onClick={sendEmail}>Send Mail</button>
                </div>
              </div>
          </div>
        </div>
    </div>
  );
}

export default InviteForm;
