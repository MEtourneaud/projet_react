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
    // useEffect sera appelé après la mise à jour de l'état
    if (!isAuthenticated) {
      // Redirige l'utilisateur vers la page de connexion
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
            <Link to="/mangas">Liste des mangas</Link>
          </li>
          <li className="liNav">
            <Link to="/mangas/random">Au hasard</Link>
          </li>
          <li className="liNav">
            <Link to="/users/:id">Profil</Link>
          </li>
          <li className="liNav">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="liNav">
            {isAuthenticated ? (
              <Link to="#" onClick={handleLogout}>
                Déconnexion
              </Link>
            ) : (
              <Link to="/users/sign_in">Se connecter</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
