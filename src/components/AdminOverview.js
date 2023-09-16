import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import Card from "./Card";
import { BsFillCalendarDayFill, BsClockHistory } from "react-icons/bs";
import { MdEmail, MdNumbers, MdNotificationsActive } from "react-icons/md";
import {
  BiUser,
  BiSolidUserCheck,
  BiSolidUserX,
  BiSolidUserVoice
} from "react-icons/bi";

import OverviewNav from "./OverviewNav";
import AdminSidebar from "./AdminSidebar";
import Link from "next/link";

function AdminOverview() {
  const [activeTitle, setActiveTitle] = useState("Overview");
  const [visitors, setVisitors] = useState([]);
  const [visitorsCount, setVisitorsCount] = useState(0); // State to hold visitors count

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/visitors");
      const allVisitors = response.data;

      // Get today's date as a string in the format "YYYY-MM-DD"
      const todaysDate = new Date().toISOString().split("T")[0];

      // Filter visitors to include only records with today's date
      const todaysVisitors = allVisitors.filter(visitor => {
        return visitor.date === todaysDate;
      });

      // Sort the filtered data by the date field (assuming it's a string in "YYYY-MM-DD" format)
      todaysVisitors.sort((a, b) => a.date.localeCompare(b.date));

      // Set the state for visitors and targetTime
      setVisitors(todaysVisitors);
      setVisitorsCount(todaysVisitors.length); // Set the visitors count
    } catch (err) {
      console.error("Error fetching data:", err);
      // Handle the error appropriately
    }
  };

  return (
    <div className="flex bg-[rgb(241,241,241)]">
      {/* sidebar */}
      <AdminSidebar setActiveTitle={setActiveTitle} />

      {/* Cards */}
      <div className="flex flex-col ml-[20%] h-full">
        <OverviewNav activeTitle={activeTitle} setTitle={setActiveTitle} />
        <div className="grid grid-cols-4 gap-1 mt-[100px]">
          <Card>
            <div className="flex flex-col justify-center items-center text-gray-500">
              <h1 className="text-[100px] font-extrabold">
                {visitorsCount}
              </h1>
              <div className="flex space-x-3 items-center">
                <BsFillCalendarDayFill size={25} />
                <div className="text-lg">Today</div>
              </div>
              <BiUser size={30} className="mt-5" />
              <div>Visitors Expected</div>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-center items-center text-gray-500">
              <h1 className="text-[100px] font-extrabold">
                {
                  visitors.filter(visitor => visitor.status === "completed")
                    .length
                }
              </h1>
              <div className="flex space-x-3 items-center">
                <BsFillCalendarDayFill size={25} />
                <div className="text-lg">Today</div>
              </div>
              <BiSolidUserCheck size={30} className="mt-5" />
              <div>Completed Meetings</div>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-center items-center text-gray-500">
              <h1 className="text-[100px] font-extrabold">
                {
                  visitors.filter(visitor => visitor.status === "pending")
                    .length
                }
              </h1>
              <div className="flex space-x-3 items-center">
                <BsFillCalendarDayFill size={25} />
                <div className="text-lg">Today</div>
              </div>
              <BiSolidUserVoice size={30} className="mt-5" />
              <div>Pending Visits</div>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-center items-center text-gray-500">
              <h1 className="text-[100px] font-extrabold">
                {
                  visitors.filter(visitor => visitor.status === "cancelled")
                    .length
                }
              </h1>
              <div className="flex space-x-3 items-center">
                <BsFillCalendarDayFill size={25} />
                <div className="text-lg">Today</div>
              </div>
              <BiSolidUserX size={30} className="mt-5" />
              <div>Cancelled Meetings</div>
            </div>
          </Card>
        </div>

        <hr className="h-1 bg-red-200" />

        <div className="flex h-full">
          {/* Visitors History */}
          <div className="px-8 h-full py-2 w-[60%] shadow-lg rounded-lg m-4 text-black">
            <div className="flex justify-between">
              <div className="flex space-x-3 items-center">
                <h2 className="text-2xl font-bold">Visitors History</h2>
                <BsClockHistory size={30} />
              </div>
              <Link href={"/admin/Logbook"}>
                <div className="flex items-center  bg-[#4598FE] px-2 py-1 rounded-lg">
                <button className="px-3"> View All</button>
              </div>
              </Link>
            </div>

            {/* user info */}
            <div className="h-[300px] w-full">
              <table className="w-full mt-10 items-center justify-center">
                <thead className=" text-left border-b-2">
                  <tr>
                    <th className="py-2">
                      <div className="flex items-center space-x-1">
                        <BiUser size={15} />
                        <span>Name</span>
                      </div>
                    </th>
                    <th className="py-2">
                      <div className="flex items-center space-x-1">
                        <MdNumbers size={15} />
                        <span>ID</span>
                      </div>
                    </th>
                    <th className="py-2">
                      <div className="flex items-center space-x-1">
                        <MdEmail size={15} />
                        <span>Email</span>
                      </div>
                    </th>
                    <th className="py-2">
                      <div className="flex items-center space-x-1">
                        <BsFillCalendarDayFill size={15} />
                        <span>Due Date</span>
                      </div>
                    </th>
                    <th className="py-2" />
                  </tr>
                </thead>
                <tbody className="text-left">
                  {visitors.map(visitor => (
                    <tr key={visitor._id} className="px-3">
                      <td>{visitor.name}</td>
                      <td>{visitor._id.slice(0, 5)}...</td>
                      <td>{visitor.email.slice(0, 8)}...</td>
                      <td>{visitor.date}</td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col w-[35%]">
            {/* Recent Visitations */}
            <div className="w-full h-[150px] shadow-lg rounded-lg mt-5 text-black px-8 py-5">
              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-bold mb-4">Top Staff</h2>
                <ul>
                  {visitors.slice(-5).map(visitor =>
                    <li key={visitor.id}>
                      {visitor.image}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
