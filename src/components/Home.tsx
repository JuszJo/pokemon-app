import { Outlet } from "react-router-dom";
import Search from "./Search";

export default function Home() {
    return (
        <>
            <header>
                <Search />
            </header>
            <h1>About</h1>
            <Outlet />
        </>
    )
}