import Card from "react-bootstrap/Card";
import "./addto_cart.css";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { Getcartitems } from "../../reduser/Cartitemsreduser";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import emptycart from "../../assets/empty_cart.png"
import { useNavigate } from "react-router-dom";

export const CartProducts = ({ cartProducts,removeCartitem }) => {
const navigate=useNavigate()
  let [totalPrice, SetTotalPrice] = useState(0);
  
//   const [value, Setvalue] = useState(1);
//   const incriment = () => {
//     if (value == 7) return;
//     Setvalue(value + 1);
//   };
  // decriment function for quantity

//   const decriment = () => {
//     if (value < 2) return;

//     Setvalue(value - 1);
//   };
console.log(cartProducts);
useEffect(() => {
    if (cartProducts && cartProducts.data.items.length > 0) {
        let totalPrice=0
       cartProducts.data.items.map((data,i)=>{
        totalPrice+=data.all_items[0].product_Price
      })
      SetTotalPrice(totalPrice);
    }
  }, [cartProducts]);
  function confirm(){
    navigate("/confirm")
  }
  return (
    cartProducts&& 
    cartProducts.data.items.length>0?
    <>
      {/* <div className="cart_row">
        <span>Product</span>
        <span>Quantity</span>
        <span>Price</span>
      </div> */}
      {cartProducts &&
        cartProducts.data.items.length > 0 &&
 
        cartProducts.data.items.map((data, i) => 
       
        (
          <div className="addtocart_main" key={i}>
         {/* {  SetTotalPrice(data.all_items[0].product_Price+=data.all_items[0].product_Price)}   */}
            <div className="cart_container">
              <div className="cart_image">
                <Card.Img
                  className="cart_p_image"
                  variant="top"
                  src={data.all_items[0].product_Image}
                  //   src="https://www.mobilepriceall.com/wp-content/uploads/2021/01/Apple-iphone-13-image.jpg"
                  // src= {img1}
                />

                <div className="cart_products_dtl">
                  <span> {data && data.all_items[0].product_Name}</span>
                  <span>₹{data && data.all_items[0].product_Price}</span>
                  <span className="remove" onClick={()=>removeCartitem(data._id)}> <AiOutlineDelete size={"1.2rem"}/></span>
                </div>
              </div>
            </div>

            <div className="cart_quantity">
              {/* <button className="quantity_btn btn " onClick={decriment}>-</button> */}
              <input
                type="text"
                className="quantiy"
                value={data.quantity}
                readOnly
              />
              {/* <button className="quantity_btn btn" onClick={incriment}>+</button> */}
            </div>

            <div className="cart_products_price">
              <span>₹{data && data.all_items[0].product_Price}</span>
            </div>
          </div>
        ))}

      <div className="main_bootom">
        <div className="boutom_container">
          <div className="divider"> </div>
          <div className="Total_price">
            <span>Total Praice:</span>
            <span>₹{totalPrice}</span>
          </div>
          <button className=" confirm btn-warning btn  mt-2" onClick={confirm}>Confirm</button>
        </div>
      </div>
    </>
    :<>

   <div className="noproductFoundMaindiv">
    <div className="emptycart_image">
      <img src={emptycart} alt="not found image" />
    </div>
   </div>
    
    
    </>
  );
};
