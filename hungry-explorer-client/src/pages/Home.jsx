
import { Helmet } from "react-helmet";
import Banner from "../component/Banner";
import Brands from "../component/Brands";
import Top_Items from "../component/Top_Items";
import Vision from "../component/Vision";




const Home = () => {



    return (
        <div>
            <div>
                <Helmet>
                    <title>Travood</title>
                </Helmet>
            </div>
            <Banner />
            <Top_Items />
            <Vision />
            <Brands />

        </div>
    );
};

export default Home;