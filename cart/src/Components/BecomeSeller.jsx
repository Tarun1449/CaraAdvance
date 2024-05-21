import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
const BecomeSeller = ({url}) => {
    const name = useSelector(state => state.name);
    const isLoggedIn = useSelector(state => state.loggedIn);
    const email = useSelector(state=>state.email);
    const isSeller = useSelector(state=>state.isSeller);
    // State variables to store form data
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const check = () => {
            console.log(url);   
            if (!isLoggedIn) {
                navigate('/');
            }
            if(isSeller){
                navigate('/');
            }
        };
        check();
    }, []);

    const handleSubmit = async () => { // Prevent default form submission behavior
        const sellerdata = {
            email,
            cardNumber,
            expirationDate,
            cvc,
            address,
            city,
            region,
            postalCode
        };
        try {
            
            const response = await axios.post(`${url}/api/become-seller`,{sellerdata},{
                withCredentials:true
            });
            
            if(response.status == 200){
                toast.success("Request has been Submited to Admin",{
                    onClose: () => navigate('/')
                });
                
            }
        } catch (error) {
            
            if(error.response.data.message == "Fill the Required Fields"){
                toast.error("Fill the Required Fields");
            }
            else if(error.response.data.message =="Your Previous Request is still Pending"){
                toast.error("Your Previous Request is still Pending");
            }
            else{
                toast.error("Something Went Wrong");
            }
        }
    };

    return (
        <>

        <ToastContainer/>
        <div className="mx-auto my-4 max-w-4xl md:my-6">
            <div className="overflow-hidden rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    <div className="px-5 py-6 text-gray-900 md:px-8">
                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-200">
                                <div className="py-6">
                                    <div>
                                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                                            <div>
                                                <h3
                                                    id="contact-info-heading"
                                                    className="text-lg font-semibold text-gray-900"
                                                >
                                                    Contact information
                                                </h3>

                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder={name}
                                                        readOnly
                                                        id="name"
                                                    ></input>
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                            {/* Payment details */}
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Payment details
                                                </h3>

                                                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                                    <div className="col-span-3 sm:col-span-4">
                                                        <label
                                                            htmlFor="cardNum"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Card number
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            type="text"
                                                            placeholder="4242 4242 4242 4242"
                                                            id="cardNum"
                                                            value={cardNumber}
                                                            onChange={e => setCardNumber(e.target.value)}
                                                        ></input>
                                                    </div>
                                                    <div className="col-span-2 sm:col-span-3">
                                                        <label
                                                            htmlFor="expiration-date"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Expiration date (MM/YY)
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="expiration-date"
                                                            id="expiration-date"
                                                            autoComplete="cc-exp"
                                                            className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={expirationDate}
                                                            onChange={e => setExpirationDate(e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="cvc"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            CVC
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cvc"
                                                            id="cvc"
                                                            autoComplete="csc"
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={cvc}
                                                            onChange={e => setCvc(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                            {/* Address */}
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Address For Collecting Products
                                                </h3>

                                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            name="address"
                                                            autoComplete="street-address"
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={address}
                                                            onChange={e => setAddress(e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="city"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            City
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="city"
                                                            name="city"
                                                            autoComplete="address-level2"
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={city}
                                                            onChange={e => setCity(e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="region"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            State / Province
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="region"
                                                            name="region"
                                                            autoComplete="address-level1"
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={region}
                                                            onChange={e => setRegion(e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="postal-code"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Postal code
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="postal-code"
                                                            name="postal-code"
                                                            autoComplete="postal-code"
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={postalCode}
                                                            onChange={e => setPostalCode(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                           
                                            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                                                <button
                                                    onClick={handleSubmit}
                                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    Send Request
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default BecomeSeller;
