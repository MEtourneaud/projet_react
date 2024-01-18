// Header.jsx

import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Header.scss"

const Header = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const isHomePageOrPublicRoute =
      window.location.pathname === "/" ||
      window.location.pathname === "/contact" ||
      window.location.pathname === "/users/sign_up" ||
      window.location.pathname.includes("/users/sign_in")

    if (!isAuthenticated && !isHomePageOrPublicRoute) {
      navigate("/users/sign_in")
    }
  }, [isAuthenticated, navigate])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="header">
      <nav>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
        <ul className={`ulNav ${menuOpen ? "open" : ""}`}>
          <li className="liLogo">
            <Link to="/">
              <img className="logo" src="/assets/images/logo.png" alt="logo"></img>
            </Link>
          </li>
          <li className="liNav">
            {isAuthenticated && (
              <Link className="hover-link" to="/mangas">
                Liste des mangas
              </Link>
            )}
          </li>
          <li className="liNav">
            {isAuthenticated && (
              <Link className="hover-link" to="/mangas/random">
                Au hasard
              </Link>
            )}
          </li>
          <li className="liNav">
            <Link className="hover-link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="liNav">
            {isAuthenticated ? (
              <Link className="hover-link" to="#" onClick={handleLogout}>
                Déconnexion
              </Link>
            ) : (
              <Link className="hover-link" to="/users/sign_in">
                Se connecter
              </Link>
            )}
          </li>
          <li className="liNav">
            {!isAuthenticated && (
              <Link className="hover-link" to="/users/sign_up">
                Inscris-toi !
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
