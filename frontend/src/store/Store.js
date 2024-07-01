import { configureStore } from "@reduxjs/toolkit";
import {Product}  from "../reduser/Reduser"
import {Productdetail}  from "../reduser/PdetailsReduser"
import {Loginuser}  from "../reduser/Loginreduser"
import {Loginuserdetails}  from "../reduser/UserdetailReduser"
import {Registeruser}  from "../reduser/Registerreduser"
import {Updatepassword}  from "../reduser/Pas_update_reduser"
import {Creatpassword}  from "../reduser/Forgetpasreduser"
import {Setnewpassword}  from "../reduser/Newpassword"
import { Cartproducts } from "../reduser/Addtocartreducer";
import { Allcartproducts } from "../reduser/Cartitemsreduser";
export const store =configureStore(
    
    {
    
    reducer:{
        allproducts:Product.reducer,
        pdetails:Productdetail.reducer,
        loginuser:Loginuser.reducer,
        loginuserdetails:Loginuserdetails.reducer,
        registeruser:Registeruser.reducer,
        updatepassword:Updatepassword.reducer,
        creatpassword:Creatpassword.reducer,
        setnewpassword:Setnewpassword.reducer,
        cartitems:Cartproducts.reducer,
        Allcartproducts:Allcartproducts.reducer,
       
    },
    //it disable the devtools 
    devTools: false,
})