import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner';

const AddProduct = ({url}) => {
    const name = useSelector(state => state.name);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const isSeller = useSelector(state=>state.isSeller);
    const [productDetails, setProductDetails] = useState({
        title: '',
        description: '',
        price: '',
        images: ['', '', ''] // Initialize with empty strings for three images
    })
    useEffect(() => {
        if(!isSeller){
            navigate("/");
        }
    }, [])
    
    // Function to handle input change for text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price' && (isNaN(value) || parseFloat(value) < 0)) {
            // If the input is for price and the value is not a number or is negative,
            // you can set it to an empty string or handle it differently based on your requirements.
            setProductDetails(prevState => ({
                ...prevState,
                [name]: ''
            }));
        } else {
            setProductDetails(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    
    
    const handleImageChange = async (e) => {
        setloading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'yzipw8mo');
        formData.append('cloud_name', "dxrmfru5s");
        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/dxrmfru5s/image/upload`,
                formData
            );
            const imageUrl = res.data.secure_url;
            console.log(imageUrl);
            setProductDetails(prevState => ({
                ...prevState,
                images: [...prevState.images, imageUrl]
            }));
        } catch (error) {
            
            toast.error("Try Again")
        }
        setloading(false);
    };

    // Function to handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(url);
        try{
            const responce = await axios.post(`${url}/api/addproduct`,productDetails,{
                withCredentials:true
            });
            if(responce.status==200){
                toast.success("Product Added Successfully");
                navigate("/")
            }
        }catch(error){
            toast.error("Try Again");
            
        }
    };

    return (
        <>

            <ToastContainer />
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <ColorRing visible={loading} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
            </div>
            <div className="container mx-auto my-4 max-w-4xl md:my-6">
                <div className="overflow-hidden rounded-xl shadow">
                    <div className="px-5 py-6 text-gray-900 md:px-8">
                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-200">
                                <div className="py-6">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">Contact information</h3>
                                                <div className="mt-4 w-full">
                                                    <label htmlFor="name" className="text-sm font-medium leading-none">Full Name</label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder={name}
                                                        id="name"
                                                        name="name"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                                                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                                    {/* Product details inputs */}
                                                    {/* Title */}
                                                    <div className="col-span-3 sm:col-span-4">
                                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                                                        <div className="mt-1">
                                                            <input
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="text"
                                                                placeholder="Enter product title"
                                                                id="title"
                                                                name="title"
                                                                value={productDetails.title}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="col-span-2 sm:col-span-3">
                                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Description</label>
                                                        <div className="mt-1">
                                                            <input
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="text"
                                                                placeholder="Enter product description"
                                                                id="description"
                                                                name="description"
                                                                value={productDetails.description}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Price */}
                                                    <div>
                                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="number"
                                                                name="price"
                                                                id="price"
                                                                autoComplete="csc"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                placeholder="Enter product price"
                                                                value={productDetails.price}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Image Upload */}
                                                    
                                                        <div className="col-span-3 sm:col-span-4">
                                                            <label  className="block text-sm font-medium text-gray-700">Add Product Images</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    style={{ borderRadius: "0px" }}
                                                                    type="file"
                                                                    
                                                                    name="images"
                                                                    onChange={(e) => handleImageChange(e)}
                                                                    accept="image/*"
                                                                />
                                                            </div>
                                                            <div className="mt-1">
                                                                <input
                                                                    style={{ borderRadius: "0px" }}
                                                                    type="file"
                                                                    
                                                                    name="images"
                                                                    onChange={(e) => handleImageChange(e)}
                                                                    accept="image/*"
                                                                />
                                                            </div>
                                                            <div className="mt-1">
                                                                <input
                                                                    style={{ borderRadius: "0px" }}
                                                                    type="file"
                                                                    
                                                                    name="images"
                                                                    onChange={(e) => handleImageChange(e)}
                                                                    accept="image/*"
                                                                />
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                            {/* Submit button */}
                                            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                                                <button type="submit" className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
