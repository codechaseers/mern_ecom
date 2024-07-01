import "./App.css";
import Header from "./component/Layout/header/Header";
import Footer from "./component/Layout/footer/Footer"
import { Route, Redirect, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./component/homepage/Home";
import Products from "./component/product/Products"
import About from "./component/about/About"
import ProductDetails from "./component/homepage/Productdetails";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Profile from "./component/Profile/Profile";
import Changepas from "./component/Changeps/Change_password";
import Forgetpassword from "./component/Forget_password/Forget_pas"
import Resetpassword from "./component/Forget_password/Resetpassword"
import { CartProducts } from "./component/Cart/CartProducts";
import CartSection from "./component/Cart/CartSection";
import Four_o_page from "./component/Layout/404page/Four_o_page";
import { useDispatch, useSelector } from "react-redux";
import { Userdetail } from "../src/reduser/UserdetailReduser"
import { useEffect, useState } from "react";
import { store } from "./store/Store";
 
import Protectroute from "./Protecteoutes/Protectroute";

import axios from "axios";
import Confirm from "./component/confirmpage/Confirm";



function App() {
 
  // const [auth ,setauth]=useState()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // !important >>>>   you should use a {} bracket in empty reduser function 
  // this is load the login data on state 

  // console.log("app js "+auth);
  // const location =useLocation()

  useEffect(() => {
    // console.log("user details get")
    // hear i use set time out beacuse when my user visit a random path and then back the orginal path my cookies get load and get the previous value for some time  so my user logind in again .... 
    setTimeout(() => {

      dispatch(Userdetail({}))
    }, 1000);

  }, [])

  let auth = useSelector((state) => {
    return (state.loginuserdetails.isAuthenticated)
  })

  // console.log("app"+auth);
  // console.log("login user data");
  // console.log( data);

  return (
    <>

      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/productss" element={<Products />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cart" element={<CartSection />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/login/password/update" element={<Protectroute isAuthenticated={auth} path='changepas'>
          < Changepas />
        </Protectroute>}></Route>
        {/* <Route path="/login" element={<Login />}></Route> */}
        <Route path="/login" element={<Protectroute isAuthenticated={auth} path='login'>
          <Login />
        </Protectroute>}>
        </Route>

        <Route path="/login/register" element={
          <Protectroute isAuthenticated={auth} path='register' >
            <Register />
          </Protectroute>}>
        </Route>

        <Route path="/profile" element={<Protectroute isAuthenticated={auth} path='profile'>
          <Profile />
        </Protectroute>}>
        </Route>
        <Route path="/forgetpassword" element={<Protectroute isAuthenticated={auth} path='forgetpassword'>
          <Forgetpassword />
        </Protectroute>}>
        </Route>
        <Route path="/password/reset/:id" element={<Protectroute isAuthenticated={auth} path='passwordreset'>
          <Resetpassword />
        </Protectroute>}></Route>
        <Route path="/confirm" element={<Confirm />}></Route>

        {/* <Route render={() =>  navigate("/")} /> */}
        {/* <Route path="/profile" element={<Profile />} ></Route>   */}
        <Route path='*' element={<Four_o_page />}></Route>

      </Routes>
      <Footer></Footer>

    </>
  );
}

export default App;
