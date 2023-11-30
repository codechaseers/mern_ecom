import { createSlice,createAsyncThunk, isRejectedWithValue, isRejected } from "@reduxjs/toolkit";
import axios from "axios"
 
 


//actions
  export const Registeruserinput= createAsyncThunk("userdata", async ({ name,email,password,avtar=""},{ rejectWithValue })=>{
    const config={headers:{ 'Content-Type': 'multipart/form-data'}}
    
     try {
      const data=await axios.post("/register",{name,email,password},config)  
      // const userdata=data
      // console.log( userdata );
      return data.data
     } catch (error) {
      // console.log(error);
        // return error.response
        return rejectWithValue(error.response.data)
   
     }


    
 
})
 

  const Registeruser= createSlice({
    name:"Registeruser",
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
    
      builder.addCase(Registeruserinput.pending,(state,action)=>{
        state.loading=true
       state.isauthenticate=action.payload 
       state.message=false 
        
    }) 
    builder.addCase(Registeruserinput.fulfilled,(state,action)=>{
        state.loading=false
        state.message=false
        state.isauthenticate=true
        state.user=action.payload
          
      })
      builder.addCase(Registeruserinput.rejected,(state,action)=>{
        state.loading=false  
        state.message=true
        state.isauthenticate=false          
        state.error=action.payload 
         
    })

}

})  
 
 
  
export {Registeruser} 
 