import { createSlice,createAsyncThunk   } from "@reduxjs/toolkit";
import axios from "axios"

 
 


//actions
  export const Forgetpassword= createAsyncThunk("passwordforget", async ({email, },{ rejectWithValue })=>{
   
     
     try {
      const data=await axios.post("/password/forget",{email } )  
      // const passwordforget=data
    //   console.log( data.data );
      return data.data
     } catch (error) {
      // console.log(error);
        // return error.response
        return rejectWithValue(error.response.data)
   
     }
 
})
 

  const  Creatpassword= createSlice({
    name:" Creatpassword",
    initialState:{

        loading:false,
        isAuthenticate:false,
        messages:[],
        error:{}

      },
    extraReducers:(builder)=>{
    
      builder.addCase(Forgetpassword.pending,(state,action)=>{
        state.loading=false
        state.isAuthenticate=false
       state.messages=action.payload
           
        
    }) 
    builder.addCase(Forgetpassword.fulfilled,(state,action)=>{
        state.loading=false
        state.isAuthenticate=true
        state.messages=action.payload
        
        
    })
    builder.addCase(Forgetpassword.rejected,(state,action)=>{
        state.loading=true  
        // state.messages=action.payload
        state.isAuthenticate=false
  // console.log(action.payload);
        state.error=action.payload 
         
    })

}

})  
 
 
  
export { Creatpassword} 
 