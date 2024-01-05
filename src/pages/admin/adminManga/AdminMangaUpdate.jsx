import { useParams } from "react-router-dom"
import HeaderAdmin from "../../../components/admin/HeaderAdmin"
import { useVerifyIfUserIsLogged } from "../../../utils/security-utils"
import { useEffect, useState } from "react"

const AdminMangaUpdate = () => {
  useVerifyIfUserIsLogged()

  const { mangaId } = useParams()
  const [manga, setManga] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    ;(async () => {
      const mangaResponse = await fetch(`http://localhost:3000/api/mangas/${mangaId}`)
      const mangaResponseData = await mangaResponse.json()

      setManga(mangaResponseData.data)
    })()
    // eslint-disable-next-line
  }, [])

  const handleUpdateteManga = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const genre = event.target.genre.value
    const synopsis = event.target.synopsis.value
    const volumeNumber = event.target.volumeNumber.value

    const formData = new FormData()

    formData.append("title", title)
    formData.append("authors", author)
    formData.append("genres", genre)
    formData.append("synopsis", synopsis)
    formData.append("volumeNumber", volumeNumber)

    formData.append("image", event.target.image.files[0])

    const token = localStorage.getItem("jwt")

    const mangaUpdateResponse = await fetch(`http://localhost:3000/api/mangas/withImg/${mangaId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    })

    if (mangaUpdateResponse.status === 201) {
      setMessage("Mise à jour OK")
    } else {
      setMessage("Erreur")
    }
  }

  return (
    <>
      <HeaderAdmin />
      {message && <p>{message}</p>}
      {manga && (
        <form onSubmit={handleUpdateteManga}>
          <div>
            <label>
              Titre
              <input type="text" name="title" defaultValue={manga.title} />
            </label>
          </div>
          <div>
            <label>
              Auteur
              <input type="text" name="author" defaultValue={manga.author} />
            </label>
          </div>
          <div>
            <label>
              Synopsis
              <input type="text" name="synopsis" defaultValue={manga.synopsis} />
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
      )}
    </>
  )
}

export default AdminMangaUpdate
