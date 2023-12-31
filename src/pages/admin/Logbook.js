import React, { useEffect, useState } from "react";
import { FaFilter, FaUsers } from "react-icons/fa";
import {
  BiUser,
  BiSolidTimer,
  BiSolidMessageCheck,
  BiSolidExit
} from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import axios from "axios"; // Import axios
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "react-toastify";
import AdminNav from "./AdminNav";

function Logbook() {
  const [activeTitle, setActiveTitle] = useState("Visitors Logbook");
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]); // State to hold filtered visitors
  const [error, setError] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    all: true,
    expected: false,
    checkIn: false,
    checkOut: false
  });

  // const checkin = (visitor) => {
  //   return(
  //   visitor.checkIn ? visitor.checkIn :  (<button onClick={() => handleCheckIn(visitor)}>Check In </button>)
  //   )
  // }

  // const checkout = (visitor) => {
  //   return(
  //   visitor.checkOut ? visitor.checkOut :  (<button onClick={() => handleCheckOut(visitor)}>Check Out </button>)
  //   )
  // }

//   const handleCheckIn = async(visitor) => {
//     const checkInTime = new Date();

//     visitor.checkIn = checkInTime.toLocaleTimeString()
//     try {
//       const response = await axios.put(`/api/visitor/${visitor._id}`, {
//         checkIn: visitor.checkIn,
//       });

//     if(response.status === 200){
//       toast.success("Visitor successfully checked in")
//       setVisitors([...visitors]);
//     }else{
//       toast.error("Error checking visitor in")
//     }
//   }catch(error){
//     console.error(error)
//   }
// }
//   const handleCheckOut = async(visitor) => {
//     const checkOutTime = new Date();

//     visitor.checkOut = checkOutTime.toLocaleTimeString()
//     try {
//       const response = await axios.put(`/api/visitor/${visitor._id}`, {
//         checkOut: visitor.checkOut,
//       });

//     if(response.status === 200){
//       toast.success("Visitor successfully checked out")
//       setVisitors([...visitors]);
//     }else{
//       toast.error("Error checking visitor out")
//     }
//   }catch(error){
//     console.error(error)
//   }
// }

  useEffect(() => {
    fetchVisitors();
  }, []);

  useEffect(
    () => {
      // Update filtered visitors whenever filter options change
      filterVisitors();
    },
    [filterOptions]
  );

  const fetchVisitors = async () => {
    try {
      const response = await axios.get("/api/visitors");
      setVisitors(response.data);
      setFilteredVisitors(response.data); // Initially set filtered visitors to all visitors
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred fetching data.");
      }
    }
  };

  const filterVisitors = () => {
    // Filter visitors based on filter options
    const filtered = visitors.filter(visitor => {
      if (filterOptions.all) return true;
      if (filterOptions.expected && visitor.status === "expected") return true;
      if (filterOptions.checkIn && visitor.status === "checkIn") return true;
      if (filterOptions.checkOut && visitor.status === "checkOut") return true;
      return false;
    });
    setFilteredVisitors(filtered);
  };

  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    setFilterOptions(prevOptions => ({
      ...prevOptions,
      [name]: checked
    }));
  };

  return (
    <div>
      <div className="pr-2 bg-[#f1f1f1] h-screen">
        <div className="flex text-gray-600">
          <AdminSidebar />

          <div className="flex-col ml-[20%] w-[80%]">
            <AdminNav activeTitle={activeTitle} setTitle={setActiveTitle} />
            <div className="flex mt-[110px]">
              {error &&
                <p>
                  {error}
                </p>}
              <div className="w-[15%] px-2 border-r-2 border-black h-screen fixed">
                <div className="flex space-x-2 mb-5 items-center">
                  <FaFilter size={20} />
                  <span>Filter</span>
                </div>

                <div>
                  <div className="items-center">
                    <label htmlFor="all">
                      <input
                        type="checkbox"
                        className="mr-2"
                        name="all"
                        id="all"
                        checked={filterOptions.all}
                        onChange={handleCheckboxChange}
                      />
                      All
                    </label>
                  </div>

                  <div className="items-center">
                    <label htmlFor="expected">
                      <input
                        type="checkbox"
                        className="mr-2"
                        name="expected"
                        id="expected"
                        checked={filterOptions.expected}
                        onChange={handleCheckboxChange}
                      />
                      Expected
                    </label>
                  </div>

                  <div className="items-center">
                    <label htmlFor="checkIn">
                      <input
                        type="checkbox"
                        className="mr-2"
                        name="checkIn"
                        id="checkIn"
                        checked={filterOptions.checkIn}
                        onChange={handleCheckboxChange}
                      />
                      Check In
                    </label>
                  </div>

                  <div className="items-center">
                    <label htmlFor="checkOut">
                      <input
                        type="checkbox"
                        className="mr-2"
                        name="checkOut"
                        id="checkOut"
                        checked={filterOptions.checkOut}
                        onChange={handleCheckboxChange}
                      />
                      Check Out
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full items-center justify-center ml-[20%]">
                <div className="flex w-full justify-end items-center my-2">
                  <button className=" bg-[#4598FE] px-3 py-1 rounded-lg text-white">
                    <Link href="VisitationForm">Add Visitor</Link>
                  </button>
                </div>
                <div className="h-[350px] w-full overflow-y-auto">
                <table className="items-center w-full">
                  <thead className="text-white sticky top-0">
                    <tr className="w-full bg-[#4598FE]">
                      <th className="py-2 px-1 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <BiUser />
                          <span>Visitor</span>
                        </div>
                      </th>
                      <th className="py-2 px-1 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <FaUsers />
                          <span>Host</span>
                        </div>
                      </th>
                      <th className="py-2 px-1 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <ImProfile />
                          <span>ID</span>
                        </div>
                      </th>
                      <th className="py-2 px-1 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <MdEmail />
                          <span>Email</span>
                        </div>
                      </th>
                      <th className="py-2 px-1 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <BiSolidTimer />
                          <span>Duration</span>
                        </div>
                      </th>
                      <th className="py-2 px-1 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <BiSolidMessageCheck />
                          <span>Check In</span>
                        </div>
                      </th>
                      <th className="py-2 px-3 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <BiSolidExit />
                          <span>Check Out</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVisitors.map((visitor, index) =>
                      <tr key={index} className="">
                        <td className="py-2 px-3">
                          {visitor.name}
                        </td>
                        <td className="py-2 px-3">
                          {visitor.host}
                        </td>
                        <td className="py-2 px-3">
                          {visitor._id}
                        </td>
                        <td className="py-2 px-3">
                          {visitor.email.slice(0,9)}...
                        </td>
                        <td className="py-2 px-3">
                          {visitor.duration}
                        </td>
                        <td className="py-2 px-3">
                          {visitor.checkIn}
                        </td>
                        <td className="py-2 px-3">
                          {visitor.checkOut}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logbook;
