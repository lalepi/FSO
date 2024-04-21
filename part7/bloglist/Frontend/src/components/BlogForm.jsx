import { useState } from 'react'

import { Box, Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }
    return (
        <Typography component="div">
            <form onSubmit={addBlog}>
                <Box component="div">
                    <Typography variant="h6" component="div">
                        Create new Blog
                    </Typography>
                    <Typography component="div">
                        <TextField
                            sx={{ paddingBottom: '5px' }}
                            placeholder="Write comment here"
                            value={newTitle}
                            onChange={({ target }) => setNewTitle(target.value)}
                        />
                    </Typography>
                    <Typography component="div">
                        <TextField
                            sx={{ paddingBottom: '5px' }}
                            placeholder="write author here"
                            value={newAuthor}
                            onChange={({ target }) =>
                                setNewAuthor(target.value)
                            }
                        />
                    </Typography>
                    <Typography component="div">
                        <TextField
                            sx={{ paddingBottom: '5px' }}
                            placeholder="write url here"
                            value={newUrl}
                            onChange={({ target }) => setNewUrl(target.value)}
                        />
                    </Typography>
                </Box>
                <Box sx={{ paddingBottom: '5px' }}>
                    <Button
                        variant="contained"
                        size="small"
                        color="success"
                        id="create"
                        type="submit"
                    >
                        create
                    </Button>
                </Box>
            </form>
        </Typography>
    )
}

export default BlogForm
