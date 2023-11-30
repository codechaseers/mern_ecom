import Card from "react-bootstrap/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Changepassword } from "../../reduser/Pas_update_reduser"
import { ToastContainer, toast } from "react-toastify";

const Changepas = () => {
    const dispatch = useDispatch();

    const [oldpas, setOldpas] = useState("")
    const [newpas, setNewpas] = useState("")
    const [confpas, setConfpas] = useState("")
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
        console.log(oldpas, newpas, confpas);
        dispatch(Changepassword({ oldpassword: oldpas, newpassword: newpas, confirmpassword: confpas }))
        setalert(true)

    }
    useEffect(() => {

    })

    const data = useSelector((state) => {
        return (state.updatepassword)
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
                        <h2>Change Password </h2>

                        <form onSubmit={submit}   >
                            <div className="form-group">
                                <i className="  "> </i>
                                <label className="label">Old Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    required
                                    placeholder="Password"
                                    onChange={(e) => { setOldpas(e.target.value) }}
                                />
                            </div>   
                             <div className="form-group">
                                <i className="  "> </i>
                                <label className="label">New Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    required
                                    placeholder="Password"
                                    onChange={(e) => { setNewpas(e.target.value) }}
                                />
                            </div>
                            <div className="form-group">
                                <i className="  "> </i>
                                <label className="label">Confirm Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    required
                                    placeholder="Password"
                                    onChange={(e) => { setConfpas(e.target.value) }}
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


export default Changepas