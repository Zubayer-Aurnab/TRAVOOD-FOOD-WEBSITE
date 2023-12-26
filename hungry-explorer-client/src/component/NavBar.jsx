import { motion } from "framer-motion"
import { useContext } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { BsCart4 } from 'react-icons/bs';
import { MdFastfood } from 'react-icons/md';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import { IoIosStats } from "react-icons/io";


const NavBar = () => {
    const { user, logOutUser } = useContext(AuthContext)
    console.log(user)

    const [isOpen, setIsOpen] = useState(false)
    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    }
    const variantsV1 = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "100%" },
    }

    const links = <>

        <li>
            <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-yellow-500" : "hover:text-yellow-500"
                }
            >
                Home
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/blog"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-yellow-500" : "hover:text-yellow-500"
                }
            >
                Blogs
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/all_food"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-yellow-500" : "hover:text-yellow-500"
                }
            >
                ALL Food
            </NavLink>
        </li>
        {
            user ? "" : <li>
                <NavLink
                    to="/login"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-yellow-500" : "hover:text-yellow-500"
                    }
                >
                    Log In
                </NavLink>
            </li>
        }


    </>

    return (
        <div className="navbar bg-transparent md:px-8 lg:px-96">
            <div className="navbar-start">
                <div className="dropdown">
                    <label
                        onClick={() => setIsOpen(isOpen => !isOpen)}
                        tabIndex={0} className="btn btn-ghost mr-2 lg:hidden rounded-full">
                        {
                            isOpen ?
                                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg> : <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                        }
                    </label>
                    <motion.ul
                        animate={isOpen ? "open" : "closed"}
                        variants={variants}
                        tabIndex={0} className=" space-y-2 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            links
                        }
                    </motion.ul>
                </div>
                <img src="https://newkit.moxcreative.com/travood/wp-content/uploads/sites/9/elementor/thumbs/logo_travood_-ps16h2vil0jtp4d0egaubfgdjbld6qt46gp4sjvri8.png" alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" font-bold  space-x-10 text-xl menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end ">

                {
                    user?.email ? <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">

                        <img
                            tabIndex={0}
                            src={user?.photoURL}
                            className="w-14 h-14 rounded-full object-cover"
                            alt="" />
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-2 ">
                            <li>
                                <button className="btn btn-sm bg-white hover:bg-white  btn-ghost w-full">{user.displayName}</button>

                            </li>

                            <Link to={`/cart`}>
                                <button className="btn btn-sm   w-full ">Cart <BsCart4 className="text-xl ml-2 mb-1" /></button>
                            </Link>



                            <div>
                                <Link className="" to={'/add'}>
                                    <button className="btn btn-sm  w-full ">Add Foods <MdFastfood className="text-xl ml-2 mb-1" /> </button>
                                </Link>
                            </div>



                            <div>
                                <Link to={'/my-food'}>
                                    <button className="btn btn-sm  w-full ">My added foods <BsFillPersonCheckFill className="text-xl ml-2 mb-1" />  </button>
                                </Link>
                            </div>
                            <div>
                                <Link to={'/stat'}>
                                    <button className="btn btn-sm  w-full ">Stat <IoIosStats className="text-xl ml-2 mb-1" />  </button>
                                </Link>
                            </div>


                            <li>
                                <button
                                    onClick={logOutUser}
                                    className="btn btn-sm  bg-red-400 text-white hover:bg-red-400 hover:text-white w-full">Logout</button>

                            </li>

                        </ul>
                    </div>

                        :
                        <Link to={'/login'}>
                            <button className=" btn btn-sm bg-yellow-400 md:btn-md  lg:btn-md  bg-yellow-400  hover:bg-yellow-300 font-black lg:text-xl " >Log In</button>
                        </Link>
                }
            </div>
        </div >
    );
};

export default NavBar;