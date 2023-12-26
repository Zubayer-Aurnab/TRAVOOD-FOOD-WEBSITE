import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../Hooks/Title";
import Lottie from "lottie-react";
import rating from '../../public/rating.json'
import { Link } from "react-router-dom";
const Top_Items = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        axios.get('https://hungry-explorer-server.vercel.app/api/v1/all-foods')
            .then(res => {
                console.log(res.data.resut)
                setItems(res.data.result)
            })
    }, [])

    return (
        <div className="p-4 lg:w-4/5 mx-auto">
            <Title>Top-Items </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10  mt-10 lg:mt-20" >
                {
                    items?.slice(0,6).map((item => <div key={item._id}>
                        <div className="card card-compact bg-base-100 shadow-xl">
                            <figure><img
                                className="h-96 w-full object-cover transform transition-transform hover:scale-110 hover:shadow-lg"
                                src={item.strMealThumb} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title lg:text-2xl">{item.strMeal}</h2>
                                <p><span className="p-1 px-4 bg-yellow-100 rounded-full">{item.strCategory}</span></p>
                                <div className="mt-4 flex items-center justify-between my-4">
                                    <div>
                                        <p className="text-lg lg:text-xl font-bold italic">Price: ${item.price}</p>

                                    </div>
                                    <div>
                                        <p className="text-lg lg:text-lg font-bold italic">Origin : <span className="p-1 px-4 bg-yellow-200 rounded-full"> {item.strArea}</span></p>
                                    </div>
                                </div>
                                <div className="card-actions flex justify-between items-center ">
                                    <div>
                                        <Lottie
                                            className="w-32"
                                            animationData={rating} />
                                    </div>
                                    <div>
                                        <Link to={`/single/${item._id}`}>
                                            <button className="btn btn-outline btn-warning font-extrabold text-lg"> Details </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))
                }
            </div>
            <div className="my-10 text-center">
                <Link to={'/all_food'}>
                    <button className="btn btn-outline btn-warning font-extrabold text-xl shadow-xl">All FOODS</button>
                </Link>
            </div>
        </div>
    );
};

export default Top_Items;