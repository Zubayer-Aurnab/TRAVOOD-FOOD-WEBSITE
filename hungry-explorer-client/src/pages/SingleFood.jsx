import { Link, useLoaderData } from "react-router-dom";
import Title from "../Hooks/Title";
import { Fade } from "react-reveal";
import { Helmet } from "react-helmet";


const SingleFood = () => {
    const loadedData = useLoaderData()
    const { strMeal, strCategory, strArea, strMealThumb, description, price, email, _id } = loadedData
    return (
        <div className="p-4 lg:w-4/5 mx-auto mt-10">
            <div>
                <Helmet>
                    <title>Details</title>
                </Helmet>
            </div>

            <div id="home" className=" mt-4 lg:mt-32">
                <div className="flex flex-col-reverse lg:flex-row justify-between items-center 
            gap-5">
                    <Fade left>
                        <div className="flex-1">
                            <h1 className=" text-4xl text-center lg:text-4xl font-bold italic my-10">{strMeal}</h1>
                            <p className="  lg:text-2xl">{description}</p>
                            <div className="mt-10 ">
                                <div className="flex-wrap lg:flex justify-between">
                                    <p className="text-base lg:text-xl font-bold italic mb-10" >price  : {price}$ </p>
                                    <p className="text-base lg:text-lg font-bold italic">Origin : <span className="p-1 px-4 bg-yellow-200 rounded-full">  {strArea}</span></p>
                                </div>
                                <div className="flex-wrap  flex justify-between">
                                    <p className="text-base lg:text-xl font-bold italic mb-10" >category  : {strCategory} </p>
                                    <p className="text-base lg:text-lg font-bold italic">Added by  : <span className="p-1 px-4 bg-yellow-200 rounded-full">  {email}</span></p>
                                </div>
                                <div className="lg:flex justify-between ">
                                    <div>
                                        <Link to={`/order/${_id}`}>
                                            <button className="italic bg-yellow-300 btn btn-outline border-none font-bold px-7 lg:text-xl flex  mt-10 mb-6 w-full  text-xl
                                lg:mt-0 lg:mb-0  ">
                                                Order Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fade>

                    <Fade right>
                        <div className="flex-1 justify-center items-center">
                            <img className="w-2/3  mx-auto rounded-xl" src={strMealThumb} alt="" />

                        </div>
                    </Fade>
                </div>

            </div>


        </div>

    );
};

export default SingleFood;