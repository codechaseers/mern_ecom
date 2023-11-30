import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const getDetails= createAsyncThunk("gituser", async ({id })=>{
    console.log(id);
    // console.log(p);
    const resp= await fetch(`/products/find/${id}`)
    const resulet = await resp.json()

    return resulet

})

const Productdetail= createSlice({
    name:"Productdetail",
    initialState:{
        pdetails: [],
        loading:true,
        error:false 
        
    },
    extraReducers:{
    
    [getDetails.pending]:(state)=>{
        state.loading=true        
    } ,
    [getDetails.fulfilled]:(state,action)=>{
        state.loading=false
        state.pdetails=action.payload
        state.error=false   
    } ,
    [getDetails.rejected]:(state,action)=>{
        state.loading=true    
        state.error=true    
    }

}

})  
  
export {Productdetail} 