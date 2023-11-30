import axios from "axios"
const About=()=>{
    const datauser = async () => {


        try {
             let data=await axios.get("/me");
            // Check if the logout request was successful
     
            // navigate("/")
            
            // Refresh the page
            // setTimeout(() => {
            //     window.location.reload();

            // }, 1000);
            console.log(data);
             
        } catch (error) {
            console.log(error.response);
            //   // return error.response
            //   return rejectWithValue(error.response.data)

        }
    }
    return(
        <>
        <h2>About page</h2>
        <button onClick={datauser}>data</button>
        </>
    )
}
export default About