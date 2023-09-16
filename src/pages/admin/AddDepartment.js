import axios from 'axios';
import React, { useState } from 'react'

const AddDepartment = () => {
    const [dept, setDept] = useState({
        department: "",
        hod: "",
    });

    const [error, setError] = useState("");

    const handleInputChange = e => {
        const { name, value } = e.target;
        setDept(prevDept => ({
            ...prevDept,
            [name]: value
        }));
    };

    const addDepartment = async () => {
        try {
            await axios.post("/api/departments", dept);
        } catch (err) {
            setError("Error creating department");
            console.error(err);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setError(""); // Clear any previous error message
        addDepartment();
    };
    return (
        <div className='fixed inset-0 flex flex-col justify-center items-center z-50 bg-opacity-50 bg-black'>
            <div className='w-[500px] bg-[#f1f1f1] rounded-lg py-4'>
                <h2 className='text-center font-bold text-3xl uppercase text-black'>Add Department</h2>
                {error &&
                    <p className="text-red-500">
                        {error}
                    </p>}
                <form onSubmit={handleSubmit} className='px-10 w-full py-4 mx-auto rounded-lg text-black'>
                    <div className='my-5'>
                        <input
                            type="text"
                            name="department"
                            placeholder="Department Name"
                            value={dept.department}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2"
                        />
                    </div>
                    <div className='my-5'>
                        <input
                            type="text"
                            name="hod"
                            placeholder="Head Of Department"
                            value={dept.hod}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2"
                        />
                    </div>
                    <div className='items-center justify-center flex rounded-lg'>
                        <button type="submit" className='uppercase text-white bg-[#4598FE] py-2 hover:bg-[#0762EA] w-full outline-none rounded-lg font-bold'>Add Department</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment