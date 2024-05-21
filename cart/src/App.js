import './App.css';
import './index.css'; // Import Tailwind CSS styles
import Home from './Components/Home';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './Components/Cart';
import SignUp from './Components/SignUp';
import Propage from './Components/Propage.jsx';
import Error from './Components/Error.jsx'; // Renamed to avoid conflict with Error object
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';
import Profile from './Components/Profile';
import {  login } from './redux/store';
import { updateCart } from './redux/store';
import Orders from './Components/Orders.jsx'
import About from './Components/About'
import { useState } from 'react';
import Checkout from './Components/Checkout.jsx';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Components/Navbar.jsx';
import AddProduct from './Components/AddProduct.jsx';
import BecomeSeller from './Components/BecomeSeller.jsx';
import Requests from './AdminComponents/Requests.jsx';

function App() {
  const url  = "https://caraadvance.onrender.com";
  const [orders,setOders] = useState([]);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  
  const getdata = async()=>{
    
    const response2 = await axios.post(`${url}/api/details`, null, {
      withCredentials: true
    });
    const user = response2.data.existingUser;
    dispatch(login(user.email, user.name,user.isAdmin,user.isSeller));
    setOders(user.orders);
    dispatch(updateCart(user.cart));
  }



  useEffect(() => {
    
    
    const sendTokenToServer = async () => {
      setloading(false);
      try {
          const response = await axios.post(`${url}/api/verifyToken`, null, {withCredentials:true});
          
          await getdata();
          
      } catch (error) {
        console.log("Hatt")
        setloading(true);
      }
      
      setloading(true);
  };
  sendTokenToServer();
  
  }, []);



  return (
    <>
    {loading ? (<>
      
      <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <section></section>
        <Navbar url={url}/>
      <Routes>
        <Route path='/' element={<Home url={url}/>} />
        <Route path='/Cart' element={<Cart url={url}/>} />
        <Route path='/SignUp' element={<SignUp url={url}/>} />
        <Route path='/Login' element={<Login url={url}/>} />
        <Route path="/Product/:productId" element={<Propage url={url}/>} />
        <Route path="/orders" element={<Orders orders={orders}/>}></Route>
        <Route path="/about" element={<About/>}/>
        <Route path='/checkout' element={<Checkout url={url}/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/addproduct" element={<AddProduct url={url}/>}   />
        <Route path="/becomeseller" element={<BecomeSeller url={url}/>} />
        <Route path="/requests" element={<Requests url={url}/>} />
        <Route path="*" element={<Error/>} />

      </Routes>
    </BrowserRouter>
    
    </>):(<>
      <div style={{position: "fixed", top: "20%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <ColorRing  height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
      </div>
    </>)}
    </>
  );
}

export default App;
