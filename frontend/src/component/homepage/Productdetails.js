import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Ratingstar from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from "react-toastify";
import "./pdetail.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetails } from "../../reduser/PdetailsReduser";
import { Addtocart } from "../../reduser/Addtocartreducer";
 

const ProductDetails = () => {
  const param = useParams();
  const id = param.id;
  const dispatch = useDispatch();
 
  const [value, Setvalue] = useState(1)
  const [alert, setalert] = useState(false)
  const [product_id, setproduct_id] = useState("")
  const [product_Name, setproduct_Name] = useState()
  const [product_Price, seproduct_Price] = useState( )
  const [product_Image, setproduct_Image] = useState( )
  const [quantity, setquantity] = useState( )
  

// login user details check ---------  that means user is loged in or not check
let loginuser = useSelector((state) => {
  return (state.loginuserdetails)
});


  //Reduder call in use effect 

  useEffect(() => {
    dispatch(getDetails({ id }));
  }, []);
  const data = useSelector((state) => {
    return state.pdetails;
  });
  console.log(data);
//toast  message for tostify
  const notify = (message) =>
  toast.info(  message, {
    position: "top-center",
    theme: "colored",
    style: { width: "400px" },
    // icon:<img width="50" height="50"src={img3}></img>,
   
  });

  // Incriment function for quantity 
  const incriment = () => {
    if(value==data.pdetails.product[0].stock)return
    Setvalue(value + 1)
  }
  // decriment function for quantity 

  const decriment = () => {
    if (value < 2) return

    Setvalue(value - 1)
  }

 // dispatch Addtocart api or reducer  

  function Productadd(p_id,p_name,p_price,p_image,p_quantity) {
    if (loginuser.isAuthenticated) {
      
      dispatch(Addtocart({product_id:p_id,product_Name:p_name,product_Price:p_price,product_Image:p_image,quantity:p_quantity})); 
      notify("Your Product is Added ➡️");
      setalert(true)      // this state is use for overcome the reptation
    }
    else{
      // error message if the user not logid in and want to add to cart product 🛑
         notify("please login first to add product in to cart 👀");
      
    }
   
    
  }

  //>>>>>>>>>> Product detail  component 
  return (
    <>
    <ToastContainer />
     {alert ? <></> : <ToastContainer />}
      {useEffect(() => {
        // notify();
      }, [data.pdetails.status === false])}

      {data.pdetails.status === false ? (
        <>
          <HashLoader className="pdetail_spiner"
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />

        
        </>
      ) : (
        //    <><h1>suc</h1></>

        data.pdetails.product &&
        data.pdetails.product.map((product, i) => ( 
            // setproduct_id("hhjkh")
          // setproduct_Name("hjhj")
          // seproduct_Price()
          // setproduct_Image()
          // setquantity()
          <div className="pdetail_main" key={product._id}>
            {console.log(data.pdetails.product)}
            <div className="imageSlider">
              {product.images.map((item, i) => (
                <Carousel
              
                  infiniteLoop
                  useKeyboardArrows
                  autoPlay
                  showArrows={false}
                  key={i}
                >
                  <div className="image" key={item._id}>
                  {/* { setproduct_Image(item.url)} */}
                    <img key={i} src={item.url} alt={item._id} />
                  </div>
                  {/* <div className="image">
                    <img src="https://th.bing.com/th/id/OIP.QhYuEQwGp8WV4c2ZFcW20wHaIp?pid=ImgDet&w=600&h=700&rs=1" />
                  </div>
                  <div className="image">
                    <img src="https://www.dslr-zone.com/wp-content/uploads/2021/10/3-2-768x768.jpeg" />
                  </div> */}
                </Carousel>
              ))}
            </div>
            <div className="prdetails" key={product._id}>
              <div className="cardbody ms-2">
                <Card.Title className="mt-4 fs-1">{product.name} </Card.Title>
                <Ratingstar size={24} value={product.ratings} edit={false} />
                <Card.Title className="mt-5 fs-5">Special price </Card.Title>
                <Card.Text className="fs-2 text-success">{`₹${product.price}`}</Card.Text>
                <Card.Title className=" fs-5">Description : </Card.Title>
                <Card.Text className="fs-6 ">{product.description}</Card.Text>
                <Card.Title className=" fs-5">Stock:- </Card.Title>
                <Card.Text className={product.stock < 1 ? "text-danger fs-5" : "text-success fs-5"
                }>
                  {product.stock < 1 ? "out of stock" : product.stock}
                </Card.Text>
                <Card.Title className=" mt-3 fs-5">Quantity </Card.Title>

                <button className="quantity_btn btn " onClick={decriment}>-</button>
                <input
                type="text"
                  className="quantiy"
                  value={value}
                  readOnly
                />
                <button className="quantity_btn btn" onClick={incriment}>+</button>
             
                <button className=" mt-3 mx-3  search btn btn-warning" type="button" onClick={()=>Productadd(product._id,product.name,product.price,"url",value)}>
                  <FaShoppingCart className="cart_icon" size={"1.2rem"} />
                  Add to Cart
                </button>



                <Card.Title className=" mb-3 mt-5 fs-4">
                  Ratings & Reviews:
                </Card.Title>

                {console.log(product.reviews)}
                {product.reviews == 0 ?
                  <Card.Title className="  fs-5">
                    No review yet
                  </Card.Title>
                  :
                  product.reviews.map((item) => (
                    <Card className=" mt-2" key={item._id}>
                      <Card.Title className="mx-2 fs-5">
                        {item.name}
                        <Ratingstar
                          size={18}
                          value={item.rating}
                          edit={false}
                        />
                      </Card.Title>
                      <Card.Text className="fs-6 mx-2">
                        {
                          item.comment
                        }
                      </Card.Text>
                    </Card>
                  ))}

              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};
export default ProductDetails;
