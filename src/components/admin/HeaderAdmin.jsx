import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./HeaderAdmin.scss"

const HeaderAdmin = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)

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

  return (
    <header className="headerAdmin">
      <nav>
        <ul className="ulNavAdmin">
          <li className="liLogoAdmin">
            <Link to="/admin">
              <img className="logoAdmin" src="/assets/images/logo.png" alt="logo"></img>
            </Link>
          </li>
          <li className="liNavAdmin">
            <Link to="/admin/mangas">Gestion des mangas</Link>
          </li>
          <li className="liNavAdmin">
            <Link to="/admin/mangas/create">Création d'un manga</Link>
          </li>
          <li className="liNavAdmin">
            <Link to="/admin/users">Gestion des utilisateurs</Link>
          </li>
          <li className="liNavAdmin">
            <Link onClick={handleLogout}>Se déconnecter</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderAdmin
