import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import "./Header.scss"

const Header = () => {
  const navigate = useNavigate()
  // Vérifie si l'utilisateur est authentifié en vérifiant la présence d'un token dans le localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)
  const [username, setUsername] = useState("") // État pour le nom d'utilisateur
  const [userRoles, setUserRoles] = useState([]) // Stocker les rôles
  const [showLinks, setShowLinks] = useState(false)

  // Fonction appelée lors du clic sur le bouton de déconnexion
  const handleLogout = () => {
    // Supprime le token d'authentification du localStorage et met à jour l'état d'authentification
    localStorage.removeItem("jwt")
    setIsAuthenticated(false)
    setUsername("") // Réinitialisez le nom d'utilisateur
    setUserRoles([]) // Réinitialisez les rôles
  }

  useEffect(() => {
    console.log("Chemin actuel:", window.location.pathname)
    // Détermine si la route actuelle est publique (non soumise à l'authentification)
    const publicRoutes = ["/", "/contact", "/users/sign_up", "/users/sign_in"]
    console.log("Routes publiques:", publicRoutes)

    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    console.log("Chemin actuel:", window.location.pathname)
    const currentPath = window.location.pathname

    console.log("Utilisateur authentifié:", isAuthenticated)
    if (!isAuthenticated && !publicRoutes.includes(currentPath)) {
      console.log("Redirection vers la page de connexion")
      navigate("/")
    }

    // Récupérer le JWT du localStorage et extraire le nom d'utilisateur
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      try {
        const decoded = jwtDecode(jwt)
        const { username, roles = [] } = decoded
        setUsername(username)
        setUserRoles(roles)
      } catch (error) {
        console.error("Erreur lors du décodage du JWT:", error.message)
      }
    }
  }, [isAuthenticated, navigate])

  const hasRole = (role) => {
    return userRoles.includes(role) // Vérifier si l'utilisateur a un rôle spécifique
  }

  const handleShowLinks = () => {
    setShowLinks(!showLinks)
  }

  return (
    <header>
      <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
        <div className="liLogo navbar_logo">
          <Link to="/home">
            <img className="logo" src="/assets/images/logo.png" alt="logo"></img>
          </Link>
        </div>
        <ul className="navbar_links">
          <li className="navbar_item slideInDown-1">
            {/* Lien vers la liste des mangas visible uniquement si l'utilisateur est connecté */}
            {isAuthenticated && (
              <Link className="hover-link navbar_link" to="/mangas">
                Liste des mangas
              </Link>
            )}
          </li>
          <li className="navbar_item slideInDown-1">
            {isAuthenticated && (
              <Link className="hover-link navbar_link" to="/mangas/random">
                Au hasard
              </Link>
            )}
          </li>
          <li className="liSpace navbar_item slideInDown-2">
            {isAuthenticated && (
              <Link className="hover-link navbar_link" to="/contact">
                Contact
              </Link>
            )}
          </li>
          <li className="navbar_item slideInDown-3">
            {isAuthenticated && (
              <Link className="hover-link navbar_link" to="/users/profile">
                Bonjour, {username}
              </Link>
            )}
          </li>
          <li className="navbar_item slideInDown-4">
            {isAuthenticated && (hasRole("admin") || hasRole("superadmin")) && (
              <Link className="hover-link navbar_link" to="/admin/">
                Administration
              </Link>
            )}
          </li>
          <li className="navbar_item slideInDown-5">
            {!isAuthenticated && (
              <Link className="hover-link navbar_link" to="/users/sign_up">
                Inscris-toi !
              </Link>
            )}
          </li>
          <li className="navbar_item slideInDown-6">
            {isAuthenticated ? (
              <Link className="hover-link navbar_link" to="#" onClick={handleLogout}>
                Se déconnecter
              </Link>
            ) : (
              <Link className="hover-link navbar_link" to="/users/sign_in">
                Se connecter
              </Link>
            )}
          </li>
        </ul>
        <button className="navbar_burger" onClick={handleShowLinks}>
          <span className="burger-bar"></span>
        </button>
      </nav>
    </header>
  )
}

export default Header
