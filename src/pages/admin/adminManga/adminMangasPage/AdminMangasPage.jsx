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
    // Utilisez window.confirm pour obtenir la confirmation de l'utilisateur
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce manga ?")

    if (!confirmed) {
      // L'utilisateur a annulé la suppression
      return
    }

    // L'utilisateur a confirmé la suppression, effectuez la requête DELETE

    try {
      await fetch(`http://localhost:3000/api/mangas/${mangaId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      })

      // Afficher une fenêtre d'alerte pour informer de la suppression réussie
      window.alert("Le manga a bien été supprimé.")
    } catch (error) {
      console.error("Erreur lors de la suppression du manga :", error)
    }

    const mangasResponse = await fetch("http://localhost:3000/api/mangas")
    const mangasResponseData = await mangasResponse.json()
    setMangas(mangasResponseData)
  }

  if (!token) {
    // Gérer le cas où le token est null ou inexistant
    console.error("Token absent ou invalide")
    return
  }

  // console.log("Token :", token)

  return (
    <>
      <HeaderAdmin />
      <div className="admin-container">
        <h2>Liste des mangas</h2>
        {mangas ? (
          <>
            {mangas.map((manga) => {
              return (
                <article key={manga.id}>
                  <h3>{manga.title}</h3>
                  {console.log(decodedToken.roles)}
                  {decodedToken.roles !== 3 && (
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
