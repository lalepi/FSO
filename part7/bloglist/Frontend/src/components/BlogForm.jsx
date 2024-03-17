import { useState } from "react";
import PropTypes from "prop-types";
const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };
  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
        title:
        <input
          id="title"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          placeholder="write title here"
        />
      </div>
      <div>
        author:
        <input
          id="author"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder="write author here"
        />
      </div>
      <div>
        url:
        <input
          id="url"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder="write url here"
        />
      </div>

      <button id="create" type="submit">
        create
      </button>
    </form>
  );
};

BlogForm.PropTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
