import axios from "axios";
import storage from './storage'

const baseUrl = "/api/users";

  const getUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }
  
  export default { getUsers};