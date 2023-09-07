import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";
import jwt from "jsonwebtoken"
import { useRouter } from "next/router";

const MenuData = ({ showMenu, profileId }) => {
    const router = useRouter()
    const logout = () => {
      localStorage.removeItem("token");
      router.push("/Login")
  };

  return (
    <div className="flex w-full justify-end">
      {showMenu && (
        <div className="bg-white w-[100px]">
          <div>
            <Link href={`/profile/${profileId}`} className="w-full">
              Profile
            </Link>
          </div>
          <div onClick={logout}>LogOut</div>
        </div>
      )}
    </div>
  );
};

function OverviewNav({ activeTitle, setTitle }) {
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
    <div className="h-[100px] fixed z-10 w-[80%] items-center bg-white" onClick={() => setShowMenu(false)}>
      <ul className="flex text-black px-5 items-center h-full w-full">
        <div className="flex justify-between items-center w-full">
          <div className="font-bold text-5xl">{activeTitle}</div>
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
      {/* Pass the showMenu state and profileId to MenuData */}
    </div>
  );
}

export default OverviewNav;
