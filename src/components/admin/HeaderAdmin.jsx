import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./HeaderAdmin.scss"

const HeaderAdmin = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    console.log("Déconnexion effectuée") // Vérifiez dans la console si ce message est affiché
    //Je sors le token du local storage
    localStorage.removeItem("jwt")
    setIsAuthenticated(false)
  }

  useEffect(() => {
    if (!isAuthenticated && !window.location.pathname.includes("/users/sign_up")) {
      navigate("/users/sign_in")
    }
  }, [isAuthenticated, navigate])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="headerAdmin">
      <nav>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
        <ul className={`ulNavAdmin ${menuOpen ? "open" : ""}`}>
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
