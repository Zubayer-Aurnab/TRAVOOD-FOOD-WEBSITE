import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { Helmet } from "react-helmet";


const Order = () => {
    const orderData = useLoaderData()
    const { user } = useContext(AuthContext)
    const { strMeal, strCategory, strArea, strMealThumb, description, price, email, _id, quantity } = orderData

    const handelBuy = (e) => {
        e.preventDefault()
        const form = e.target
        const quantityFrom = form.quantity.value
        const date = form.date.value

        if (email == user.email) {
            Swal.fire({
                icon: 'error',
                title: `"You can't Buy Your own product"`,
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
            return
        }

        if (quantityFrom < 0) {
            Swal.fire({
                icon: 'error',
                title: `Quantity is not a positive integer`,
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
            return
        }
        if (quantityFrom == 0) {
            Swal.fire({
                icon: 'error',
                title: `Cant order 0 quantity`,
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
            return
        }
        if (quantityFrom > Number(quantity)) {
            Swal.fire({
                icon: 'error',
                title: `"You can't order more than the stock quantity."`,
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
            return
        }
        const price1 = quantityFrom * price
        const foodOwner = email
        const buyer = user.email

        const order = {
            strMeal,
            strMealThumb,
            price1,
            quantityFrom,
            date,
            foodOwner,
            buyer
        }
        console.log(order)
        axios.post(`http://localhost:5000/api/v1/orders`, order)
            .then(res => {
                console.log(res.data)
                if (res.data.acknowledged) {
                    Swal.fire({
                        icon: 'success',
                        title: `Order Added Successfully`,
                        text: 'Something went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
                form.reset()
            })


    }
    return (
        <div className="p-4 lg:w-4/5 mx-auto">
            <div>
                <Helmet>
                    <title>Order</title>
                </Helmet>
            </div>
            <form onSubmit={handelBuy} >
                <div className=" lg:flex justify-between gap-10 mt-20">
                    <div className="flex-1 flex justify-center">
                        <img src={strMealThumb} alt="" className="rounded-3xl mb-10 w-3/4 h-3/4 object-cover " />
                    </div>
                    <div className=" text-center lg:text-right flex-1 ">
                        <h1 className="text-3xl lg:text-6xl font-bold italic">{strMeal}</h1>
                        <p className="text-xl lg:text-2xl mt-10">{description}</p>
                        <div className="space-y-4 lg:flex justify-between mt-10 lg:space-y-0">
                            <div>
                                <p className="text-xl font-bold">Price: <span className="p-1 px-4 bg-yellow-200 rounded-full">{price}$</span> </p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">Origin : <span className="p-1 px-4 bg-yellow-200 rounded-full">{strArea}</span></p>
                            </div>
                        </div>
                        <div className="space-y-4 lg:flex justify-between mt-10 lg:space-y-0 gap-2">
                            <div>
                                <p className="text-base font-bold">Buyer Name : <span className="p-1 px-4 bg-yellow-200 rounded-full">{user?.displayName}</span></p>
                            </div>
                            <div>
                                <p className="text-base font-bold">Buyer mail : <span className="p-1 px-4 bg-yellow-200 rounded-full">{user?.email}</span></p>
                            </div>
                        </div>
                        <div className="space-y-4 lg:flex justify-between mt-10 lg:space-y-0">
                            <div>
                                <p className="text-lg font-bold">Buying date : <input name="date" type="date" className="p-1 px-4 bg-base-200 rounded-full" required /></p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">Stock Quantity : <span className="p-1 px-4 bg-yellow-200 rounded-full">{quantity}</span></p>
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <p className="text-lg font-bold"> Your Quantity : <input name="quantity" placeholder=" limit: Stock quantity." type="number" className="p-1 px-4 bg-base-200 rounded-full" required /></p>

                        </div>
                        <div className="mt-20 text-center">
                            <button disabled={quantity === 0} type="submit" className="btn btn-warning  font-black w-full lg:w-1/2">Buy</button>

                            <div className="flex justify-center mt-2">
                                <p className={quantity === 0 ? "text-red-600 flex text-center text-sm" : "hidden"}>This Food is currently out of stock</p>
                            </div>
                        </div>

                    </div>
                </div>
            </form>

        </div>
    );
};

export default Order;