import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
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

const Users = ({ allUsers }) => {
    return (
        <div>
            <TableContainer>
                <Table
                    sx={{ maxWidth: 300 }}
                    aria-label="simple table"
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <h1>Users</h1>
                            </TableCell>
                            <TableCell>
                                <h2> Blogs created</h2>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(allUsers).map(([key, val], i) => {
                            return (
                                <TableRow key={val.id}>
                                    <TableCell>
                                        <Link to={`/users/${val.id}`}>
                                            {val.username}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        {val.blogs.length}
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

export default Users
