import { useState } from "react"
import HeaderAdmin from "../../../../components/admin/HeaderAdmin"
import { useVerifyIfUserIsLogged } from "../../../../utils/security-utils"

const AdminMangaCreate = () => {
  useVerifyIfUserIsLogged()

  const [message, setMessage] = useState(null)

  const handleCreateManga = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const genre = event.target.genre.value
    const synopsis = event.target.synopsis.value
    const volumeNumber = event.target.volumeNumber.value

    // const mangaToCreateJson = JSON.stringify(mangaToCreate);

    // je créé un objet "FormData" => ça me permet d'envoyer
    // à mon api à la fois des infos JSON (text, number etc)
    // et des fichiers
    const formData = new FormData()

    // dans mon formdata, je créé un champs name, qui contient
    // le nom issu du champs "name", transformé en json
    formData.append("title", title)
    formData.append("author", author)
    formData.append("genre", genre)
    formData.append("synopsis", synopsis)
    formData.append("volumeNumber", volumeNumber)

    // dans mon formData, je créé un champs file, qui contient
    // le fichier issu du champs image
    formData.append("image", event.target.image.files[0])

    const token = localStorage.getItem("jwt")

    const createMangaResponse = await fetch("http://localhost:3000/api/mangas/withImg", {
      method: "POST",
      headers: {
        // vu que j'envoie un formData (car j'ai des fichiers)
        // le contenu du body n'est plus du JSON pur
        // donc je commente la ligne
        // "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // j'envoie mon formData en body
      body: formData,
    })
    console.log(createMangaResponse)

    try {
      const responseData = await createMangaResponse.json()

      if (createMangaResponse.ok) {
        setMessage("Manga créé !")
      } else {
        console.error("Error response from server:", responseData)
        setMessage("Erreur !")
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error)
      setMessage("Erreur lors de la communication avec le serveur.")
    }
  }

  return (
    <section className="adminManga">
      <HeaderAdmin />
      {message && <p>{message}</p>}
      <div className="adminContainer">
        <form className="adminForm" onSubmit={handleCreateManga}>
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
              <textarea type="text" name="synopsis" />
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
      </div>
    </section>
  )
}

export default AdminMangaCreate
