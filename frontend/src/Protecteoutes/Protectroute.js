import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Navigate ,useLocation} from "react-router-dom"

const Protectroute=({isAuthenticated , path="",children})=>{

  console.log(isAuthenticated);
  console.log(path); 
    const navigate = useNavigate();
    const location = useLocation();
 
 
      // if(!isAuthenticated &&path=="login"){
      //    // console.log(path);
      //    return  children
         
      // }
      // else  {
      //    navigate('/profile')
         
      // }
       if(!isAuthenticated &&path=="profile"){
         console.log('Inside the if statement');
      // return   navigate('/profile')
      }
      else if(isAuthenticated &&path=="profile"){
         // console.log(path);
         return  children
         
      } 
      else if(!isAuthenticated &&path=="profile"){
         // console.log(path);
         return  navigate("/productss")
         
      }
     
      else if(!isAuthenticated &&path=="login"){
         return  children
      } 
      else if(isAuthenticated && path=="register"){
         return  navigate('/')
      } 
       else if(!isAuthenticated && path=="register"){
         return  children
      }
      else if(isAuthenticated &&path=="login"){
         return  navigate('/profile')
      }
      else if(isAuthenticated &&path=="changepas"){
         return  children
      }
      else if(!isAuthenticated &&path=="forgetpassword"){
         return  children
      } 
      else if(!isAuthenticated &&path=="passwordreset"){
         return   children
      }
     else{
      return  navigate('/')
     }
 
     } 
         
    

export default Protectroute