import { Link } from "react-router-dom"
import "./Header.scss"

const Header = () => {
  return (
    <header className="head">
      <nav>
        <ul className="ulNav">
          <li className="liLogo">
            <Link className="homelogo" to="/">
              <img className="logo" src="/assets/images/logo.png" alt="logo"></img>
            </Link>
          </li>
          <li className="liNav">
            <Link to="/mangas">Liste des mangas</Link>
          </li>
          <li className="liNav">
            <Link to="/mangas/random">Au hasard</Link>
          </li>
          <li className="liNav">
            <Link to="/users/sign_in">Se connecter</Link>
          </li>
          <li className="liNav">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
