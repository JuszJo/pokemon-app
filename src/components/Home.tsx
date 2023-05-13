import { Outlet } from "react-router-dom";
import Search from "./Search";

import '../../public/css/home.css';

export default function Home() {
    return (
        <>
            <main>
                <div style={{display: 'flex'}}>
                    <header>
                        <Search />
                    </header>
                    <Outlet />
                </div>

            </main>
        </>
    )
}