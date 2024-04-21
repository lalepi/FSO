import { React } from 'react'
import { useDispatch } from 'react-redux'

import CommentForm from '../components/CommentForm'

import { createComment } from '../reducers/blogReducer'

import { Typography } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import CommentIcon from '@mui/icons-material/Comment'

const CommentBlog = (blog) => {
    const dispatch = useDispatch()

    const blogData = blog.blog

    if (!blogData) {
        return null
    }

    const addComment = (comment) => {
        dispatch(createComment(comment))
    }

    const listComments = () => {
        return blogData.comments.map((comment) => {
            return comment
        })
    }
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
            }}
        >
            <CommentForm createComment={addComment} blog={blogData} />
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Comments
            </Typography>
            {Object.entries(listComments()).map(([key, val], i) => {
                return (
                    <ListItem
                        disablePadding
                        sx={{
                            paddingLeft: '20px',
                        }}
                        key={key}
                    >
                        <ListItemIcon>
                            <CommentIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        {val.comment}
                    </ListItem>
                )
            })}
        </List>
    )
}

export default CommentBlog
