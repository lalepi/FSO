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

const SingleUser = ({ user }) => {
    if (!user) {
        return null
    }

    return (
        <div>
            <TableContainer>
                <Table
                    sx={{ maxWidth: 600 }}
                    aria-label="simple table"
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {' '}
                                User {user.username} has added blogs
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.blogs.map((blog) => {
                            return (
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        <Link to={`/blogs/${blog.id}`}>
                                            {blog.title}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default SingleUser
