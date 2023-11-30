import { createSlice,createAsyncThunk, isRejectedWithValue, isRejected } from "@reduxjs/toolkit";
import axios from "axios"
 
 


//actions
  export const Userdetail= createAsyncThunk("userdetail", async ({ rejectWithValue })=>{
    const config={headers:{"Content-Type":"application/json"}}
    
     try {
      const data=await axios.get("/me" )  
      // const userdata=   data  
    
      console.log( data);
      return  data.data
     } catch (error) {
      // console.log(error.response);
        // return error.response
        return rejectWithValue(error.response.data)
   
     }
     

    //   const data=await axios.post("/loginb",{email,password},config)  
    //   .then((res)=>{
   
    //     // console.log(res.data);
    //     const resulet =  res.data
    //     // console.log(resulet);
    //     return resulet
        
    //   }).catch((error)=>{
    //     console.log(error.response);
    //     // return rejectWithValue(error)
    //   return error.response.data.message
    //       })
    //    const userdata=data 
    // console.log( userdata );
    // return userdata

    
 
})


// another acction      Logout 
 
 

  const Loginuserdetails= createSlice({
    name:"Loginuserdetails",
    initialState:{
        user:{},
        loading:true,
        message:false,
        // isAuthenticated: localStorage.getItem('token') ? true : false,
        isAuthenticated:false,
        // error:{}
         
        
        
    },
    extraReducers:(builder)=>{
    
      builder.addCase(Userdetail.pending,(state,action)=>{
        state.loading=true
        state.isAuthenticated=false
       state.message="panding"
        
    }) 
    builder.addCase(Userdetail.fulfilled,(state,action)=>{
        state.loading=false
        state.message="fulfil"  
        state.isAuthenticated=true 
        state.user=action.payload
          
      })
      builder.addCase(Userdetail.rejected,(state,action)=>{
        state.loading=true 
        state.isAuthenticated=false
        state.message="rejected"     
        state.user={}    
        state.error=action.payload 
         
    })  

}

})  
 
 
  
export {Loginuserdetails} 
 