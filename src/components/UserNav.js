import jwt from "jsonwebtoken";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";

const MenuData = ({ showMenu, profileId }) => {
    const router = useRouter()
    const logout = () => {
      localStorage.removeItem("token");
      router.push("/Login")
    };
  
    return (
      <div className="flex w-full justify-end">
        {showMenu && (
          <div className="bg-white w-[100px] text-black">
              <Link href={`/profile/${profileId}`} className="w-full">
            <div className="px-3 py-1 hover:bg-[#4598FE]">
                Profile
            </div>
              </Link>
            <div onClick={logout} className="px-3 py-1 hover:bg-[#4598FE] cursor-pointer">LogOut</div>
          </div>
        )}
      </div>
    );
  };

function UserNav() {
    const [showMenu, setShowMenu] = useState(false);
    const [profileId, setProfileId] = useState(null);
  
    useEffect(() => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
  
      // Parse the token to get the profileId
      if (token) {
        const decodedToken = jwt.decode(token)
        setProfileId(decodedToken.id);
      }
    }, []);
  
    const handleMenuClick = (e) => {
      e.stopPropagation(); // Prevent click event from propagating
      setShowMenu(!showMenu);
    };
  
    return (
      <div className="h-[70px] fixed top-0 z-10 w-full items-center bg-transparent" onClick={() => setShowMenu(false)}>
        <ul className="flex text-black px-5 items-center h-full w-full">
          <div className="flex justify-end items-center w-full">
            <div className="items-center flex space-x-4">
              <li>
                <div>
                  <div className="rounded-full w-3 h-3 top-8 bg-red-500 absolute z-10 " />
                  <MdNotificationsActive
                    size={30}
                    className="relative hover:text-gray-500 cursor-pointer"
                  />
                </div>
              </li>
              <li>
                <div
                  className="relative rounded-full overflow-hidden items-center h-10 w-10 cursor-pointer"
                  onClick={handleMenuClick} // Use onClick to toggle the menu
                >
                  <Image src="/profile.png" alt="Profile" layout="fill" />
                </div>
              </li>
            </div>
          </div>
        </ul>
        {showMenu && <MenuData showMenu={showMenu} profileId={profileId} />}
    </div>
  )
}

export default UserNav
