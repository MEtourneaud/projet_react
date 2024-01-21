import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Header.scss"

const Header = () => {
  const navigate = useNavigate()
  // Vérifie si l'utilisateur est authentifié en vérifiant la présence d'un token dans le localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)
  // Gère l'état de l'ouverture ou de la fermeture du menu de navigation
  const [menuOpen, setMenuOpen] = useState(false)

  // Fonction appelée lors du clic sur le bouton de déconnexion
  const handleLogout = () => {
    // Supprime le token d'authentification du localStorage et met à jour l'état d'authentification
    localStorage.removeItem("jwt")
    setIsAuthenticated(false)
  }

  useEffect(() => {
    // Détermine si la route actuelle est publique (non soumise à l'authentification)
    const publicRoutes =
      window.location.pathname === "/" ||
      window.location.pathname === "/contact" ||
      window.location.pathname === "/users/sign_up" ||
      window.location.pathname.includes("/users/sign_in")

    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    if (!isAuthenticated && !publicRoutes) {
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
            {/* Lien vers la liste des mangas visible uniquement si l'utilisateur est connecté */}
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
