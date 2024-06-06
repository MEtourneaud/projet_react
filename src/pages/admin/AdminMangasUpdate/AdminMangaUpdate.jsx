import { useParams } from "react-router-dom"
import { useVerifyIfUserIsLogged } from "../../../utils/security-utils"
import { useEffect, useState } from "react"
import HeaderAdmin from "../../../components/admin/HeaderAdmin"
import "./AdminMangaUpdate.scss"

const AdminMangaUpdate = () => {
  useVerifyIfUserIsLogged()

  const { mangaId } = useParams()
  const [manga, setManga] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const mangaResponse = await fetch(`http://localhost:3000/api/mangas/${mangaId}`)
        if (!mangaResponse.ok) {
          throw new Error(`Erreur ${mangaResponse.status}: ${mangaResponse.statusText}`)
        }
        const mangaResponseData = await mangaResponse.json()
        setManga(mangaResponseData.data)
      } catch (error) {
        console.error("Erreur lors de la récupération des données du manga :", error.message)
        alert(`Erreur lors de la récupération des données du manga : ${error.message}`)
      }
    })()
    // eslint-disable-next-line
  }, [])

  const handleUpdateManga = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    try {
      const response = await fetch(`http://localhost:3000/api/mangas/${mangaId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      alert("Mise à jour réussie")
      window.location.reload()
    } catch (error) {
      console.error("Erreur lors de la mise à jour du manga :", error.message)
      alert(`Erreur lors de la mise à jour du manga : ${error.message}`)
    }
  }

  return (
    <>
      <HeaderAdmin />
      <section className="adminUpdateManga">
        {manga && (
          <div className="formContainer">
            <form className="form" onSubmit={handleUpdateManga}>
              <div>
                <label>
                  Titre
                  <textarea type="text" name="title" defaultValue={manga.title} />
                </label>
              </div>
              <div>
                <label>
                  Auteur
                  <input type="text" name="author" defaultValue={manga.author} />
                  {console.log(manga.author)}
                </label>
              </div>
              <div>
                <label>
                  Synopsis
                  <textarea type="text" name="synopsis" defaultValue={manga.synopsis} />
                </label>
              </div>
              <div>
                <label>
                  Genres
                  <input type="text" name="genre" defaultValue={manga.genre} />
                </label>
              </div>
              <div>
                <label>
                  Nombre de volumes
                  <input type="number" name="volumeNumber" defaultValue={manga.volumeNumber} />
                </label>
              </div>

              <div>
                <label>
                  Image
                  <input type="file" name="image" />
                </label>
              </div>

              <input type="submit" />
            </form>
          </div>
        )}
      </section>
    </>
  )
}

export default AdminMangaUpdate
