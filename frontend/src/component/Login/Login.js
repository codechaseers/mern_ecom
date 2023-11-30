import Card from "react-bootstrap/Card";
import "./login.css"
import { useDispatch, useSelector } from "react-redux";
import { Loginuserinput } from "../../reduser/Loginreduser"
import { Userdetail } from "../../reduser/UserdetailReduser"
import { useEffect, useState } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


function Login() {
    const [user, setUser] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [getdata, setgetdata] = useState()
    const [alert, setalert] = useState(false)



    const dispatch = useDispatch();

    // const getInput = (e) => {

    //   setEmail(e.target.value)
    //   setPassword(e.target.value)
    //     // console.log("email : "+ user.email);
    //     // console.log("password : "+ user.password);
    //     // setUser({ ...user, Name[]: value })

    // }
    // get data from store using useselecter

    let data;
    const navigate = useNavigate()


    const submit = (e) => {
        // setUser({email,password})
        e.preventDefault()
        e.target.reset();

        dispatch(Loginuserinput({ email: email, password: password }))
        setalert(true)      // this state is use for overcome the reptation

    }

    const errormesage = (notificaion) =>
        toast.error(notificaion, {
            position: "top-center",
            theme: "colored",
            style: { width: "400px" },

            // icon:<img width="50" height="50"src={img3}></img>,
        }
        );


    const sucessmessage = (notificaion) => {
        toast.success(notificaion, {
            position: "top-center",
            theme: "colored",
            autoClose: 2000,
            style: { width: "400px" },
            // icon:<img width="50" height="50"src={img3}></img>,
        })
    }
    data = useSelector((state) => {
        return (state.loginuser)
    });
    let login_user_data = useSelector((state) => {
        return (state.loginuserdetails)
    });

    {
        useEffect(() => {
            data.message ?
                <>
                    {errormesage(data.error.message)}

                </>
                :
                <></>
        }, [data.message])
    }


    // console.log(data)
    return (
        <>

            {/* <<<<<<<<<< If user login invalied  >>>>>>>>*/}


            {alert ? <ToastContainer /> : <></>}
            {/* <<<<<<<<<< If user suceesfuly login >>>>>>>>*/}

            {useEffect(() => {
                data.isauthenticate ?
                    <>

                        {sucessmessage(data.user.message)}

                        {/* //settimeout is use for showing sucees alert  */}
                        {
                            setTimeout(() => {
                                dispatch(Userdetail({}))
                            }, 2000)
                        }
                    </>
                    :
                    <></>
            }, [data.isauthenticate])}


            <div className="container">

                <Card className="login  ">
                    <i id="login_icon"> <BsShieldLockFill size={"3rem"} color={"black"} /> </i>
                    <div className="logininput">
                        <h2>Login </h2>

                        <form onSubmit={submit} >


                            <div className="form-group">
                                <i className="  "> <FiMail size={"1rem"} color={"black"} /> </i>
                                <label className="label">Email address</label>
                                <input type="email"
                                    required
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp" placeholder="Enter email"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />

                            </div>
                            <div className="form-group">
                                <i className="  "> <RiLockPasswordLine size={"1.2rem"} color={"black"} /> </i>
                                <label className="label">Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    required
                                    placeholder="Password"
                                    onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <button type="submit" className="btn btn-primary w-50 mt-3">Signup</button>
                        </form>
                    </div>

                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card>
                <div className="bottom_links">
                    <NavLink className="bottom_navlinks" to={"/forgetpassword"}>
                        Forget password /
                    </NavLink>
                    <NavLink className="bottom_navlinks" to={"/login/register"}>
                        New user
                    </NavLink>
                </div>
            </div>

        </>
    )
}
export default Login