import axios from "axios";
import storage from './storage'

const baseUrl = "/api/blogs";

const getConfit = () => ({
  headers : { Authorization: `Bearer ${storage.loadUser().token}` }
})

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {

  const request = axios.post(baseUrl, newObject, getConfit());
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, getConfit());
  return request.then((response) => response.data);
};

const remove = (id) => {
 
  const request = axios.delete(`${baseUrl}/${id}`, getConfit());
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
