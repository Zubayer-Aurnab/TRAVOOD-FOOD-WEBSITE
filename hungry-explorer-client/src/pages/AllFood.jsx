import { useEffect } from "react";
import Title from "../Hooks/Title";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcSearch } from 'react-icons/fc';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import loading from '../../public/loading.json'
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";

const AllFood = () => {
    const [allFoods, setAllFoods] = useState([])
    const [totalFoods, setTotalFoods] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 9
    const numberOfPages = Math.ceil(totalFoods / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()]

    console.log(allFoods)
    // console.log(totalFoods)

    useEffect(() => {
        axios
            .get(`https://hungry-explorer-server.vercel.app/api/v1/all-foods?page=${currentPage}&size=${itemsPerPage}`)
            .then((res) => {
                setAllFoods(res.data.result);
                setTotalFoods(res.data.total)

            });
        window.scrollTo(0, 0)
    }, [currentPage, itemsPerPage]);
    const handelSearch = (e) => {
        e.preventDefault()
        const from = e.target
        const text = from.search.value

        axios.get(`https://hungry-explorer-server.vercel.app/api/v1/all-foods?strMeal=${text}`)
            .then(res => {
                setAllFoods(res.data.result)
                setTotalFoods(res.data.total)

            })

    }
    const handelPrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handelNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div className="">
            <div>
                <Helmet>
                    <title>All-Foods</title>
                </Helmet>
            </div>
            <div className="mt-16 p-4 lg:p-0">
                <div className="mt-10 lg:mt-24 ">
                    <div className=" py-10 bg-gray-600  lg:w-1/2 mx-auto text-center rounded-2xl bg-[url('https://newkit.moxcreative.com/travood/wp-content/uploads/sites/9/2022/07/img_1.png')]">
                        <h1 className="text-3xl   my-8 text-yellow-400 font-bold p-2 "> <span className="bg-gray-600 p-1 px-2 rounded-lg opacity-95">SEARCH Your Food</span></h1>
                        <form
                            onSubmit={handelSearch}
                            className="relative" >
                            <input name="search" type="text" placeholder="Type here" className="input input-bordered input-warning md:w-1/2 lg:w-1/2 " />
                            <button ><FcSearch className="text-4xl p-1 absolute right-[27%] bottom-2 cursor-pointer" /></button>
                        </form>

                    </div>
                </div>
                <div className="p-1 lg:w-4/5 mx-auto mt-32">
                    <Title>All-Foods</Title>
                </div>

                <div className="p-1 lg:w-4/5 mx-auto">
                    <div className={`${allFoods.length === 0 ? "" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 mt-10 lg:mt-20"
                        }`}>
                        {
                            allFoods.length == 0 ?
                                <div className=" flex items-center justify-center" >
                                    <Lottie
                                        className=" "
                                        animationData={loading} />
                                </div>
                                :
                                allFoods?.map(food => <div key={food._id}>

                                    <div className="card card-compact bg-base-100 shadow-xl">
                                        <figure><img
                                            className="h-96 w-full object-cover transform transition-transform hover:scale-110 hover:shadow-lg"
                                            src={food.strMealThumb} alt="Shoes" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title lg:text-2xl">{food.strMeal}</h2>
                                            <p><span className="p-1 px-4 bg-yellow-100 rounded-full">{food.strCategory}</span></p>
                                            <div className="mt-4 flex items-center justify-between my-4">
                                                <div>
                                                    <p className="text-lg lg:text-xl font-bold italic">Price: ${food.price}</p>

                                                </div>
                                                <div>
                                                    <p className="text-lg lg:text-lg font-bold italic">Origin : <span className="p-1 px-4 bg-yellow-200 rounded-full"> {food.strArea}</span></p>
                                                </div>
                                            </div>
                                            <div className="card-actions flex justify-between items-center ">
                                                <div>

                                                </div>
                                                <div>
                                                    <Link to={`/single/${food._id}`}>
                                                        <button className="btn btn-outline btn-warning font-extrabold text-lg"> Details </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>)
                        }
                    </div>
                    <div className="my-10 flex justify-center">
                        <div className="join">
                            <button onClick={handelPrev} className="join-item btn btn-md"><GrPrevious /></button>
                            {
                                pages.map(page => <button onClick={() => setCurrentPage(page)} className={currentPage == page ? `join-item btn btn-md bg-yellow-400` : `join-item btn btn-md`}>{page}</button>)
                            }

                            {/* <button className="join-item btn btn-md ">2</button>
                            <button className="join-item btn btn-md">3</button>
                            <button className="join-item btn btn-md">4</button>  */}

                            <button onClick={handelNext} className="join-item btn btn-md"><GrNext /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default AllFood;