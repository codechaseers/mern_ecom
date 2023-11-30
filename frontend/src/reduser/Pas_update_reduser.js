import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

 
 


//actions
  export const Changepassword= createAsyncThunk("passwordupdate", async ({oldpassword,newpassword,confirmpassword},{ rejectWithValue })=>{
   
     
     try {
      const data=await axios.put("/password/update",{oldpassword ,newpassword,confirmpassword} )  
      // const passwordupdate=data
    //   console.log( data.data );
      return data.data
     } catch (error) {
      // console.log(error);
        // return error.response
        return rejectWithValue(error.response.data)
   
     }
 
})
 

  const  Updatepassword= createSlice({
    name:" Updatepassword",
    initialState:{

        loading:false,
        isAuthenticate:false,
        messages:[],
        error:{}

      },
    extraReducers:(builder)=>{
    
      builder.addCase(Changepassword.pending,(state,action)=>{
        state.loading=false
        state.isAuthenticate=false
       state.messages=action.payload
           
        
    }) 
    builder.addCase(Changepassword.fulfilled,(state,action)=>{
        state.loading=false
        state.isAuthenticate=true
        state.messages=action.payload
        
        
    })
    builder.addCase(Changepassword.rejected,(state,action)=>{
        state.loading=true  
        // state.messages=action.payload
        state.isAuthenticate=false
  // console.log(action.payload);
        state.error=action.payload 
         
    })

}

})  
 
 
  
export { Updatepassword} 
 