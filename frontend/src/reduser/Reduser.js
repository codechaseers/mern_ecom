import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


//actions
  export const getAlldata= createAsyncThunk("getdata", async ({keyword="",price=[0,200],curentpage="1",category})=>{
      
    let link=`/products?&keyword=${keyword}&page=${curentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
    if(category){
      link=`/products?&keyword=${keyword}&page=${curentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
    }

      
    //   console.log(keyword);
      // console.log(price[1]);
    //   console.log(curentpage);
    const data=  await fetch(link)
    const resulet = await data.json()
   
    return resulet

})
 

  const Product= createSlice({
    name:"Product",
    initialState:{
        products: [],
        loading:true,
        error:false,
        // productCount:0
        
    },
    extraReducers:{
    
    [getAlldata.pending]:(state)=>{
        state.loading=true        
    } ,
    [getAlldata.fulfilled]:(state,action)=>{
        state.loading=false
        state.products=action.payload
        // state.productCount=action.payload
        state.error=false   
    } ,
    [getAlldata.rejected]:(state,action)=>{
        state.loading=true    
        state.error=true    
    }

}

})  
// export const getDetails= createAsyncThunk("gituser", async ()=>{
//     const resp= await fetch("/products/find/64230d0a1b3f206b06a49f02")
//     const resulet = await resp.json()
   
//     return resulet

// })
 
  
export {Product} 
 