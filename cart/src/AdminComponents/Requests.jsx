import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ColorRing } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify'

const Requests = ({url}) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const isAdmin = useSelector(state => state.isAdmin);
    const [requests, setRequests] = useState([]);
    const [loader2,setLoader2] = useState(false);
    const approve = async (sellerEmail) => {
    setLoader2(true);
        try{
        const responce = await axios.post(`${url}/api/seller-approve`,{sellerEmail:sellerEmail},{
            withCredentials:true
        });
        if(responce.status == 200){
            toast.success(" Seller Approved"); 
        }
    }catch(error){
        toast.error("Something Went Wrong");
    }
    setLoader2(false);
}
    useEffect(() => {
        const check = async () => {
            setLoader(false);
            if(!isAdmin) {
                navigate("/");
            }
            try {
                const response = await axios.get('http://localhost:8000/api/seller-requests', { withCredentials: true });
                setRequests(response.data);
            } catch(error) {
                console.log(error);
            }
            setLoader(true);
        }
        check();
    }, [loader2]);

    return (
        <>
        <ToastContainer/>
            {loader ? (
                <>
                <div style={{  marginTop:"20%",position:"fixed",width:"100%",display:"flex",justifyContent:"center"}}>
                    <ColorRing visible={loader2} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
                </div>
                <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                    <h2 className="text-3xl font-bold">Sellers Requests</h2>
                    <div className="mt-3 text-sm">
                        MAke them to seller Product on your Website
                    </div>
                {requests.length == 0 ?(
                    <>
                    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                        <h1 style={{color:"red"}}>No Request Found</h1>
                    </div>
                    </>
                ):(
                    <>
                    </>
                )
                };
                
                    {requests.map((req) => (
                    <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
                        <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
                            <p style={{fontWeight:"bold"}}>Seller Address Details</p>
                            <br />
                            Address: {req.address}
                            <br />
                            City: {req.city}
                            <br />
                            Region: {req.region}
                            <br />
                            Postal: {req.postalCode}
                        </div>
                        
                        <div className="flex-1">
                            <div className="p-8">
                                <ul className="-my-7 divide-y divide-gray-200">
                                    <li key={req.id} className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                        Request Id: {req._id}
                                        <br />
                                        Seller Email: {req.email}
                                        <br />
                                    </li>
                                </ul>
                                <hr className="my-8 border-t border-t-gray-200" />
                                <div className="space-x-4">
                                    <button
                                        onClick={() => approve(req.email)} // Pass a function reference
                                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Approve This Seller
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                </>
            ) : (
                <>
                    <div style={{ marginTop: "20%", position: "fixed", width: "100%", display: "flex", justifyContent: "center"}}>
                        <ColorRing visible={loader} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
                    </div>
                </>
            )}
        </>
    )
}

export default Requests;
