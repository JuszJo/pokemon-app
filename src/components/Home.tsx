import { Outlet } from "react-router-dom";
import Search from "./Search";

export default function Home() {
    return (
        <>
            <header>
                <Search />
            </header>
            <Outlet />
        </>
    )
}