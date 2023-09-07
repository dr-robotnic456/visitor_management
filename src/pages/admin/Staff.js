import AdminSidebar from "@/components/AdminSidebar";
import OverviewNav from "@/components/OverviewNav";
import axios from "axios";
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
        const response = await axios.get("/api/staff");
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
              <div className="flex mt-[110px]">
                {error &&
                  <p>
                    {error}
                  </p>}
  
                <div className="w-full flex">
                  <div className="w-full flex items-center justify-center overflow-y-auto h-[350px]">
                    <div className="w-[90%] h-[90%]">
                      <table className="w-full h-full">
                        <thead className="text-white sticky top-0">
                          <tr className="bg-[#4598FE]">
                            <th className="py-1">Department</th>
                            <th className="py-1">No. of Members</th>
                          </tr>
                        </thead>
                        <tbody className="text-center h-[300px]">
                            {staff.map(staff =>
                              <tr>
                                <td>
                                  {staff.name}
                                </td>
                                <td>
                                  {staff.host}
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
      </div>
  )
}

export default Staff
