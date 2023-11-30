import { createSlice,createAsyncThunk, isRejectedWithValue, isRejected } from "@reduxjs/toolkit";
import axios from "axios"
 
 


//actions
  export const Loginuserinput= createAsyncThunk("userdata", async ({ email,password},{ rejectWithValue })=>{
    const config={headers:{"Content-Type":"application/json"}}
    
     try {
      const data=await axios.post("/login",{email,password} )  
      // const userdata=data
      console.log( data );
      return data.data
     } catch (error) {
      console.log(error.response);
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
 

  const Loginuser= createSlice({
    name:"Loginuser",
    initialState:{
        user:{},
        token:localStorage.getItem('token'),
        loading:true,
        message:false,
        // isAuthenticated: localStorage.getItem('token') ? true : false,
        isAuthenticated:false,
        error:{}
         
        
        
    },
    extraReducers:(builder)=>{
    
      builder.addCase(Loginuserinput.pending,(state,action)=>{
        state.loading=true
       state.isauthenticate=action.payload 
       state.message=false 
        
    }) 
    builder.addCase(Loginuserinput.fulfilled,(state,action)=>{
        state.loading=false
        state.message=false
        state.isauthenticate=true
        state.user=action.payload
          
      })
      builder.addCase(Loginuserinput.rejected,(state,action)=>{
        state.loading=false  
        state.message=true
        state.isauthenticate=false          
        state.error=action.payload 
         
    })

}

})  
 
 
  
export {Loginuser} 
 