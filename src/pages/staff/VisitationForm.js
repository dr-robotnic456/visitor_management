import Auth from '@/components/Auth'
import Image from 'next/image'


function VisitationForm() {
    return (
        <div className='bg-white flex items-center justify-center h-screen'>
        <div className='w-[400px] flex rounded-lg bg-[#f1f1f1] shadow-lg shadow-black relative overflow-hidden'>
            <Image src={"/bg.jpeg"} fill objectFit='cover' className='z-0 opacity-30 blur-sm' alt='bg'/>
                <form className='text-black px-8 py-2 w-full z-10'>
                    <h2 className='font-bold text-center text-xl'>ADD VISITOR</h2>
                    <div className='block items-center'>
                        <label htmlFor="username" className='text-lg my-1 font-semibold'>Name: </label>
                        <input type="text" name="username" id="username" className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="email" className='text-lg my-1 font-semibold'>Email: </label>
                        <input type="email" name="email" id="email" className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="phone" className='text-lg my-1 font-semibold'>Phone: </label>
                        <input type="text" name="phone" id="phone" className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="host" className='text-lg my-1 font-semibold'>Host: </label>
                        <input type="text" name="host" id="host" className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="reason" className='text-lg my-1 font-semibold'>Reason: </label>
                        <input type="text" name="reason" id="reason" className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="date" className='text-lg my-1 font-semibold'>Date: </label>
                        <input type="date" name="date" id="date" className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center'>
                        <label htmlFor="time" className='text-lg my-1 font-semibold'>Time: </label>
                        <input type="time" name="time" id="time" className='w-full bg-slate-300 px-2 py-1'/>
                    </div>
                    <div className='block items-center justify-center bg-[#4598FE] my-2'>
                        <button type="submit" className='py-1 text-white w-full uppercase'>Add Visitor</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth(VisitationForm)
