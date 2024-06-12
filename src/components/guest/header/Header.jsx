import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import "./Header.scss"

const Header = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)
  const [username, setUsername] = useState("")
  const [userRoles, setUserRoles] = useState([])
  const [showLinks, setShowLinks] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    setIsAuthenticated(false)
    setUsername("")
    setUserRoles([])
  }

  useEffect(() => {
    const publicRoutes = [
      "/",
      "/contact",
      "/cgu",
      "/mangas",
      "/mangas/details/:mangaId",
      "/users/sign_up",
      "/users/sign_in",
    ]

    const currentPath = window.location.pathname

    const isPublicRoute = publicRoutes.some((route) => {
      const routeRegex = new RegExp(`^${route.replace(/:\w+/g, "\\w+")}$`)
      return routeRegex.test(currentPath)
    })

    if (!isAuthenticated && !isPublicRoute) {
      navigate("/")
    }

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
    return userRoles.includes(role)
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
            <Link className="hover-link navbar_link" to="/mangas">
              Liste des mangas
            </Link>
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
                Inscription
              </Link>
            )}
          </li>
          <li className="navbar_item slideInDown-6">
            {isAuthenticated ? (
              <Link className="hover-link navbar_link" to="#" onClick={handleLogout}>
                Déconnexion
              </Link>
            ) : (
              <Link className="hover-link navbar_link" to="/users/sign_in">
                Connexion
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
