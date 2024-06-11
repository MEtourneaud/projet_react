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

  // Sélectionne un index aléatoire pour obtenir un manga aléatoire
  const randomMangaIndex =
    randomManga && randomManga.length > 0
      ? randomManga[Math.floor(Math.random() * randomManga.length)]
      : null

  function refreshPage() {
    window.location.reload()
  }

  return (
    <>
      <Header />
      <h2 className="randomPage">Manga choisi au hasard</h2>
      {randomMangaIndex && randomMangaIndex.title && (
        <article className="mangaArticle">
          <div className="coverBloc">
            <img
              className="mangaImg"
              src={randomMangaIndex.imageUrl}
              alt={randomMangaIndex.title}
            />
          </div>
          <div className="textBloc">
            <h3>{randomMangaIndex.title}</h3>
            <div className="buttonContainer">
              <Link className="mangaButton" onClick={refreshPage} to="/mangas/random">
                Encore une fois !
              </Link>
            </div>
            <p>
              <span>Auteur:</span> {randomMangaIndex.author}
            </p>
            <p>
              <span>Genres:</span> {randomMangaIndex.genre}
            </p>
            <p>
              <span>Nombre de tome:</span> {randomMangaIndex.volumeNumber}
            </p>
            <p>
              <span>Résumé:</span> {randomMangaIndex.synopsis}
            </p>
            <div className="buttonContainer">
              <Link className="mangaButton" to="/users/:id">
                {" "}
                Ajouter au profil
              </Link>
              <Link className="mangaButton" to={`/mangas/details/${randomMangaIndex.id}`}>
                Donnez votre avis
              </Link>
            </div>
          </div>
        </article>
      )}

      <Footer />
    </>
  )
}

export default MangaRandomPage
