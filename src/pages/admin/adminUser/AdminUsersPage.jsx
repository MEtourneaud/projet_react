import { useEffect, useState } from "react"
import { useVerifyIfUserIsLogged } from "../../../utils/security-utils"
import { jwtDecode } from "jwt-decode"
import HeaderAdmin from "../../../components/admin/HeaderAdmin"
import "./AdminUsersPage.scss"

const AdminUsersPage = () => {
  useVerifyIfUserIsLogged()

  const [users, setUsers] = useState(null)
  const token = localStorage.getItem("jwt")
  // const decodedToken = jwtDecode(token)

  // Vérifier si le token existe avant de le décoder
  let decodedToken = null
  if (token) {
    try {
      decodedToken = jwtDecode(token)
      console.log("Token décodé:", decodedToken) // Afficher le contenu du token
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error)
      decodedToken = null // Assurez-vous que cette variable ne reste pas indéfinie
    }
  } else {
    console.error("Token non trouvé")
  }

  useEffect(() => {
    ;(async () => {
      const usersResponse = await fetch("http://localhost:3000/api/users")
      const usersResponseData = await usersResponse.json()
      setUsers(usersResponseData)
    })()
  }, [])

  const handleDeleteUser = async (event, userId) => {
    await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })

    const usersResponse = await fetch("http://localhost:3000/api/users")
    const usersResponseData = await usersResponse.json()
    setUsers(usersResponseData)
  }

  return (
    <>
      <HeaderAdmin />
      <div className="userDelete">
        <h2>Liste des users</h2>
        {users ? (
          <>
            {users.map((user) => {
              return (
                <article>
                  <h3>{user.username}</h3>
                  {decodedToken.role !== 3 && (
                    <button onClick={(event) => handleDeleteUser(event, user.id)}>Supprimer</button>
                  )}
                </article>
              )
            })}
          </>
        ) : (
          <p>Mangas en préparation</p>
        )}
      </div>
    </>
  )
}

export default AdminUsersPage
