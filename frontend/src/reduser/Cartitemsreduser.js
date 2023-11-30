import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
 


//actions
export const Getcartitems = createAsyncThunk("allcartitems", async (  { rejectWithValue }) => {
   

  try {
    const data = await axios.post("/getcartitems",  "6503dc279a7f58e365b00239")
    // const allcartitems=data
    console.log(data);
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
  //    const allcartitems=data 
  // console.log( allcartitems );
  // return allcartitems



})


const Allcartproducts = createSlice({
  name: "Allcartproducts",
  initialState: {
    allitems: {},
    loading: true,
    message: false,

    error: {}



  },
  extraReducers: (builder) => {

    builder.addCase(Getcartitems.pending, (state, action) => {
      state.loading = true

      state.message = false

    })
    builder.addCase(Getcartitems.fulfilled, (state, action) => {
      state.loading = false
      state.message = false
    //   state.isauthenticate = true
      state.allitems = action.payload

    })
    builder.addCase(Getcartitems.rejected, (state, action) => {
      state.loading = false
      state.message = true

      state.error = action.payload

    })

  }

})



export { Allcartproducts }
