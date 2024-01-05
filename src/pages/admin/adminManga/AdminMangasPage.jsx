import { useEffect, useState } from "react"
import HeaderAdmin from "../../../components/admin/HeaderAdmin"
import { useVerifyIfUserIsLogged } from "../../../utils/security-utils"
import { jwtDecode } from "jwt-decode"
import { Link } from "react-router-dom"

const AdminMangasPage = () => {
  useVerifyIfUserIsLogged()

  const [mangas, setMangas] = useState(null)
  const token = localStorage.getItem("jwt")
  const decodedToken = jwtDecode(token)

  useEffect(() => {
    ;(async () => {
      const mangasResponse = await fetch("http://localhost:3000/api/mangas")
      const mangasResponseData = await mangasResponse.json()
      setMangas(mangasResponseData)
    })()
  }, [])

  const handleDeleteCoworking = async (event, mangaId) => {
    await fetch(`http://localhost:3000/api/mangas/${mangaId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })

    const mangasResponse = await fetch("http://localhost:3000/api/mangas")
    const mangasResponseData = await mangasResponse.json()
    setMangas(mangasResponseData)
  }

  return (
    <>
      <HeaderAdmin />
      <h2>Liste des mangas</h2>
      {mangas ? (
        <>
          {mangas.map((manga) => {
            return (
              <article>
                <h3>{manga.title}</h3>
                {decodedToken.data.role !== 3 && (
                  <button onClick={(event) => handleDeleteCoworking(event, manga.id)}>
                    Supprimer
                  </button>
                )}
                <Link to={`/admin/mangas/update/${manga.id}`}>
                  <button>Modifier</button>
                </Link>
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

export default AdminMangasPage
