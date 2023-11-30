import Card from "react-bootstrap/Card";
import "./register.css"
import { BsShieldLockFill, BsPersonCircle, BsPersonSquare } from "react-icons/bs";
import { FaPersonBooth } from "react-icons/fa";
import { FiMail, FiLogIn } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, NavLink ,useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Registeruserinput } from "../../reduser/Registerreduser";
import { ToastContainer, toast } from "react-toastify";


function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [avtar, setAvtar] = useState("")
    const [avtarpreview, setAvtarpreciew] = useState("")
    const [alert, setalert] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const imageset = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvtar(reader.result)
                setAvtarpreciew(reader.result)
            }
        }
        console.log(e);
        reader.readAsDataURL(e.target.files[0])
    }


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
    return (<>

        {alert ? <ToastContainer /> : <></>}
        {useEffect(() => {
                register_user.isauthenticate ?
                    <>
                        {navigate("/productss")}
                    </>
                    :
                    <></>
            }, [register_user.isauthenticate, navigate])}


        <div className="container">

            <Card className="login  ">
                <i id="register_icon"> <FaPersonBooth size={"2.5rem"} color={"black"} /> </i>
                <div className="logininput">
                    <h2>Register </h2>


                    <form onSubmit={submit} >

                        <div className="form-group">
                            <i className="  "> <BsPersonCircle size={"1rem"} color={"black"} /> </i>
                            <label className="label">User Name</label>
                            <input type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                required
                                aria-describedby="emailHelp"
                                placeholder="Enter a user name"
                                onChange={(e) => { setName(e.target.value) }} />

                        </div>
                        <div className="form-group">
                            <i className="  "> <FiMail size={"1rem"} color={"black"} /> </i>
                            <label className="label">Email address</label>
                            <input type="email" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                onChange={(e) => { setEmail(e.target.value) }} />

                        </div>
                        <div className="form-group">
                            <i className="  "> <RiLockPasswordLine size={"1.2rem"} color={"black"} /> </i>
                            <label className="label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" required placeholder="Password"
                                onChange={(e) => { setPassword(e.target.value) }} />

                            <div className="avtar_container">

                                <div className="avtar_preview mt-2">
                                    {
                                        avtarpreview ?
                                            <img id="profile " src={avtarpreview} alt="" />
                                            :
                                            <img id="profile " src="https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png" alt="" />
                                    }
                                </div>
                                <input type="file" accept="image/*" name="image_input" className="filechose_btn" id="" onChange={imageset} />

                            </div>
                            {/* <button type="button" className="btn border  mt-2">Chose Image</button> */}
                        </div>

                        <button type="submit" className="btn btn-primary w-50 mt-3">Signup</button>


                    </form>

                </div>

                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card>
            <div className="bottom_links">
                <NavLink className="bottom_navlinks" to={"/login"}>
                    Already have an account
                </NavLink>

            </div>
        </div>

    </>
    )
}
export default Register