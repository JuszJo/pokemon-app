import { Outlet } from "react-router-dom";
import Search from "./Search";

import '../../public/css/home.css';
import pokemonLogo from '../assets/International_Pokémon_logo.svg';

export function WelcomePage() {
    return (
        <>
            <section id='pokemon-logo-section'>
                <div>
                    <img src={pokemonLogo} alt="Pokemon Logo" />
                </div>
            </section>
        </>
    )
}

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