import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";

import { FiMail, FiLogIn } from "react-icons/fi";
import { MdPeopleOutline, MdOutlinePersonOutline } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAlldata } from "../../../reduser/Reduser";
import { Loginuserinput } from "../../../reduser/Loginreduser"
import { BsPersonsize } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";



function Nevbar() {

  const [keyword, setkeyword] = useState()
  const [price, setprice] = useState("1000")
  const [key, setkey] = useState()


  //search function
  const Search = (e) => {
    e.preventDefault()
    setkeyword(key.trim())




  }

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {

    dispatch(getAlldata({ keyword }));

  }, [dispatch, keyword,]);

  let loginuser = useSelector((state) => {
    return (state.loginuserdetails)
  });

  return (
    <>
      <div className="shadow-lg ">
        <Nav className="navbar navbar-expand-lg navbar-dark bg-primary navbarSupportedContent  nevabar_ecome">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <h2>MyCart</h2>
            </a>
            <Button
              className="navbar-toggler"
              type="Button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </Button>
            <div
              className="collapse liitems navbar-collapse  "
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto  mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link header " to={"/"}>
                    <i className=" mx-1">
                      <HiOutlineHome size={"1.4rem"} color={"black"} />
                    </i>
                    Home

                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link header" to={`productss`}>
                    <i className=" ">
                      <HiOutlineShoppingBag size={"1.4rem"} color={"black"} /> </i>
                    Products

                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link header" to={"/about"}>
                    <i className=" mx-1"> <MdPeopleOutline size={"1.6rem"} color={"black"} /> </i>
                    About

                  </NavLink>
                </li >
                <li className="nav-item">
                  <NavLink className="nav-link header" to={"/contact"}>
                    <i className=" mx-1"> <FiMail size={"1.2rem"} color={"black"} /> </i>
                    Contact

                  </NavLink>
                </li>
              </ul>
              {loginuser &&
                <>
                  {loginuser.isAuthenticated ?
                    <>  <NavLink className="nav-link header" to={"/profile"}>
                      <i className=" mt-1 "> <MdOutlinePersonOutline size={"2rem"} color={"black"} /> </i>
                      {/* profile */}
                      {loginuser.user.user.name}
                    </NavLink></>
                    : <>  <NavLink className="nav-link header" to={"/login"}>
                      <i className=" mt-1 "> <FiLogIn size={"1.3rem"} color={"black"} /> </i>
                      Login / Register
                    </NavLink></>}
                </>

              }

              <NavLink className="nav-link header" to={"/cart"}>
                <i className=" ">  <IoCartOutline className=" " size={"1.6rem"}  color={"black"}/> </i>
                Cart

              </NavLink>
              <Form className="d-flex" role="search"  >
                <input
                  className="form-control w-75 me-2 search"
                  type="search"
                  placeholder="Search product"
                  aria-label="Search"
                  onChange={(e) => setkey(e.target.value)}
                />
                {/* <i className=" mt-1"> <BiSearchAlt size={"1.4rem"} color={"black"} onClick={Search} /> </i> */}
                <Button className=" search btn btn-warning" type="submit" onClick={Search} >
                  Search
                </Button>

              </Form>

            </div>
          </div>
        </Nav>


      </div>
    </>
  );
}

export default Nevbar;
