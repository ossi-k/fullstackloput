import React from 'react'

const BlogForm = ({
    onSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
}) => {

    return (
        <div>
            <h2>Create a new blog entry</h2>

            <form onSubmit={onSubmit}>
                <div>
                    title
                    <input
                        id='title-field'
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author
                    <input
                        id='author-field'
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url
                    <input
                        id='url-field'
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <button id='blog-submit-button' type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm