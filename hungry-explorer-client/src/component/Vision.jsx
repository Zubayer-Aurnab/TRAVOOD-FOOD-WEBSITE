import React from 'react';
import mission from '../../public/mission.json';
import vision from '../../public/vision.json';
import motoo from '../../public/motto.json';
import Lottie from 'lottie-react';
import Title from '../Hooks/Title';

const Vision = () => {
    return (
        <>
            <div className='p-4 lg:w-4/5 mx-auto mt-20 mb-10'>
                <Title>About Us </Title>
            </div>
            <div className="hero  lg:h-[50vh] lg:mt-24 mb-10" style={{ backgroundImage: 'url(https://newkit.moxcreative.com/travood/wp-content/uploads/sites/9/2022/07/about_us.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className='w-4/5 mx-auto text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>

                    <div className='flex flex-col p-2 border-4 rounded-lg justify-center items-center text-center'>
                        <div>
                            <Lottie
                                className="w-40"
                                animationData={vision} />
                        </div>
                        <h1 className='text-2xl font-bold'>vision</h1>
                        <p>
                            "Our vision is to delight taste buds and inspire culinary creativity. We aim to be the ultimate food destination, offering a world of flavors and kitchen inspiration in one place."
                        </p>
                    </div>

                    <div className='flex flex-col p-2 border-4 rounded-lg justify-center items-center text-center' >
                        <div>
                            <Lottie
                                className="w-52 mb-10 mt-10"
                                animationData={mission} />
                        </div>
                        <h1 className='text-2xl font-bold '>Mission</h1>
                        <p>

                            "Our mission is to connect people through the joy of food. We curate a diverse range of recipes, tips, and resources to empower our community to savor, create, and share delicious moments."
                        </p>
                    </div>
                    <div className='flex flex-col p-2 border-4 rounded-lg justify-center items-center text-center'>
                        <div>
                            <Lottie
                                className="w-40"
                                animationData={motoo} />
                        </div>
                        <h1 className='text-2xl font-bold'>Motoo</h1>
                        <p>"Exploring the World of Flavor, One Dish at a Time, and Sharing the Passion for Food with Everyone."</p>
                    </div>

                </div>


            </div>

        </>
    );
};

export default Vision;