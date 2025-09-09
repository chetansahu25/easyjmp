import { NavLink, useNavigate } from "react-router";
import { User } from 'lucide-react'
import { useEffect, useState } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className='flex justify-center'>

            <nav className={`fixed flex justify-between items-center top-5 w-2/3  py-2 px-5 border rounded-full shadow-md z-100 ${scrolled? "bg-gray-800  border-white":" bg-gray-200/5  border-gray-300/50"}`}>
                {/* Logo Section */}
                <div>
                    <span className='bg-gradient-to-r from-blue-900 via-blue-600-teal-800 to-teal-400 text-transparent bg-clip-text font-extrabold text-2xl'>EasyJmp</span>
                </div>

                {/*  Links and Navigation */}
                <ul className="lg:flex gap-5 font-semibold text-white hidden ">
                    <li className="hover:underline hover:underline-blue-500">
                        <NavLink to={'https://www.simple.com/generateLink'}> Pricing </NavLink>
                    </li>
                    <li>
                        <NavLink to={'https://www.simple.com/generateLink'} >Analytics</NavLink>
                    </li>
                    <li> 
                        <NavLink to={'/dashbaord'}>Features</NavLink>
                    </li>
                    <li>
                        <NavLink>Blog</NavLink>
                    </li>
                </ul>
                <div className="flex justify-around items-center gap-2">

                    <button onClick={()=> navigate("/register")} className=" border border-gray-300 bg-gray-300 font-bold hover:bg-indigo-800 hover:border-indigo-800  hover:text-white rounded-full py-2 px-3">Sign up Free</button>
                    <button onClick={()=> navigate("/login")} className=" border border-gray-300 bg-gray-300 font-bold hover:bg-indigo-800 hover:border-indigo-800  hover:text-white  rounded-full py-2 px-3">Log in</button>
                </div>

            </nav>
        </div>


    )
}

export default Navbar