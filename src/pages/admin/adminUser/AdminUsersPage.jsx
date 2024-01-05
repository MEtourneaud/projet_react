import { useEffect, useState } from "react"
import HeaderAdmin from "../../../components/admin/HeaderAdmin"
import { useVerifyIfUserIsLogged } from "../../../utils/security-utils"
import { jwtDecode } from "jwt-decode"

const AdminUsersPage = () => {
  useVerifyIfUserIsLogged()

  const [users, setUsers] = useState(null)
  const token = localStorage.getItem("jwt")
  const decodedToken = jwtDecode(token)

  useEffect(() => {
    ;(async () => {
      const usersResponse = await fetch("http://localhost:3000/api/users")
      const usersResponseData = await usersResponse.json()
      setUsers(usersResponseData)
    })()
  }, [])

  const handleDeleteCoworking = async (event, userId) => {
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
      <h2>Liste des users</h2>
      {users ? (
        <>
          {users.map((user) => {
            return (
              <article>
                <h3>{user.username}</h3>
                {decodedToken.data.role !== 3 && (
                  <button onClick={(event) => handleDeleteCoworking(event, user.id)}>
                    Supprimer
                  </button>
                )}
              </article>
            )
          })}
        </>
      ) : (
        <p>Mangas en préparation</p>
      )}
    </>
  )
}

export default AdminUsersPage
