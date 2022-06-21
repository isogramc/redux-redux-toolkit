import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="Header">
            <h1>Redux Weather</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
