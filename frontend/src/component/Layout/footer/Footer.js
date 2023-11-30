// import {Footer} from "react-bootstrap"
 import "./footer.css"
 import { BiSearchAlt } from "react-icons/bi";
 import { BsGoogle } from "react-icons/bs";
 import { BsFacebook } from "react-icons/bs";
 import { BsTwitter } from "react-icons/bs";
 import { BsGithub } from "react-icons/bs";
 import { BsLinkedin } from "react-icons/bs";
 import { BsInstagram } from "react-icons/bs";
 
 


const footer =()=>{
    return(
        <>
 <footer className="text-center text-white mainfooter mt-3">
  {/* <!-- Grid container --> */}
  <div className="container pt-4">
    {/* <!-- Section: Social media --> */}
    <section className="mb-4">
      {/* <!-- Facebook --> */}
      <a
        className="btn btn-link btn-floating btn-lg text-dark m-1"
        href="#!"
        
        ><i className="Footer_icon"><BsFacebook/></i
      ></a>

      {/* <!-- Twitter --> */}
      <a
        className="btn btn-link btn-floating btn-lg text-dark m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="Footer_icon"><BsTwitter/></i
      ></a>

      {/* <!-- Google --> */}
      <a
        className="btn btn-link btn-floating btn-lg text-dark m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="Footer_icon"><BsGoogle/></i
      ></a>

      {/* <!-- Instagram --> */}
      <a
        className="btn btn-link btn-floating btn-lg text-dark m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="Footer_icon"><BsInstagram/></i
      ></a>

      {/* <!-- Linkedin --> */}
      <a
        className="btn btn-link btn-floating btn-lg text-dark m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="Footer_icon"><BsLinkedin/></i
      ></a>
      {/* <!-- Github --> */}
      <a
        className="btn btn-link btn-floating btn-lg text-dark m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="Footer_icon"><BsGithub/></i
      ></a>
    </section>
    {/* <!-- Section: Social media --> */}
  </div>
  {/* <!-- Grid container --> */}

  {/* <!-- Copyright --> */}
  <div className="text-center text-dark p-3 copyright"  >
    © 2023 Copyright:
    <a className="text-dark" href="#"> Ecommerce.com</a>
  </div>
  {/* <!-- Copyright --> */}
</footer>
        </>
    )
}

export default footer;