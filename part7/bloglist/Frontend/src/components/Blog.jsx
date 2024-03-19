import { useState} from "react";
import storage from '../services/storage'

const Blog = ({ blog, toggleLike, removeBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false);

  const hideWhenVisible = { display: blogVisible ? "none" : "" };
  const showWhenVisible = { display: blogVisible ? "" : "none" };
  const allowRemove =  blog.user ? blog.user.username === storage.me() : true
  
  console.log(blog.user, storage.me(), allowRemove)
  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  console.log("nameOfUser", nameOfUser)

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible} className="blogContent">
        <div>
          Blog: {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes} <button onClick={toggleLike}>Like</button>
        </div>
        <div>User: {blog.user.username}</div>
        <div>

        
        <div>{nameOfUser}</div>
         {allowRemove && <button id="remove-button" onClick={() => removeBlog(blog.id)}>
            Remove
          </button>}

          </div>
      </div>
    </div>
  );
};

export default Blog;
