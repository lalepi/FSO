import PropTypes from 'prop-types'
import { BrowserRouter as Router, Link } from 'react-router-dom'
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

const Blog = ({ blog, create }) => {
    blog.map((blog) => <Blog key={blog.id} blog={blog} />)

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>{create}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        {blog.map((blog) => {
                            return (
                                <div key={blog.id}>
                                    <Link to={`/blogs/${blog.id}`}>
                                        {blog.title}
                                        {blog.author}
                                    </Link>
                                </div>
                            )
                        })}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default Blog
