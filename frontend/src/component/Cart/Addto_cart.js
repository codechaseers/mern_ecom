import Card from "react-bootstrap/Card";
import "./addto_cart.css"
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Getcartitems } from "../../reduser/Cartitemsreduser";






export const Addto_Cart = () => {
    const dispatch=useDispatch()
    useEffect(()=>{

        dispatch(Getcartitems( {}))
    })

    const [value, Setvalue] = useState(1)
    const incriment = () => {
        if (value == 7) return
        Setvalue(value + 1)
    }
    // decriment function for quantity 

    const decriment = () => {
        if (value < 2) return

        Setvalue(value - 1)
    }
    return (
        <>
            <div className="cart_row">
                <span>Product</span>
                <span>Quantity</span>
                <span>Price</span>
            </div>
            <div className="addtocart_main">

                <div className="cart_container">
                    <div className="cart_image">
                        <Card.Img
                            className="   cart_p_image"
                            variant="top"
                            src="https://www.mobilepriceall.com/wp-content/uploads/2021/01/Apple-iphone-13-image.jpg"
                        // src= {img1}
                        />

                        <div className="cart_products_dtl">
                            <span>Iphone</span>
                            <span>₹2000</span>
                            <span className="remove">Remove</span>
                        </div>
                    </div>
                </div>

                <div className="cart_quantity">
                    <button className="quantity_btn btn " onClick={decriment}>-</button>
                    <input
                        type="text"
                        className="quantiy"
                        value={value}
                        readOnly
                    />
                    <button className="quantity_btn btn" onClick={incriment}>+</button>
                </div>

                <div className="cart_products_price">
                    <span>₹2000</span>
                </div>
            </div>  
            <div className="addtocart_main">

                <div className="cart_container">
                    <div className="cart_image">
                        <Card.Img
                            className="   cart_p_image"
                            variant="top"
                            src="https://www.mobilepriceall.com/wp-content/uploads/2021/01/Apple-iphone-13-image.jpg"
                        // src= {img1}
                        />

                        <div className="cart_products_dtl">
                            <span>Iphone</span>
                            <span>₹2000</span>
                            <span className="remove">Remove</span>
                        </div>
                    </div>
                </div>

                <div className="cart_quantity">
                    <button className="quantity_btn btn " onClick={decriment}>-</button>
                    <input
                        type="text"
                        className="quantiy"
                        value={value}
                        readOnly
                    />
                    <button className="quantity_btn btn" onClick={incriment}>+</button>
                </div>

                <div className="cart_products_price">
                    <span>₹2000</span>
                </div>
            </div>
           

            <div className="main_bootom">
                <div className="boutom_container">
                    <div className="divider">  </div>
                    <div className="Total_price">
                        <span>Total Praice:</span>
                        <span>₹1567</span>

                    </div>
                    <button className=" confirm btn-warning btn  mt-2">Confirm</button>
                </div>

            </div>

        </>
    )
}