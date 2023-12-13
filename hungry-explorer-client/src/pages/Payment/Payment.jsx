import { loadStripe } from "@stripe/stripe-js";
import Title from "../../Hooks/Title";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet";



const stripePromise = loadStripe('pk_test_51OEBM3FCaw5OxhSAbuAkR9VeVsYy0wBV0w18ox4MABjxR8g1E0Jd6ZAtCol4ReJg2sPCXOk2FhrINOlYaDyNeEij00w16Azp6A')
const Payment = () => {
    return (
        <div className="w-4/5 mx-auto mt-16">
            <Helmet>
                <title>Payment</title>
            </Helmet>
            <Title>Payment</Title>
            <div className="h-[70vh] ">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;