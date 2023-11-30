import "./Home.css";
import { Button } from "react-bootstrap";
import { BsMouse2 } from "react-icons/bs";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAlldata } from "../../reduser/Reduser";
// import { Userdetail } from "../../reduser/UserdetailReduser"
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import  Metadata  from "../Layout/Metadata";

const Home = () => {
  const dispatch = useDispatch();
// !important >>>>   you should use a {} bracket in empty reduser function 

  useEffect(() => {

    dispatch(getAlldata({}));
  

  }, [dispatch]);
 
 
  const notify = () =>
    toast.error("Oops, server not responsing 😣", {
      position: "top-center",
      theme: "colored",
      style:{ width: "400px" },
      // icon:<img width="50" height="50"src={img3}></img>,
    }); 

  // get data from store using useselecter
  const data = useSelector((state) => {
    return state.allproducts;
  }); 
  console.log(data);
  // console.log(data.loading)

  return (
    <>
 
      {/* <Metadata title="MyCart"></Metadata> */}
      <div className="home">
        <div className="heading">
          <h1>HOME SHOP NOW AND SAVE BIG AT OUR ONLINE STORE !</h1>
          <h2>So why wait? </h2>{" "}
          <p>Visit our online store today and start shopping!</p>
          <a href="#product_container">
            <button>
              Scroll{" "}
              <i>
                <BsMouse2 size={"0.8em"} />
              </i>
            </button>
          </a>
        </div>

        <div className="home2"> </div>
      </div>
      <h2 className="home_heading">Featured Products</h2>
     

      {/* product component */}

      <div className="product_container" id="product_container">
      { useEffect(()=>{
        if(data.error===true){
          notify()
        }
      },)}
        {data.loading?
        
        <> 
        <ToastContainer />
        
        <HashLoader
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/>
        
         
        </>
          :
          data.products.allproducts &&
          data.products.allproducts.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))
          
        
        }
      </div>
    </>
  );
};
export default Home;
