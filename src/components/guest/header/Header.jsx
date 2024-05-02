import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import "./Header.scss"

const Header = () => {
  const navigate = useNavigate()
  // Vérifie si l'utilisateur est authentifié en vérifiant la présence d'un token dans le localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)
  const [username, setUsername] = useState("") // État pour le nom d'utilisateur

  // Fonction appelée lors du clic sur le bouton de déconnexion
  const handleLogout = () => {
    // Supprime le token d'authentification du localStorage et met à jour l'état d'authentification
    localStorage.removeItem("jwt")
    setIsAuthenticated(false)
    setUsername("") // Réinitialisez le nom d'utilisateur
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

    // Récupérer le JWT du localStorage et extraire le nom d'utilisateur
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      const decoded = jwtDecode(jwt) // Décoder le JWT
      const username = decoded.username // Extraire le nom d'utilisateur
      setUsername(username) // Stocker le nom d'utilisateur
    }
  }, [isAuthenticated, navigate])

  return (
    <header className="header">
      <nav>
        <ul className="ulNav">
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
            {isAuthenticated && (
              <Link className="hover-link" to="/contact">
                Contact
              </Link>
            )}
          </li>
          <li className="liNav">
            Bonjour, {/* Texte non cliquable */}
            <Link className="hover-link" to="/users/profile">
              {username} {/* Texte cliquable */}
            </Link>
          </li>
          <li className="liNav">
            {isAuthenticated ? (
              <Link className="hover-link username-link no-hover" to="#" onClick={handleLogout}>
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
