import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./MangaRandomPage.scss"

const MangaRandomPage = () => {
  const [randomManga, setRandomMangas] = useState()

  useEffect(() => {
    ;(async () => {
      const randomMangaResponse = await fetch(`http://localhost:3000/api/mangas`)
      const randomMangaResponseData = await randomMangaResponse.json()
      setRandomMangas(randomMangaResponseData)
    })()
  }, [])

  const randomMangaIndex =
    randomManga && randomManga.length > 0
      ? randomManga[Math.floor(Math.random() * randomManga.length)]
      : null

  return (
    <>
      <Header />
      <section className="randomManga">
        <div className="centeredContainer">
          <div className="mangasContainer">
            <h2>Manga choisi au hasard</h2>
            {randomMangaIndex && randomMangaIndex.title && (
              <article className="recommendationArticle">
                <div className="imgRandomBloc">
                  <img
                    className="mangaImg"
                    src={randomMangaIndex.imageUrl}
                    alt={randomMangaIndex.title}
                  />
                </div>
                <div className="textContainer">
                  <h3>{randomMangaIndex.title}</h3>
                  <p>Auteur: {randomMangaIndex.author}</p>
                  <p>Genres: {randomMangaIndex.genre}</p>
                  <p>Nombre de tome: {randomMangaIndex.volumeNumber}</p>
                  <p>Résumé: {randomMangaIndex.synopsis}</p>
                  <div className="randomButton">
                    <Link to="#"> Ajouter au profil</Link>
                    <Link to={`/mangas/details/${randomMangaIndex.id}`}>Donnez votre avis</Link>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default MangaRandomPage
