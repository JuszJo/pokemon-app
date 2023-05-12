import { Outlet } from "react-router-dom";
import Search from "./Search";

export default function Home() {
    return (
        <>
            <main>
                <div style={{display: 'flex'}}>
                    <header style={{flexShrink: 0}}>
                        <Search />
                    </header>
                    <Outlet />
                </div>

            </main>
        </>
    )
}