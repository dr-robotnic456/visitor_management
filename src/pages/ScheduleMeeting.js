import Auth from '@/components/Auth';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import axios from 'axios';
import UserNav from '@/components/UserNav';

function ScheduleMeeting() { 
    const [visitor, setVisitor] = useState({
        name:"",
        email:"",
        phone:"",
        host:"",
        date: "",
        reason: "",
        time:"",
        address:"",
        checkIn:"",
        checkOut:""
    });

    const [error, setError] = useState("");

    const router = useRouter()

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setVisitor((prev) => ({...prev, [name]: value}))
    }

    const addVisitor = async() => {
        try{
            const response = await axios.post("/api/visitors", visitor);
            router.push(`/invite/${response.data._id}`)
        }catch(error){
            setError("Error creating visitor")
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        addVisitor()
    }
    return (
        <div className='bg-white flex items-center justify-center h-screen'>
            <UserNav />
        <div className='w-[400px] flex rounded-lg bg-[#f1f1f1] shadow-lg shadow-black relative h-[550px]'>
            <Image src={"/bg.jpeg"} fill objectFit='cover' className='z-0 opacity-30 blur-sm' alt='backgroundImage'/>
                <form className='text-black px-8 py-2 w-full z-10 h-[90%]' onSubmit={handleSubmit}>
                    {error && <div>{error}</div>}
                    <h2 className='font-bold text-center text-xl'>SCHEDULE MEETING</h2>
                    <div className='py-2 w-full overflow-y-auto h-[95%]'>
                    <div className='block items-center'>
                        <label htmlFor="username" className='text-lg my-1 font-semibold'>Name: </label>
                        <input type="text" name="name" value={visitor.name} id="name" onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="email" className='text-lg my-1 font-semibold'>Email: </label>
                        <input type="email" name="email" id="email" value={visitor.email} onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="phone" className='text-lg my-1 font-semibold'>Phone: </label>
                        <input type="text" name="phone" id="phone" value={visitor.phone} onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="host" className='text-lg my-1 font-semibold'>Host: </label>
                        <input type="text" name="host" id="host" value={visitor.host} onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="host" className='text-lg my-1 font-semibold'>Address: </label>
                        <input type="text" name="address" id="address" value={visitor.address} onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="phone" className='text-lg my-1 font-semibold'>Reason: </label>
                        <input type="text" name="reason" id="reason" value={visitor.reason} onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="date" className='text-lg my-1 font-semibold'>Date: </label>
                        <input type="date" name="date" id="date" value={visitor.date} onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="time" className='text-lg my-1 font-semibold'>Time: </label>
                        <input type="time" name="time" id="time" value={visitor.time} onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="time" className='text-lg my-1 font-semibold'>Time: </label>
                        <input type="time" name="checkIn" id="checkIn" value={visitor.checkIn} onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="time" className='text-lg my-1 font-semibold'>Time: </label>
                        <input type="time" name="checkOut" id="checkOut" value={visitor.checkOut} onChange={handleInputChange} className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center justify-center bg-[#4598FE] my-2'>
                        <button type="submit" className='py-1 text-white w-full uppercase'>schedule meeting</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Auth(ScheduleMeeting)
