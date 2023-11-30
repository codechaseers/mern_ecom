import { createSlice,createAsyncThunk   } from "@reduxjs/toolkit";
import axios from "axios"

 
 


//actions
  export const Newpassword= createAsyncThunk("setpasword", async ({resetToken,password,confirmpassword},{ rejectWithValue })=>{
   
     console.log(resetToken);
     try {
      const data=await axios.put(`/password/reset/${resetToken}`,{password,confirmpassword } )  
      // const setpasword=data
      // console.log( data.data );
      return data.data
     } catch (error) {
      console.log(error);
        // return error.response
        return rejectWithValue(error.response.data)
   
     }
 
})
 

  const  Setnewpassword= createSlice({
    name:" Setnewpassword",
    initialState:{

        loading:false,
        isAuthenticate:false,
        messages:[],
        error:{}

      },
    extraReducers:(builder)=>{
    
      builder.addCase(Newpassword.pending,(state,action)=>{
        state.loading=false
        state.isAuthenticate=false
       state.messages=action.payload
           
        
    }) 
    builder.addCase(Newpassword.fulfilled,(state,action)=>{
        state.loading=false
        state.isAuthenticate=true
        state.messages=action.payload
        
        
    })
    builder.addCase(Newpassword.rejected,(state,action)=>{
        state.loading=true  
        // state.messages=action.payload
        state.isAuthenticate=false
  // console.log(action.payload);
        state.error=action.payload 
         
    })

}

})  
 
 
  
export { Setnewpassword} 
 