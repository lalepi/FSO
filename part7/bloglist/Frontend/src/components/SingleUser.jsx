import { useSelector } from 'react-redux'
import { Link, useMatch } from 'react-router-dom'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
} from '@mui/material'

const SingleUser = () => {
    const users = useSelector((state) => state.users)

    const match = useMatch('/users/:id')
    const userData = match
        ? users.find((user) => user.id === match.params.id)
        : null

    if (!userData) {
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
                                User {userData.username} has added blogs
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData.blogs.map((blog) => {
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
