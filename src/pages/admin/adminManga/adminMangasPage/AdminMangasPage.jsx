import { useEffect, useState } from "react"
import HeaderAdmin from "../../../../components/admin/HeaderAdmin"
import { useVerifyIfUserIsLogged } from "../../../../utils/security-utils"
import { jwtDecode } from "jwt-decode"
import { Link } from "react-router-dom"
import "./AdminMangasPage.scss"

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

  if (!token) {
    // Gérer le cas où le token est null ou inexistant
    console.error("Token absent ou invalide")
    return
  }

  console.log("Token :", token)

  return (
    <>
      <HeaderAdmin />
      <div className="main-container">
        <h2>Liste des mangas</h2>
        {mangas ? (
          <>
            {mangas.map((manga) => {
              return (
                <article key={manga.id}>
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
      </div>
    </>
  )
}

export default AdminMangasPage
