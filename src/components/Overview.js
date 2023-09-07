import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import Card from "./Card";
import { BsFillCalendarDayFill, BsClockHistory } from "react-icons/bs";
import { MdEmail, MdNumbers, MdNotificationsActive } from "react-icons/md";
import {
  BiUser,
  BiSolidUserCheck,
  BiSolidUserX,
  BiSolidUserVoice,
} from "react-icons/bi";
import Sidebar from "./Sidebar";
import OverviewNav from "./OverviewNav";
import Countdown from "react-countdown";

const CountDownRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>Time to start meeting</span>;
  } else {
    return (
      <div>
        <span>{hours}h</span>
        <span>{minutes}m</span>
        <span>{seconds}s</span>
      </div>
    );
  }
};

function Overview() {
  const [targetTime, setTargetTime] = useState(0);
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
      const todaysVisitors = allVisitors.filter((visitor) => {
        return visitor.date === todaysDate;
      });

      // Sort the filtered data by the date field (assuming it's a string in "YYYY-MM-DD" format)
      todaysVisitors.sort((a, b) => a.date.localeCompare(b.date));

      // Set the state for visitors and targetTime
      setVisitors(todaysVisitors);
      setVisitorsCount(todaysVisitors.length); // Set the visitors count
      setTargetTime(response.data.time);
    } catch (err) {
      console.error("Error fetching data:", err);
      // Handle the error appropriately
    }
  };

  return (
    <div className="flex bg-[rgb(241,241,241)]">
      {/* sidebar */}
      <Sidebar setActiveTitle={setActiveTitle} />

      {/* Cards */}
      <div className="flex flex-col ml-[20%]">
        <OverviewNav activeTitle={activeTitle} setTitle={setActiveTitle} />
        <div className="grid grid-cols-4 gap-1 mt-[100px]">
          <Card>
            <div className="flex flex-col justify-center items-center text-gray-500">
              <h1 className="text-[100px] font-extrabold">{visitorsCount}</h1>
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
                {visitors.filter((visitor) => visitor.status === "completed").length}
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
                {visitors.filter((visitor) => visitor.status === "pending").length}
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
                {visitors.filter((visitor) => visitor.status === "cancelled").length}
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

        <div className="flex">
          {/* Visitors History */}
          <div className="px-8 py-3 w-[60%] shadow-lg rounded-lg m-4 text-black h-[70%]">
            <div className="flex justify-between">
              <div className="flex space-x-3 items-center">
                <h2 className="text-2xl font-bold">Visitors History</h2>
                <BsClockHistory size={30} />
              </div>
              <div className="flex items-center  bg-[#4598FE] px-2 py-1 rounded-lg">
                <button className="px-3"> View All</button>
              </div>
            </div>

            {/* user info */}
            <table className="w-full mt-10 h-[90%]">
              <thead>
                <tr>
                  <th className="py-3 text-left">
                    <div className="flex items-center space-x-1">
                      <BiUser size={15} />
                      <span>Name</span>
                    </div>
                  </th>
                  <th className="py-3 text-left">
                    <div className="flex items-center space-x-1">
                      <MdNumbers size={15} />
                      <span>ID</span>
                    </div>
                  </th>
                  <th className="py-3 text-left">
                    <div className="flex items-center space-x-1">
                      <MdEmail size={15} />
                      <span>Email</span>
                    </div>
                  </th>
                  <th className="py-3 text-left">
                    <div className="flex items-center space-x-1">
                      <BsFillCalendarDayFill size={15} />
                      <span>Due Date</span>
                    </div>
                  </th>
                  <th className="py-3" />
                </tr>
              </thead>
              <tbody className="py-3">
                {/* Your table body rows go here */}
                {visitors.map((visitor) => (
                  <tr className="py-5" key={visitor.id}>
                    <td>{visitor.name}</td>
                    <td>{visitor.id}</td>
                    <td>{visitor.email}</td>
                    <td>{visitor.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col w-[35%]">
            {/* Recent Visitations */}
            <div className="w-full h-[150px] shadow-lg rounded-lg mt-5 text-black px-8 py-5">
              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-bold mb-4">Recent Visitors</h2>
                <ul>
                  {visitors.slice(-5).map((visitor) => (
                    <li key={visitor.id}>{visitor.image}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Notifications */}
            <div className="w-full shadow-lg rounded-lg mt-5 text-black px-8 py-5">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center  space-x-2">
                    <h2 className="text-2xl font-bold">Notifications</h2>
                    <MdNotificationsActive size={25} />
                  </div>
                  <div className="flex space-x-3 items-center text-gray-500">
                    <BsFillCalendarDayFill size={25} />
                    <div className="text-lg">Today</div>
                  </div>
                </div>

                {visitors.slice(-5).map((visitor) => (
                  <div className="flex justify-between items-center py-3 mt-4" key={visitor.id}>
                    <div>{visitor.name}</div>
                    <div>{visitor.date}</div>
                    <div className="px-2 py-1 bg-slate-700 rounded-sm text-white">
                      <Countdown
                        date={targetTime} // Set the target time
                        renderer={CountDownRenderer}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;