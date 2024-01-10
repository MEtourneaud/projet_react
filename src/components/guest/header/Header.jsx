import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Header.scss"

const Header = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)

  const handleLogout = () => {
    console.log("Avant déconnexion, isAuthenticated :", isAuthenticated) // Supprime le token du local storage
    localStorage.removeItem("jwt")
    // Met à jour l'état d'authentification
    setIsAuthenticated(false)
  }

  useEffect(() => {
    if (!isAuthenticated && !window.location.pathname.includes("/users/sign_up")) {
      // Redirige l'utilisateur vers la page de connexion, sauf s'il est sur la page d'inscription
      console.log("Après déconnexion, isAuthenticated :", isAuthenticated)
      navigate("/users/sign_in")
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
            <Link className="hover-link" to="/mangas">
              Liste des mangas
            </Link>
          </li>
          <li className="liNav">
            <Link className="hover-link" to="/mangas/random">
              Au hasard
            </Link>
          </li>
          <li className="liNav">
            <Link className="hover-link" to="/users/:id">
              Profil
            </Link>
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
