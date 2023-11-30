import Card from "react-bootstrap/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiMail } from "react-icons/fi";
import { Forgetpassword } from "../../reduser/Forgetpasreduser"
import { ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")

    const [alert, setalert] = useState(false)

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
    const submit = (e) => {
        e.preventDefault()
        e.target.reset();
        console.log(email);
        dispatch(Forgetpassword({ email: email}))
        setalert(true)

    }


    // useEffect(() => {

    // })

    const data = useSelector((state) => {
        return (state. creatpassword)
    });



    {
        useEffect(() => {
          data.loading?<>
            { errormesage(data.error.message) }
                       { console.log(data.error.message)}

          </>:
                <>

                </>


        }, [data.loading])
    }
    useEffect(() => {
            data.isAuthenticate ? <>
             { sucessmessage(data.messages.message) }
        </>
           : <>

           </>

    }, [data.isAuthenticate])



    //  console.log(data.messages[0]);
    // console.log(data);
    // { console.log(data.loading)}
    return (
        <>
            {alert ? <ToastContainer /> : <></>}

            {/* <<<<<<<<<< If user suceesfuly login >>>>>>>>*/}


            <div className="container">

                <Card className="login  ">
                    <i id="login_icon">   </i>
                    <div className="logininput">
                        <h2>Forget Password </h2>

                        <form onSubmit={submit}   >
                            <div className="form-group">
                            <i className="  "> <FiMail size={"1rem"} color={"black"} /> </i>
                                <label className="label">Email</label>
                                <input type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp" placeholder="Enter email"
                                    required
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-50 mt-3">Confirm</button>
                        </form>
                    </div>

                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card>

            </div>
        </>
    )
}


export default ForgetPassword