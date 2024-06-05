import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./HeaderAdmin.scss"

const HeaderAdmin = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)
  const [showLinks, setShowLinks] = useState(false)

  const handleLogout = () => {
    console.log("Déconnexion effectuée") // Message de débogage
    localStorage.removeItem("jwt") // Suppression du token
    console.log("JWT après suppression:", localStorage.getItem("jwt")) // Devrait être null
    setIsAuthenticated(false) // Met à jour l'état d'authentification
    navigate("/users/sign_in") // Redirige après déconnexion
  }

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Redirection après déconnexion") // Pour déboguer
      navigate("/users/sign_in") // Redirige si l'utilisateur n'est pas authentifié
    }
  }, [isAuthenticated, navigate])

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
            <Link className="hover-link navbar_link" to="/admin/mangas">
              Gestion des mangas
            </Link>
          </li>
          <li className="navbar_item slideInDown-1">
            <Link className="hover-link navbar_link" to="/admin/mangas/create">
              Création d'un manga
            </Link>
          </li>
          <li className="navbar_item slideInDown-1">
            <Link className="hover-link navbar_link" to="/admin/users">
              Gestion des utilisateurs
            </Link>
          </li>
          <li className="navbar_item slideInDown-1">
            <Link className="hover-link navbar_link" onClick={handleLogout}>
              Se déconnecter
            </Link>
          </li>
        </ul>
        <button className="navbar_burger" onClick={handleShowLinks}>
          <span className="burger-bar"></span>
        </button>
      </nav>
    </header>
  )
}

export default HeaderAdmin
