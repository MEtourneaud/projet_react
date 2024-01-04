import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Footer from "../../components/guest/footer/Footer"
import Header from "../../components/guest/header/Header"

const MangaDetailsPage = () => {
  const { mangaId } = useParams()
  const [manga, setManga] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaResponse = await fetch(`http://localhost:3000/api/mangas/${mangaId}`)

        if (!mangaResponse.ok) {
          // Si la réponse n'est pas OK, déclencher une erreur
          throw new Error(`La requête a échoué avec le statut ${mangaResponse.status}`)
        }

        const mangaResponseData = await mangaResponse.json()
        setManga(mangaResponseData.data)
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du manga :", error.message)
        // Gérer l'erreur ici (peut-être définir un état d'erreur)
      }
    }

    fetchData()
  }, [mangaId])

  return (
    <>
      <Header />
      {manga ? (
        <article>
          <h3>{manga.title}</h3>
          <img src={manga.imageUrl} alt={manga.title}></img>
        </article>
      ) : (
        <p>En cours de chargement</p>
      )}
      <Footer />
    </>
  )
}

export default MangaDetailsPage
