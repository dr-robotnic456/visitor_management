import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineLineChart } from 'react-icons/ai';
import { FcDepartment } from 'react-icons/fc';
import { FaUsersLine } from 'react-icons/fa6';
import { BiSolidFoodMenu, BiBookReader, BiWalk } from 'react-icons/bi';

function AdminSidebar() {

  const [title, setTitle] = useState({
    overview : "Overview",
    staff : "Staff Management",
    department : "Department Management",
    logbook:"Visitors Logbook",
    purpose:"Purpose",
    total:"Total Visits"
  })
  return (
    <div className='bg-[#4598FE] text-white flex flex-col h-screen fixed w-[20%]'>
      <div className='w-[80%] justify-center items-center relative flex mx-auto'>
        <Image src={"/logo.png"} width={100} height={100} objectFit='contain' alt='logo'/>
      </div>
      <ul className=''>
        <Link href = "/admin/Dashboard"><li className='py-3 font-semibold hover:bg-slate-400 px-2 cursor-pointer flex items-center space-x-2'><AiOutlineLineChart size={22}/><div>{title.overview}</div></li></Link>
        <Link href = "/admin/Departments"><li className='py-3 font-semibold hover:bg-slate-400 px-2 cursor-pointer flex items-center space-x-2'><FcDepartment size={22}/><div>{title.department}</div></li></Link>
        <Link href = "/admin/Staff"><li className='py-3 font-semibold hover:bg-slate-400 px-2 cursor-pointer flex items-center space-x-2'><FaUsersLine size={22}/><div>{title.staff}</div></li></Link>
        <Link href = "/admin/Logbook"><li className='py-3 font-semibold hover:bg-slate-400 px-2 cursor-pointer flex items-center space-x-2'><BiSolidFoodMenu size={22}/><div>{title.logbook}</div></li></Link>
        <Link href = "/admin/Purpose"><li className='py-3 font-semibold hover:bg-slate-400 px-2 cursor-pointer flex items-center space-x-2'><BiBookReader size={22}/><div>{title.purpose}</div></li></Link>
        <Link href = "/admin/Total"><li className='py-3 font-semibold hover:bg-slate-400 px-2 cursor-pointer flex items-center space-x-2'><BiWalk size={22}/><div>{title.total}</div></li></Link>
      </ul>
    </div>
  )
}

export default AdminSidebar
