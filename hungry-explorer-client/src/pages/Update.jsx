import { useLoaderData, useNavigate } from "react-router-dom";
import Title from "../Hooks/Title";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const Update = () => {
    const navigate = useNavigate()
    const loaded = useLoaderData()
    const { user } = useContext(AuthContext)
    const { strMeal,
        strCategory,
        strArea,
        strMealThumb,
        description,
        price,
        email,
        quantity,
        _id } = loaded
    console.log(loaded)



    const handelUpdateFood = (e) => {
        e.preventDefault()
        const form = e.target
        const photo = form.photo.value
        const name = form.name.value
        const category = form.category.value
        const quantity = form.quantity.value
        const price = form.price.value
        const origin = form.origin.value
        const addedBy = form.addedBy.value
        const description = form.description.value
        const update = {
            strMeal: name,
            strCategory: category,
            strArea: origin,
            strMealThumb: photo,
            description: description,
            price: price,
            email: addedBy,
            quantity: quantity
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
           
            axios.put(`https://hungry-explorer-server.vercel.app/api/v1/update/${_id}`,update)
                .then(res => {
                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            title: "Update successful!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                    navigate('/my-food')
                })
        });
    }
    return (
        <div className="p-4 lg:w-4/5 mx-auto">
            <div>
                <Helmet>
                    <title>Update Food</title>
                </Helmet>
            </div>

            <div className="mt-32 mb-10">
                <Title>UPDATE FOOD</Title>
            </div>
            <form onSubmit={handelUpdateFood} >
                <div className=" lg:w-1/2 mx-auto border-4 rounded-lg p-10 mb-10">
                    <div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium ">IMAGE URL</label>
                            <input
                                defaultValue={strMealThumb}
                                type="text"
                                name="photo"
                                id="email"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Image URL"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium ">FOOD NAME</label>
                            <input
                                type="text"
                                defaultValue={strMeal}
                                placeholder="Food Name"
                                name="name"
                                id="password"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>


                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-6">
                                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium ">Food Category</label>
                                <input
                                    defaultValue={strCategory}
                                    type="text"
                                    placeholder="category"
                                    name="category"
                                    id="repeat-password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium ">Quantity</label>
                                <input
                                    defaultValue={quantity}
                                    type="number"
                                    name="quantity"
                                    placeholder="quantity"
                                    id="repeat-password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-6">
                                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium ">Price</label>
                                <input
                                    defaultValue={price}
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    id="repeat-password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium ">Origin</label>
                                <input
                                    defaultValue={strArea}
                                    type="text"
                                    name="origin"
                                    placeholder="Country"
                                    id="repeat-password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-6">
                                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium ">Added by</label>
                                <input
                                    defaultValue={user?.email}
                                    type="text"
                                    name="addedBy"
                                    id="repeat-password"
                                    className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                    disabled
                                />
                            </div>

                        </div>
                        <div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium ">Description</label>
                                <textarea
                                    defaultValue={description}
                                    id="message"
                                    name="description"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Leave description..."
                                ></textarea>

                            </div>

                        </div>
                    </div>



                    <div className="text-center mt-10">
                        <button
                            type="submit"
                            className="btn bg-gray-800 text-white hover:bg-gray-600  w-1/2"
                        >
                            Update Food
                        </button>
                    </div>

                </div>

            </form>
        </div>

    );
};

export default Update;