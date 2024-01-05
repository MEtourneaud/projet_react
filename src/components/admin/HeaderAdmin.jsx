import { Link, useNavigate } from "react-router-dom"

const HeaderAdmin = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    //Je sors le token du local storage
    localStorage.removeItem("jwt")

    //Je redirige l'utilisateur vers la page de connexion
    navigate("/login")
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/mangas">Gestion des mangas</Link>
        </li>
        <li>
          <Link to="/admin/mangas/create">Création d'un manga</Link>
        </li>
        <li>
          <Link to="/admin/users">Gestion des utilisateurs</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Se déconnecter</button>
    </nav>
  )
}

export default HeaderAdmin
