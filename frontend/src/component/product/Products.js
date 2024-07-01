import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAlldataperpage, getAlldata } from "../../reduser/Reduser";
import Product from "../homepage/Product";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from "react-toastify";
import Pagination from '@mui/material/Pagination';
import Slider from '@mui/material/Slider';
import Card from "react-bootstrap/Card";
import "./Products.css"
const Products = () => {
  const [curentpage, Setcurentpage] = useState()
  const [price, Setprice] = useState([0, 2000])
  const [category, Setcategory] = useState("")

  const categorys = ["Mobile", "Foods", "Laptop", "Dress", "Sports", "domy product"]
  const handleChange = (eventn, newprice) => {

    Setprice(newprice)


  }


  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(getAlldata({ curentpage, price, category }));
    // console.log(price);
    console.log(category);


  }, [dispatch, curentpage, price, category]);
  //  useEffect(() => {

  //   dispatch(getAlldata({price,}));
  //   // console.log(price);


  // }, [dispatch,price]);


  const notify = () =>
    toast.error("Oops, server not responsing 😣", {
      position: "top-center",
      theme: "colored",
      style: { width: "400px" },
      // icon:<img width="50" height="50"src={img3}></img>,
    });


  // get data from store using useselecter
  setTimeout(() => {

  }, 2000);
  const data = useSelector((state) => {
    return state.allproducts;
  });

  const sucessmessage = (notificaion) =>
    toast.success(notificaion, {
      position: "top-center",
      theme: "colored",
      style: { width: "400px" },
      autoClose: false,

      // icon:<img width="50" height="50"src={img3}></img>,
    });
  const Changepage = (even, newPage) => Setcurentpage(newPage)

  let loginuser = useSelector((state) => {
    return (state.loginuser)
  });
  const [a, seta] = useState(true)



  return (
    <>


      <ToastContainer />

      {/* <h2>Products page</h2> */}
      <div className="productMainContainer">
      <div className="filtercontainer">
          <div className="accordion accordion-flush " id="accordionFlushExample">
            <div className="accordion-item ">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed fs-7" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Applay Filters
                </button>
              </h2>
              <div id="collapseTwo" className=" filter  mt-2 p-3" data-bs-parent="#accordionExample">
                <Card.Title className=" fs-8">Price</Card.Title>
                <Slider className="slider"

                  value={price}
                  aria-label="range"
                  aria-labelledby="range-slider"

                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={2000}
                // getAriaValueText={valuetext}
                />
                <Card.Title className="fs-8 mb-2">Category</Card.Title>
                <ul >
                  {categorys.map((data) => (
                    <li
                      className="category_list"
                      key={data}
                      value={data}
                      onClick={() => Setcategory(data)}
                    >
                      {data}

                    </li>
                  ))}

                </ul>

              </div>

            </div>
          </div>
        </div>   
                   
      <div className="productsMain_container" id="main_container">
       


        {/* <div className="products_container"> */}
        {useEffect(() => {
          if (data.error === true) {
            notify()
          }
        },)}

        {
          data.loading ?
            <>
              <HashLoader
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader" />
              <ToastContainer />

            </>


            :
            data.products.allproducts &&
            data.products.allproducts.map((product) => (

              <Product key={product._id} product={product}></Product>

            ))
        }
      </div>
      {/* </div> */}
     
      </div>

      <div className="pagination">
        {/* onchage function for get cuuret page */}

        <Pagination className=""
          count={Math.round(data.products.productCount / data.products.result_per_page)} color="primary"
          onChange={(even, newPage) => Setcurentpage(newPage)} />
      </div>
    </>
  )
}
export default Products