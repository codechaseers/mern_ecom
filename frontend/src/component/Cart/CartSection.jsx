import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartProducts } from "./CartProducts";
 
import axios from "axios"


export default function CartSection() {
  let [userId,setUserId]=useState("")
  let [cartProducts,setCartProducts]=useState("")
  let [removedProduct,setRemovedProduct]=useState(false)

  let loginuser = useSelector((state) => {
    return (state.loginuserdetails)
  });

  const getCartitems = async ( user) => {

    try {
        const cartProducts = await axios.post("/getcartitems",{user})
        console.log(cartProducts);
        if(cartProducts.status==200){
          setCartProducts(cartProducts)
        }

    } catch (error) {
        console.log(error);
    }

}
const removeCartitem=async (id)=>{
  try {
    const removeItem = await axios.post("/removeitem",{id})
    // console.log("remove cart iems",removeItem);
    setRemovedProduct(true)
    console.log(id)
    console.log(removeItem)
  } catch (error) {
    console.log(error);
    
  }

}
useEffect(()=>{
  if(loginuser.isAuthenticated){
    setUserId(loginuser.user.user._id)
      }
})

   
useEffect(()=>{
 
    getCartitems(userId)
}, [ userId,removedProduct ])

// console.log(userId);
// console.log(cartProducts);

  return (
    <>
    <CartProducts
    cartProducts={cartProducts}
    removeCartitem={removeCartitem}
    
    />
    </>
  )
}
