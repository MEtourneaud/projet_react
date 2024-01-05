import { useParams } from "react-router-dom"
import HeaderAdmin from "../../components/admin/HeaderAdmin"
import { useVerifyIfUserIsLogged } from "../../utils/security-utils"
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

    const mangaUpdateData = {
      title: title,
      author: author,
      genre: genre,
      synopsis: synopsis,
      volumeNumber: volumeNumber,
    }

    const mangaUpdateDataJson = JSON.stringify(mangaUpdateData)

    const token = localStorage.getItem("jwt")

    const mangaUpdateResponse = await fetch(`http://localhost:3000/api/mangas/${mangaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: mangaUpdateDataJson,
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
              <input type="text" name="title" />
            </label>
          </div>
          <div>
            <label>
              Auteur
              <input type="text" name="author" />
            </label>
          </div>
          <div>
            <label>
              Synopsis
              <input type="text" name="synopsis" />
            </label>
          </div>
          <div>
            <label>
              Genres
              <input type="text" name="genre" />
            </label>
          </div>
          <div>
            <label>
              Nombre de volumes
              <input type="number" name="volumeNumber" />
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
