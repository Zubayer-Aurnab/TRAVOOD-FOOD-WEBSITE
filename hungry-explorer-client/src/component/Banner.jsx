import { Fade } from "react-reveal";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className='lg:h-[50vh] bg-[url("https://newkit.moxcreative.com/travood/wp-content/uploads/sites/9/2022/07/img_1.png")] mb-10 md:mb-20
         lg:mb-32 '>
            <div id="home" className="">
                <div className="flex flex-col-reverse lg:flex-row justify-between items-center 
            w-4/5 mx-auto gap-5 p-4 ">
                    <Fade left>
                        <div className="flex-1">
                            <h1 className=" text-2xl md:text-4xl text-center lg:text-6xl font-bold italic my-10">

                                Quality Ingredients, <br /> Incredible Taste.</h1>
                            <p className=" text-sm lg:text-2xl">Discover delectable recipes, culinary inspiration, and restaurant recommendations. Savor the flavors and create culinary masterpieces with us! </p>
                            <div className="mt-10 text-center ">
                                <Link to={'/all_food'}>
                                    <button className="btn btn-outline btn-warning font-extrabold text-xl">All FOODS</button>
                                </Link>
                            </div>

                        </div>
                    </Fade>

                    <Fade right>
                        <div className="flex-1 justify-center items-center">
                            <img className="md:w-1/2 lg:w-1/2  mx-auto " src='https://newkit.moxcreative.com/travood/wp-content/uploads/sites/9/2022/07/1.png' alt="" />

                        </div>
                    </Fade>
                </div>

            </div>

        </div>
    );
};

export default Banner;