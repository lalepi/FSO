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
  const request = await axios.post(baseUrl, newObject, getConfit());
  return request.data
};

const update = async (likedBlog) => {
  const request = await axios.put(`${baseUrl}/${likedBlog.id}`, likedBlog, getConfit());
 return request.data
};

const remove = async (blog) => {
  const request = await axios.delete(`${baseUrl}/${blog.id}`, getConfit());
  return request.data
};

const comment = async (content) => {
  const request = await axios.post(`${baseUrl}/${content.blog.id}/comments`, content, getConfit());
  return request.data
};

export default { getAll, create, update, remove, comment};
