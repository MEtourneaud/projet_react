import { useParams } from "react-router-dom"
import { useVerifyIfUserIsLogged } from "../../../utils/security-utils"
import { useEffect, useState } from "react"
import HeaderAdmin from "../../../components/admin/HeaderAdmin"
import "./AdminMangaUpdate.scss"

const AdminMangaUpdate = () => {
  useVerifyIfUserIsLogged()

  const { mangaId } = useParams()
  const [manga, setManga] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const mangaResponse = await fetch(`http://localhost:3000/api/mangas/${mangaId}`)
        const mangaResponseData = await mangaResponse.json()
        setManga(mangaResponseData.data)
      } catch (error) {
        console.error("Erreur lors de la récupération des données du manga :", error)
      }
    })()
    // eslint-disable-next-line
  }, [])

  const handleUpdateManga = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const genre = event.target.genre.value
    const synopsis = event.target.synopsis.value
    const volumeNumber = event.target.volumeNumber.value

    const formData = new FormData()

    formData.append("title", title)
    formData.append("author", author)
    formData.append("genre", genre)
    formData.append("synopsis", synopsis)
    formData.append("volumeNumber", volumeNumber)

    const imageFile = event.target.image.files[0]

    // Ajoutez cette vérification pour n'ajouter l'image que si elle est sélectionnée
    if (imageFile) {
      formData.append("image", imageFile)
    }

    const token = localStorage.getItem("jwt")

    const mangaUpdateResponse = await fetch(`http://localhost:3000/api/mangas/${mangaId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    })

    console.log("Réponse de la mise à jour du manga :", mangaUpdateResponse)

    try {
      const responseData = await mangaUpdateResponse.json()

      if (mangaUpdateResponse.status === 200 || mangaUpdateResponse.status === 201) {
        alert("Mise à jour OK")

        window.location.reload()
      } else {
        console.error("Erreur lors de la mise à jour du manga :", responseData.message)
        alert("Erreur lors de la mise à jour du manga.")
      }
    } catch (error) {
      console.error("Erreur lors de la conversion de la réponse en JSON :", error)
      setMessage("Erreur lors de la mise à jour du manga.")
    }
  }

  return (
    <>
      <HeaderAdmin />
      <section className="adminUpdateManga">
        {message && <p>{message}</p>}
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
