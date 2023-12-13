import { useEffect } from "react";
import Title from "../Hooks/Title";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const MyFood = () => {
    const { user } = useContext(AuthContext)
    const [myData, setMyData] = useState([])
    // console.log(myData)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/find?email=${user?.email}`,{withCredentials:true})
            .then(res => {
                setMyData(res.data)
            })
    }, [user])
    const handelDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                console.log(id)
                axios.delete(`http://localhost:5000/api/v1/find/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        const remaining = myData.filter(data => data._id !== id)
                        setMyData(remaining)
                    })
            }
        });
    }
    return (
        <div className="p-4  lg:w-4/5 mx-auto h-auto">
            <div>
                <Helmet>
                    <title>My Added Foods</title>
                </Helmet>
            </div>
            <div className='mt-32 mb-10'>
                <Title>MY ADDED FOODS</Title>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 mt-10 lg:mt-20">
                {
                    myData?.map(items => <div key={items._id}>

                        <div className="card card-compact bg-base-100 shadow-xl">
                            <figure><img
                                className="h-96 w-full object-cover transform transition-transform hover:scale-110 hover:shadow-lg"
                                src={items.strMealThumb} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title lg:text-2xl">{items.strMeal}</h2>
                                <p><span className="p-1 px-4 bg-yellow-100 rounded-full">{items.strCategory}</span></p>
                                <div className="mt-4 flex items-center justify-between my-4">
                                    <div>
                                        <p className="text-lg lg:text-xl font-bold italic">Price: ${items.price}</p>

                                    </div>
                                    <div>
                                        <p className="text-lg lg:text-lg font-bold italic">Origin : <span className="p-1 px-4 bg-yellow-200 rounded-full"> {items.strArea}</span></p>
                                    </div>
                                </div>
                                <div className="card-actions flex justify-evenly items-center ">
                                    <div>
                                        <button onClick={() => handelDelete(items._id)} className="btn btn-error btn-outline font-black text-xl"><RiDeleteBin2Fill /></button>
                                    </div>
                                    <div>
                                        <Link to={`/update/${items._id}`}>
                                            <button className="btn btn-primary btn-outline font-black text-xl"><FaEdit /></button>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to={`/single/${items._id}`}>
                                            <button className="btn btn-outline btn-warning font-extrabold text-lg"> Details </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>)
                }
            </div>
        </div>
    );
};

export default MyFood;