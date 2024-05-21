import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
const Product =({indx,url,sellerId,ImageUrl,title,price})=>{
    const isAdmin = useSelector(state=>state.isAdmin);
    const [loading, setloading] = useState(false);
    const email = useSelector(state=>state.email);
    const Remove = async()=>{
      setloading(true);
      try{
        const responce = await axios.post(`${url}/api/removeProduct`,{indx},{
          withCredentials:true
        })
        if(responce.status=200){
          toast.success("Removed Successfully");
          window.location.reload(); 
        }
      }catch(error){
        console.log(error)
      }
      setloading(false);
    }

    return(
        <>
        <ToastContainer/>
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <ColorRing visible={loading} height="100" width="100" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
        </div>
        <div id="start"
        className="relative aspect-[16/9] w-auto rounded-md md:aspect-auto md:h-[300px] mb-100"
        style={{ marginBottom: "100px" }} // Add margin bottom style here
        >
          
            <img
            src={ImageUrl}
            alt="AirMax Pro"
            className="z-0 h-full w-full rounded-md object-cover"
          />
          {isAdmin?(
            <button
            onClick={Remove} 
            style={{position:"Absolute"}}><MdDelete style={{fontSize:"30px"}}/></button>
          ):(
            <>
            {email==sellerId?(
              <button
              onClick={Remove} 
              style={{position:"Absolute"}}><MdDelete style={{fontSize:"30px"}}/></button>
            ):(
              <>
              </>
            )}
            </>
          )}
          
          <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            <label style={{display:"flex",alignItems:"center"}}>
            <Link to={`/Product/${indx}`}>
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                Shop Now &rarr;
            </button>
            </Link>
            <h1 className="text-lg font-semibold text-white">${price}</h1>
            </label>
          </div>
        </div>
        
    </>
    );
}
export default Product;