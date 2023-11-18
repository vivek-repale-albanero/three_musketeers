import axios from "axios"
export const categoryMovies=async(API_URL)=>{
    try {
        const response=await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.log('error while calling api',error.message)
    }
}

