import storage from '../services/storage'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Box,
    Typography,
} from '@mui/material'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch,
} from 'react-router-dom'

const SingleBlog = ({ blog, toggleLike, removeBlog }) => {
    const navigate = useNavigate()

    const allowRemove = blog.user ? blog.user.username === storage.me() : true
    const nameOfUser = blog.user ? blog.user.name : 'anonymous'

    if (!blog) {
        return null
    }

    return (
        <TableContainer>
            <Table
                sx={{ maxWidth: 600 }}
                aria-label="simple table"
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>SingleBlog</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Blog</TableCell>
                        <TableCell>
                            {blog.title} {blog.author}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>URL</TableCell>
                        <TableCell>
                            <a
                                href={`https://${blog.url}`}
                                target="_blank"
                                rel="noopener"
                            >
                                {blog.url}
                            </a>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Likes</TableCell>
                        <TableCell>{blog.likes}</TableCell>
                        <TableCell>
                            <button onClick={() => toggleLike(blog)}>
                                Like
                            </button>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Added By</TableCell>
                        <TableCell>{nameOfUser}</TableCell>
                        <TableCell>
                            {allowRemove && (
                                <button
                                    id="remove-button"
                                    onClick={() => removeBlog(blog)}
                                >
                                    Remove
                                </button>
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SingleBlog
