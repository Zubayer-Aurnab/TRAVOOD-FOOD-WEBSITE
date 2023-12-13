import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider";
import axios from "axios";
import { data } from "autoprefixer";
import { Helmet } from "react-helmet";

const Register = () => {
    const { GoogleAuth, createUser, UpdateUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()




    const handelRegisterSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const name = e.target.name.value
        const photo = e.target.photo.value
        console.log(email, password, name, photo);

        if (password.length < 6) {
            return Swal.fire({
                icon: 'error',
                title: `Password must be at least 6 characters long.`,
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }


        if (!/[A-Z]/.test(password)) {
            return Swal.fire({
                icon: 'error',
                title: `Password must contain at least one capital letter.`,
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }


        if (!/[!@#$%^&*]/.test(password)) {
            return Swal.fire({
                icon: 'error',
                title: `Password must contain at least one special character.`,
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }

        createUser(email, password)
            .then(res => {
                UpdateUser(name, photo)
                    .then(() => {
                        const user = { email, name, photo }

                        axios.post(`http://localhost:5000/api/v1/register`, user)
                            .then(res => {
                                if (res.data.acknowledged) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Registered Successfully',
                                        text: '',
                                        footer: ''
                                    })
                                    navigate(location?.state ? location.state : '/')
                                }
                            })
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: `${err.massage}`,
                            text: 'Something went wrong!',
                            footer: '<a href="">Why do I have this issue?</a>'
                        })
                    })
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: `${err.massage}`,
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    }




    const GoogleRegister = () => {

        GoogleAuth()
            .then(res => {

                Swal.fire({
                    icon: 'success',
                    title: 'Register Success',
                    text: '',
                    footer: ''
                })
                navigate('/')

            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: `${err.massage}`,
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })

    }

    return (
        <div>
            <div>
                <Helmet>
                    <title>Register</title>
                </Helmet>
            </div>
            <section className="bg-gray-50 dark:bg-gray-400  flex items-center lg:h-screen  bg-[url('https://newkit.moxcreative.com/travood/wp-content/uploads/sites/9/2022/07/img_1.png')]">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 ">
                    <div className="flex flex-col justify-center  bg-gray-600 p-1 px-10  rounded-lg opacity-95">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Register</h1>
                        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Welcome to Travood, your gateway to the world of delectable culinary delights! Our login page provides access to a universe of culinary wonders, including mouthwatering dishes, recipes, restaurant reviews, and much more. Join us on this savory journey where flavors meet exploration. Log in to explore the latest food trends and elevate your foodie lifestyle. Dive into a world of gastronomic possibilities at Travood.</p>

                    </div>
                    <div>
                        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Register to Travood
                            </h2>
                            <form
                                onSubmit={handelRegisterSubmit}
                                className="mt-8 space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id=""
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=" name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo URL</label>
                                    <input
                                        type="text"
                                        name="photo"
                                        id="photo"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=" URL"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="@"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className='flex flex-col lg:flex-row justify-between  space-y-4 lg:space-y-0'>
                                    <button
                                        type="submit"
                                        className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Register your account
                                    </button>

                                    <button
                                        onClick={GoogleRegister}
                                        type="submit"
                                        className="w-full px-5 py-3 text-base font-medium text-center text-black bg-white rounded-lg hover:bg-white focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-white dark:hover:bg-white dark:focus:ring-white flex items-center justify-center gap-4 "
                                    >
                                        Register with Google
                                        <FcGoogle className='text-xl' />
                                    </button>




                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    Already Have an Account?   <Link to={'/login'} className="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"> LogIN</Link>
                                </div>



                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;