import React from 'react'
import Card from "react-bootstrap/Card";
// import "./register.css"
import { BsShieldLockFill, BsPersonCircle, BsPersonSquare } from "react-icons/bs";
import { FaPersonBooth } from "react-icons/fa";
import { FiMail, FiLogIn } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Registeruserinput } from "../../reduser/Registerreduser";
import { ToastContainer, toast } from "react-toastify";

import { FaRegAddressCard } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { TbBuildingEstate } from "react-icons/tb";
import { MdOutlineOutlinedFlag } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { SlCallEnd } from "react-icons/sl";
import { FaShippingFast } from "react-icons/fa";


export default function Confirm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avtar, setAvtar] = useState("")
  const [avtarpreview, setAvtarpreciew] = useState("")
  const [alert, setalert] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()



  const submit = (e) => {
    e.preventDefault()
    e.target.reset();

    dispatch(Registeruserinput({ name: name, email: email, password: password }))
    // console.log(name, email, password, avtarpreview);
    setalert(true)       // this state is use for overcome the reptation


  }
  let register_user = useSelector((state) => {
    return (state.registeruser)
  });
  const register_errormesage = (notificaion) =>
    toast.error(notificaion, {
      position: "top-center",
      theme: "colored",
      style: { width: "400px" },
      // icon:<img width="50" height="50"src={img3}></img>,
    });


  {
    useEffect(() => {
      register_user.message ?
        <>
          {register_errormesage(register_user.error.message)}
          {console.log(register_user.error.message)}

        </>
        :
        <></>
    }, [register_user.message])
  }
  return (
    <div className="container">

      {
        2 == 3 ? <>
          <Card className="login  ">
            <i id=" "> <FaShippingFast size={"2.9rem"} color={"black"} /> </i>
            <div className="logininput">
              <h2>Add Address </h2>


              <form onSubmit={submit} >

                <div className="form-group">
                  <i className="  "> <MdLocationCity size={"1rem"} color={"black"} /> </i>
                  <label className="label">City/Village</label>
                  <input type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    required
                    aria-describedby="emailHelp"
                    placeholder="Enter a City/Village name"
                    onChange={(e) => { setName(e.target.value) }} />

                </div>
                <div className="form-group">
                  <i className="  "> <TbBuildingEstate size={"1rem"} color={"black"} /> </i>
                  <label className="label">State</label>
                  <input type="email" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter State"
                    onChange={(e) => { setEmail(e.target.value) }} />

                </div>
                <div className="form-group">
                  <i className="  "> <MdOutlineOutlinedFlag size={"1.2rem"} color={"black"} /> </i>
                  <label className="label">Country</label>
                  <input type="text" className="form-control" id="exampleInputPassword1" required placeholder="Country"
                    onChange={(e) => { setPassword(e.target.value) }} />


                  {/* <button type="button" className="btn border  mt-2">Chose Image</button> */}
                </div>
                <div className="form-group">
                  <i className="  "> <MdOutlineLocationOn size={"1.2rem"} color={"black"} /> </i>
                  <label className="label">Pin Code</label>
                  <input type="number" className="form-control" id="exampleInputPassword1" required placeholder="Pin code"
                    onChange={(e) => { setPassword(e.target.value) }} />


                  {/* <button type="button" className="btn border  mt-2">Chose Image</button> */}
                </div>
                <div className="form-group">
                  <i className="  "> <SlCallEnd size={"1.2rem"} color={"black"} /> </i>
                  <label className="label">Phone Number</label>
                  <input type="number" className="form-control" id="exampleInputPassword1" required placeholder="Phone Number"
                    onChange={(e) => { setPassword(e.target.value) }} />


                  {/* <button type="button" className="btn border  mt-2">Chose Image</button> */}
                </div>
                <button type="submit" className="btn btn-primary w-50 mt-3">Add Address</button>


              </form>

            </div>

            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card>

          <div className="bottom_links">
            {/* <NavLink className="bottom_navlinks" to={"/login"}>
            Already have an account
        </NavLink> */}

          </div>
        </>
          :
          <>
            <Card className="login  ">
              <i id=" "> <FaShippingFast size={"2.9rem"} color={"black"} /> </i>
              <div className="logininput">
                <h2>Add Address </h2>


                <form onSubmit={submit} >
                  <div className="form-group">
                    <input type="radio" id="html" name="Address" value="HTML" />
                    <label for="html">HTML</label>
                  </div>
                  <div className="form-group">
                    <input type="radio" id="css" name="Address" value="CSS" />
                    <label for="css">CSS</label>
                  </div>
                  <div className="form-group">
                    <input type="radio" id="css" name="Address" value="CSS" />
                    <label for="css">CSS</label>
                  </div>
                  <div className="form-group">
                    <input type="radio" id="css" name="Address" value="CSS" />
                    <label for="css">CSS</label>
                  </div>
                  <button type="submit" className="btn btn-primary w-50 mt-3">Continue with this address</button>
                </form>
                <button type="submit" className="btn btn-warning w-50 mt-3">Add New Address</button>
              </div>

              
            </Card>


          </>
      }




    </div>

  )
}
