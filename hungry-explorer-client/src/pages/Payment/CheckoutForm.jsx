import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    const handelPayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {

            return;
        }


        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.message}`,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        } else {
            // console.log('[PaymentMethod]', paymentMethod);


            axios.delete(`http://localhost:5000/api/v1/delete-card?email=${user?.email}`)
                .then(res => {
                    if (res.data.deletedCount) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Payment successful",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/cart')
                    }
                })


        }
    }
    return (
        <div className=' mt-20'>
            <form onSubmit={handelPayment} className=" lg:w-1/2 mx-auto p-4 bg-white rounded shadow-xl lg:mt-36" >
                <div className='mb-10'>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button className='btn w-full btn-outline ' type="submit" disabled={!stripe}>
                    Pay
                </button>

            </form>
        </div>
    );
};

export default CheckoutForm;