import React from 'react'

  //   const [newBlog, setNewBlog] = useState({
  //   title: '',
  //   author: '',
  //   url: ''
  // })
export default function BlogForm ({handleSubmission, newBlog, handleBlogField}){
    return(
        <>
            <h2>Add a new blog entry</h2>
            <form onSubmit={handleSubmission}>
                <div>
                    title
                    <input
                    type="text"
                    value={newBlog.title}
                    name="Title"
                    onChange={(event) => handleBlogField({
                        ...newBlog,
                        title: event.target.value
                    })}
                    />
                </div>
                <div>
                    author
                    <input
                    type="text"
                    value={newBlog.author}
                    name="Author"
                    onChange={(event) => handleBlogField({
                        ...newBlog,
                        author: event.target.value
                    })}
                    />
                </div>
                <div>
                    url
                    <input
                    type="text"
                    value={newBlog.url}
                    name="Url"
                    onChange={(event) => handleBlogField({
                        ...newBlog,
                        url: event.target.value
                    })}
                    />
                </div>      
                <button type="submit">Add a new blog</button>         
            </form>
        </>
    )
}