import "./Profile.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Logoutreduser } from "../../reduser/UserdetailReduser"
import { Userdetail } from "../../reduser/UserdetailReduser"
import axios from "axios"


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [navi, setnavi] = useState(false)
    const [hide, sethide] = useState("user_detail")
    const [show, setshow] = useState("edit_details")
    const detailclas = "user_details"


    // get the login user data 
    let loginuser = useSelector((state) => {
        return (state.loginuserdetails)
    });

    const [name, setName] = useState(loginuser.user.user.name)
    const [email, setEmail] = useState(loginuser.user.user.email)


    const Setprofile = () => {
        // console.log("hii");
        setshow("edit_detailss")
        sethide("user_details")

    } 
    
    const Save = async (e) => {
        e.preventDefault()
        console.log(name, email);

        try {
            const update = await axios.put("/profile/update", { name, email })

            console.log(update);

        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {

            dispatch(Userdetail({}))
            // setshow("edit_details")
            // sethide("user_detail")

        }, 1000);


    }

    // logout APi call on submit 

    const Logout = async () => {

        await axios.get("/logout");
        //     // Check if the logout request was successful

        navigate("/")
        // Refresh the page
        setTimeout(() => {
            window.location.reload();

        }, 1000);
    }


    return (

        <>

            {navi ? window.location.reload() : <></>}
            {/* 
                <div className="user_container"> */}

            <h2 className="user_heading">My profile</h2>
            <div className="user_container">
                <div className={hide }>
                    {/* <Card.Img
                            className="card_image w-25 rounded-circle mx-2 card-img-top"
                            variant=""
                            // src={props.product.images[0].url}
                            src="https://th.bing.com/th/id/OIP._6kSqsTmX5o4yeSjGnw48AHaLH?pid=ImgDet&rs=1"
                        /> */}
                    <div className="profile_images">

                        <img id="profile " src="https://media.licdn.com/dms/image/D4D03AQEQdyr2q8JRuw/profile-displayphoto-shrink_800_800/0/1680162600266?e=2147483647&v=beta&t=tX8HbPkoMIfXTB4ld1Vn2I24diWwjos-cO8MR62QsUY" alt="" />
                    </div>


                    <button type="submit" onClick={Setprofile} className="btn w-50 fs-6  m-3 btn-warning " >Edit profile</button>
                </div>
                <div className={show}>
                    {/* <Card.Img
                            className="card_image w-25 rounded-circle mx-2 card-img-top"
                            variant=""
                            // src={props.product.images[0].url}
                            src="https://th.bing.com/th/id/OIP._6kSqsTmX5o4yeSjGnw48AHaLH?pid=ImgDet&rs=1"
                        /> */}
                    <div className="profile_images">

                        <img id="profile " src="https://media.licdn.com/dms/image/D4D03AQEQdyr2q8JRuw/profile-displayphoto-shrink_800_800/0/1680162600266?e=2147483647&v=beta&t=tX8HbPkoMIfXTB4ld1Vn2I24diWwjos-cO8MR62QsUY" alt="" />
                    </div>


                    <button type="submit" onClick={Setprofile} className="btn w-50 fs-6 btn-warning m-2" >chosefile</button>
                </div>


                <div className={hide}>
                    <Card.Title className="mt-4 fs-2">Name</Card.Title>
                    <Card.Text className="fs-3">{loginuser.user.user.name}</Card.Text>
                    <Card.Title className="mt-4 fs-2">Email</Card.Title>
                    <Card.Text className="fs-3" >{loginuser.user.user.email}</Card.Text>

                    <Card.Title className="mt-4 fs-3">Order Details</Card.Title>
                    <Card.Text className="fs-3" >sudhanshu shekahr ojha @gmail.com</Card.Text>
                    {/* <Card.Title className="mt-4 fs-3">Wishlist</Card.Title>
                            <Card.Title className="mt-4 fs-3">Addres</Card.Title> */}
                    {/* <Card.Title className="mt-4 fs-2">Change password</Card.Title> */}
                    {/*                            
                            <Card.Text>This is a short description elaboratingThis is a short description elaborating the service you have mentioned above.</Card.Text> */}
                    <button type="button" className="btn fs-6 mb-3 btn-primary w-50" >My Orders</button>
                    <br />
                    
                    <button type="button" className="btn fs-6 mb-3 btn-primary w-50" onClick={()=>{navigate("/login/password/update")}}>Change Password</button>
                    <br />
                    <button type="button" onClick={Logout} className="btn mb-3 fs-6 btn-primary w-50" >Logout</button>


                </div>


                {/* edit profile content >>*/}


                <div className={show}>
                    <form onSubmit={Save}>
                        <Card.Title className="mt-4 fs-2">Name</Card.Title>
                        {/* <input type="text" placeholder={loginuser.user.user.name} /> */}
                        <input type="text" required className="form-control mt-2" id="exampleInputText" aria-describedby="emailHelp"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />

                        <Card.Title className="mt-4 fs-2">Email</Card.Title>
                        <input type="email" required className="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }} />

                        <button type="submit" className="btn mt-2 fs-6 btn-primary w-50" >Save</button>
                    </form>
                </div>  

                 
            </div>
            {/* </div>
                */}

        </>
    )

}


export default Profile