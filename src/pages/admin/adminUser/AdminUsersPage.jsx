import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import HeaderAdmin from "../../../components/admin/HeaderAdmin"
import "./AdminUsersPage.scss"

const AdminUsersPage = () => {
  const [users, setUsers] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [decodedToken, setDecodedToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwt")

    // Vérifier si le token est valide
    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token)
        setDecodedToken(decoded)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error decoding token:", error)
        navigate("/users/sign_in") // Redirige en cas d'erreur de décodage
      }
    } else {
      console.error("Token is missing or invalid")
      navigate("/users/sign_in") // Redirige si le token est manquant ou invalide
    }
  }, [navigate])

  // Récupérer la liste des utilisateurs
  useEffect(() => {
    if (isAuthenticated) {
      ;(async () => {
        const usersResponse = await fetch("http://localhost:3000/api/users")
        const usersResponseData = await usersResponse.json()
        setUsers(usersResponseData)
      })()
    }
  }, [isAuthenticated])

  const handleDeleteUser = async (event, userId) => {
    const token = localStorage.getItem("jwt")

    if (!token || !isAuthenticated) {
      console.error("Cannot delete user without a valid token")
      return
    }

    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")

    if (!confirmed) {
      return // L'utilisateur a annulé
    }

    try {
      await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      })

      const usersResponse = await fetch("http://localhost:3000/api/users")
      const usersResponseData = await usersResponse.json()
      setUsers(usersResponseData)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error)
    }
  }

  return (
    <>
      <HeaderAdmin />
      <div className="userDelete">
        <h2>Liste des utilisateurs</h2>
        {users ? (
          <>
            {users.map((user) => (
              <article key={user.id}>
                <h3>{user.username}</h3>
                {decodedToken && decodedToken.role !== 3 && (
                  <button onClick={(event) => handleDeleteUser(event, user.id)}>Supprimer</button>
                )}
              </article>
            ))}
          </>
        ) : (
          <p>Pas d'utilisateurs trouvés</p>
        )}
      </div>
    </>
  )
}

export default AdminUsersPage
