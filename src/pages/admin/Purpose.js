import AdminSidebar from "@/components/AdminSidebar";
import OverviewNav from "@/components/OverviewNav";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Purpose() {
  const [reasons, setReason] = useState([]);
  const [activeTitle, setActiveTitle] = useState("Visitor's Purpose");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReason();
  }, []);

  const fetchReason = async () => {
    try {
      const response = await axios.get("/api/reasons");
      setReason(response.data);
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
                          <th className="py-1">Visitor</th>
                          <th className="py-1">Host</th>
                          <th className="py-1">Reason</th>
                        </tr>
                      </thead>
                      <tbody className="text-center h-[300px]">
                          {reasons.map(reason =>
                            <tr>
                              <td>
                                {reason.name}
                              </td>
                              <td>
                                {reason.host}
                              </td>
                              <td>
                                {reason.reason}
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
  );
}

export default Purpose;
