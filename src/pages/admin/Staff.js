import AdminSidebar from "@/components/AdminSidebar";
import OverviewNav from "@/components/OverviewNav";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Staff() {
    const [staff, setStaff] = useState([]);
    const [activeTitle, setActiveTitle] = useState("Staff Management");
    const [error, setError] = useState("");
  
    useEffect(() => {
      fetchStaff();
    }, []);
  
    const fetchStaff = async () => {
      try {
        const response = await axios.get("/api/employees");
        setStaff(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred fetching data.");
        }
      }
  };
    return (
      <div>
         <div className="pr-2 bg-[#f1f1f1] h-screen">
          <div className="flex text-gray-600">
            <AdminSidebar />
  
            <div className="flex-col ml-[20%] w-[80%]">
              <OverviewNav activeTitle={activeTitle} setTitle={setActiveTitle} />
              <div className="flex flex-col mt-[110px]">
                {error &&
                  <p>
                    {error}
                  </p>}
                    
                <div className="flex w-full justify-end pr-14 text-white cursor-pointer">
                  <Link href={"./NewStaff"}><button className="bg-[#4598FE] px-3 py-1 rounded-lg hover:">Add Staff</button></Link>
                </div>
                  <div className="w-full flex items-center justify-center overflow-y-auto max-h-[400px] my-5">
                    <div className="w-[90%]">
                      <table className="w-full h-full">
                        <thead className="text-white sticky top-0">
                          <tr className="bg-[#4598FE]">
                            <th className="py-1">Name</th>
                            <th className="py-1">Department</th>
                            <th className="py-1">Position</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                            {staff.map(staff =>
                              <tr key = {staff._id}>
                                <td className="py-2">
                                  {staff.username}
                                </td>
                                <td className="py-2">
                                  {staff.department}
                                </td>
                                <td className="py-2">
                                  {staff.position}
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
  )
}

export default Staff
