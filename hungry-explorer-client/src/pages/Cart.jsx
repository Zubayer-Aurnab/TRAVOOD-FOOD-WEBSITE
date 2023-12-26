
import { useEffect } from 'react';
import Title from '../Hooks/Title'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import NoProduct from './NoProduct';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';



const Cart = () => {
    const [data, setData] = useState([])

    console.log(data)
    const { user, loading } = useContext(AuthContext)
    useEffect(() => {
        axios.get(`https://hungry-explorer-server.vercel.app/api/v1/orders?email=${user?.email}`, { withCredentials: true })
            .then(res => {
                setData(res.data)
            })
    }, [user])

    const handelDelete = (id) => {
        axios.delete(`https://hungry-explorer-server.vercel.app/api/v1/orders/${id}`)
            .then(res => {
                console.log(res.data)
                const remaining = data.filter(data => data._id !== id)
                setData(remaining)
                console.log(remaining)
            })
    }
    const totalPay = data.reduce((total, item) => total + item.price1, 0)
    console.log(totalPay)

    return (
        <div className=' p-2 px-4 md:w-4/5 mx-auto'>
            <div>
                <Helmet>
                    <title>Cart</title>
                </Helmet>
            </div>
            <div className='mt-32 mb-10 flex justify-between'>
                <Title> Cart</Title>
                {
                    data.length === 0 ?
                        ""
                        :
                        <Link to={'/payment'}>
                            <button className='btn btn-outline btn-warning font-extrabold text-xl text-black '>PAY <span className='text-black'>{totalPay} $</span> </button>
                        </Link>
                }

            </div>

            {
                data.length === 0 ? <NoProduct /> : <div className='lg:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 '>
                    {
                        data.map((item, index) => (
                            <div key={index} className=''>
                                <div className="card  bg-base-100 shadow-xl">
                                    <div className="p-10 flex justify-between items-center">
                                        <div className='space-y-4'>
                                            <h2 className="card-title text-2xl font-bold">{item.strMeal}!</h2>
                                            <p className="text-xl font-semibold">Total Price: <span className="p-1 px-4 bg-yellow-200 rounded-full">{item.price1}$ {Number(totalPay + item.price)}</span> </p>
                                            <p className="text-xl font-semibold">Quantity: <span className="p-1 px-4 bg-yellow-200 rounded-full">{item.quantityFrom}</span> </p>
                                            <p className="text-sm ">Owner: <small className="p-1 px-4 bg-yellow-200 rounded-full">{item.foodOwner}</small> </p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handelDelete(item._id)}
                                                className='btn text-2xl text-red-600 bg-red-200 hover:bg-red-100'><AiFillDelete /></button>
                                        </div>
                                    </div>
                                    <figure><img src={item.strMealThumb} className='h-96 object-cover w-full' alt="Shoes" /></figure>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default Cart;