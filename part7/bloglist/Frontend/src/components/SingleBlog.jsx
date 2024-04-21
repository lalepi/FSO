import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useMatch } from 'react-router-dom'

import storage from '../services/storage'

import { voteBlog, removeBlog } from '../reducers/blogReducer'

import CommentBlog from '../components/Comments'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Button,
} from '@mui/material'

const SingleBlog = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const blogs = useSelector((state) => state.blogs)

    const blogMatch = useMatch('/blogs/:id')
    const blogData = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null

    if (!blogData) {
        return null
    }

    const allowRemove = blogData.user
        ? blogData.user.username === storage.me()
        : true
    const nameOfUser = blogData.user ? blogData.user.name : 'anonymous'

    const toggleLike = (blog) => {
        dispatch(voteBlog(blog))
    }

    const dismissBlog = (blog) => {
        dispatch(removeBlog(blog))
        navigate(-1)
    }

    return (
        <TableContainer>
            <Typography
                variant="h6"
                component="div"
                width="100%"
                paddingLeft="15px"
                paddingTop="20px"
            >
                Single Blog
            </Typography>
            <Table
                sx={{ maxWidth: 300 }}
                aria-label="simple table"
                size="small"
            >
                <TableBody>
                    <TableRow>
                        <TableCell>Blog</TableCell>
                        <TableCell>
                            {blogData.title} {blogData.author}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>URL</TableCell>
                        <TableCell>
                            <a
                                href={`https://${blogData.url}`}
                                target="_blank"
                                rel="noopener"
                            >
                                {blogData.url}
                            </a>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Likes</TableCell>
                        <TableCell>{blogData.likes}</TableCell>
                        <TableCell>
                            <Button
                                variant="contained"
                                size="small"
                                color="success"
                                onClick={() => toggleLike(blogData)}
                            >
                                Like
                            </Button>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Added By</TableCell>
                        <TableCell>{nameOfUser}</TableCell>
                        <TableCell>
                            {allowRemove && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    id="remove-button"
                                    onClick={() => dismissBlog(blogData)}
                                >
                                    Remove
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CommentBlog blog={blogData} />
        </TableContainer>
    )
}

export default SingleBlog
