import AdminSidebar from "@/components/AdminSidebar";
import OverviewNav from "@/components/OverviewNav";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Departments() {
    const [departments, setDepartments] = useState([]);
  const [activeTitle, setActiveTitle] = useState("Department Management");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("/api/departments");
      setDepartments(response.data);
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

              <div className="w-full">
              <div className="flex w-full justify-end items-center my-2">
                  <button className=" bg-[#4598FE] px-3 py-1 rounded-lg text-white mr-14">
                    <Link href="AddDepartment">Add Department</Link>
                  </button>
                </div>
                <div className="w-full flex items-center justify-center overflow-y-auto h-[450px]">
                  <div className="w-[90%] h-[90%]">
                    <table className="w-full h-full">
                      <thead className="text-white sticky top-0">
                        <tr className="bg-[#4598FE]">
                          <th className="py-1">Department</th>
                          <th className="py-1">No. of Members</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                          {departments.map(department =>
                            <tr key={department._id}>
                              <td className="py-2">
                                {department.department}
                              </td>
                              <td className="py-2">
                                {/* {department.members.length} */}
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

export default Departments
