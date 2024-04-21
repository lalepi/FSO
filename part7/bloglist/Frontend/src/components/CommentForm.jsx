import { useState } from 'react'

import { Typography, Button } from '@mui/material'
import Input from '@mui/material/Input'

const CommentForm = ({ createComment, blog }) => {
    const [newComment, setNewComment] = useState('')

    const addComment = (event) => {
        event.preventDefault()
        createComment({
            blog: blog,
            comment: newComment,
        })

        setNewComment('')
    }
    return (
        <form onSubmit={addComment}>
            <Typography component="div" paddingLeft="15px">
                <Input
                    placeholder="Write comment here"
                    value={newComment}
                    size="small"
                    onChange={({ target }) => setNewComment(target.value)}
                />
                <Button
                    sx={{ marginLeft: '20px' }}
                    variant="contained"
                    size="small"
                    id="create"
                    type="submit"
                >
                    Comment
                </Button>
            </Typography>
        </form>
    )
}

export default CommentForm
