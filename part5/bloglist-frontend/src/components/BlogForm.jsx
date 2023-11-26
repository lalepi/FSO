const BlogForm = ({
    addBlog,
    newTitle,
    setNewTitle,
    newAuthor,
    setNewAuthor,
    newUrl,
    setNewUrl
}) => (
    <form onSubmit={addBlog}>
  
      <h2>Create new</h2>
      <div>
        title:
        <input
          value={newTitle} onChange={({target}) => setNewTitle(target.value)}/>
        </div>
        <div>
        author:
        <input
          value={newAuthor} onChange={({target}) => setNewAuthor(target.value)}/>
        </div>
        <div>
        url:
        <input
          value={newUrl} onChange={({target}) => setNewUrl(target.value)}/>
        </div>
  
      <button type="submit">create</button>
    </form>
  )

  export default BlogForm