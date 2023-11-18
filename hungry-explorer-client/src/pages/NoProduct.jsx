import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import nofood from '../../public/noFood.json'


const NoProduct = () => {
    return (
        <div className="flex flex-col ">


            <div className="flex justify-center mt-10 lg:mt-0">
                {/* <img className=" w-full h-full lg:h-1/2 lg:w-1/2" src="https://kvcodes.com/clients/modules/products/uploads/no-product.png" alt="" /> */}
                <div>
                    <Lottie
                        className="h-96"
                        animationData={nofood} />
                </div>
               
            </div>
            <div className="flex justify-center gap-4 mt-32 lg:mt-10 flex-col text-center">
                <h1 className="text-5xl font-bold mb-10">NO FOOD IN CART</h1>
                <Link to={'/all_food'} className="flex justify-center ">
                    <button className="btn btn-primary bg-black hover:bg-black ">order</button>
                </Link>

            </div>


        </div>
    );
};

export default NoProduct;