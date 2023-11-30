import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// This is a domy reduser  which is basically used when you dont use any API simple data get form   componennt    {code by ---------------  Hitesh  Youtuber 🙂}
// const Cartitems = createSlice({
//     name: "  Cartitems",
//     initialState: {
//         Cart_items: [],   
//         messages: [],
//         error: {}

//     },
//     reducers: {
//         // Addtocart: (state, action) => {
//         //   state.items = Addtocart.payload;
//         // },
//         add_to_cart:(state, action)=>{
//           const item={
//             items:action.payload,
//             quantity:action.payload
//           }
//           state.Cart_items.push(item)
//         }

//         // ADD_TO_CART: (state, action) => {
//         //     state.items =action.payload.p_id;
//         //     state.messages="success"
//         //   },
//       },
// })

// export const {add_to_cart}=Cartitems.actions

// export { Cartitems }


//actions
export const Addtocart = createAsyncThunk("cartitems", async ({ product_id, product_Name, product_Price, product_Image, quantity }, { rejectWithValue }) => {
  const config = { headers: { "Content-Type": "application/json" } }

  try {
    const data = await axios.post("/addtocart", { product_id, product_Name, product_Price, product_Image, quantity })
    // const cartitems=data
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
  //    const cartitems=data 
  // console.log( cartitems );
  // return cartitems



})


const Cartproducts = createSlice({
  name: "Cartproducts",
  initialState: {
    items: {},
    loading: true,
    message: false,

    error: {}



  },
  extraReducers: (builder) => {

    builder.addCase(Addtocart.pending, (state, action) => {
      state.loading = true

      state.message = false

    })
    builder.addCase(Addtocart.fulfilled, (state, action) => {
      state.loading = false
      state.message = false
      state.isauthenticate = true
      state.items = action.payload

    })
    builder.addCase(Addtocart.rejected, (state, action) => {
      state.loading = false
      state.message = true

      state.error = action.payload

    })

  }

})



export { Cartproducts }
