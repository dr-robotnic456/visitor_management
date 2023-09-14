import UserNav from "@/components/UserNav";
import Image from "next/image";
import Link from "next/link";

const UserDashboard = () => {

return (
    <div className="bg-[#f1f1f1] h-screen w-screen flex items-center justify-center">
        <UserNav />
        <div className=" h-full w-[90%] flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-2xl w-[80%] h-[400px]">
                <div className="flex h-full">
                    <div className="relative w-[50%] items-center justify-center rounded-lg"
                    style={{
                        backgroundImage: "url(/side.jpg)",
                        objectFit: "cover",
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                        justifyContent:"center",
                        backgroundRepeat: "no-repeat"
                    }}
                    >
                        <div className="w-[60%] ml-[10%] absolute inset-0 flex">
                            <Image src="/logo.png" fill objectFit="contain" alt="logo"/>
                        </div>
                    </div>

                    <div className="items-center justify-center flex">
                        <Link href={"/ScheduleMeeting"}><button className="bg-[#4598FE] px-8 py-3 rounded-full ml-20 uppercase hover:bg-[#45987E] ">Schedule Meeting</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )    
}

export default UserDashboard