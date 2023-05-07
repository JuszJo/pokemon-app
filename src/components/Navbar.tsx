import { Link, Outlet } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <Link to={'/'}>Home</Link>
            <Outlet />

        </>
    )
}