import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Ratingstar from "react-rating-stars-component";
import img1 from "./img1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";



//rating option

const Product = (props) => {
  async function getproduct() {
    const res = await fetch("/products");
    // const res=await fetch("https://api.github.com/users")
    const data = await res.json();
    // console.log(data );
  }
  useEffect(() => {
    getproduct();
  }, []);

  //rating options
  const Option = {
    value: props.product.ratings,
    edit: false,
    isHalf: true,
  };




  return (
    <>
      {/* <h1> {props.product.name}</h1> */}
      <Link className="productlink" to={`/product/${props.product._id}`} key={props.product._id}>

        <div className="cards ms-4   ">
          <Card.Img
            className=" w-100 card-img-top"
            variant="top"
            src={props.product.images[0].url}
          // src= {img1}
          />

          <div className="cardbody ms-2">
            <Card.Title className="mt-4">{props.product.name}</Card.Title>
            {/* <Card.Text>Some quick example text to</Card.Text> */}
            <Card.Title className="fs-3 text-success">{`₹${props.product.price}`}</Card.Title>
            <span> {`${props.product.numofReviews} reviews`}</span>
            <Ratingstar {...Option}></Ratingstar>
          </div>

          {/* <Button variant="primary">Go somewhere</Button> */}
        </div>

      </Link>
    </>
  );
};
export default Product;
