import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import StarRating from "../../../components/StarRating"
import Carousel from "../../../components/guest/carrousel/carrousel"
import "./HomePage.scss"

const HomePage = () => {
  // useState permet de stocker dans une variable et donner par défaut la valeur "null" et l'utilisera au premier chargement du composant
  // Aux chargements suivants, il prendra la valeur stocké dans le composant
  const [mangas, setMangas] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [selectedRecommendation, setSelectedRecommendation] = useState(null)
  const [topRatedMangas, setTopRatedMangas] = useState(null)

  // useEffect permet d'exécuter du code uniquement à certains chargements du composant
  useEffect(() => {
    // Fonction anonyme qui s'auto-invoque (plus moderne)
    // Cela permet d'effectuer des opérations asynchrones (fetch) sans devoir créer une fonction asynchrone (qu'on devrait appeler avec un await)
    ;(async () => {
      // Le premier "await" permet d'attendre jusqu'à avoir récupéré les données de l'API
      const mangasResponse = await fetch(`http://localhost:3000/api/mangas`)
      // Une fois les données récupérées, le second "await" permet d'afficher ces données json en js
      const mangasResponseData = await mangasResponse.json()
      console.log("Mangas with reviews:", mangasResponseData)
      setMangas(mangasResponseData)

      // Fetch des reviews
      const reviewsResponse = await fetch(`http://localhost:3000/api/reviews`)
      const reviewsResponseData = await reviewsResponse.json()
      console.log("Reviews:", reviewsResponseData)
      setReviews(reviewsResponseData)

      // Ajout de la propriété 'averageRating' et 'reviews' à chaque manga
      // Ajoutez ces logs pour mieux comprendre la structure des données et les notes des reviews
      // console.log("Mangas with reviews:", mangasResponseData)
      // console.log("Reviews:", reviewsResponseData)

      const mangasWithAverageRatingAndReviews = mangasResponseData.map((manga) => {
        const mangaReviews = reviewsResponseData.filter((review) => review.MangaId === manga.id)

        const totalRating = mangaReviews.reduce((acc, review) => acc + review.rating, 0)
        const averageRating = mangaReviews.length > 0 ? totalRating / mangaReviews.length : 0

        return { ...manga, averageRating, reviews: mangaReviews }
      })

      setMangas(mangasWithAverageRatingAndReviews)

      // Tri des mangas par moyenne des notes
      const sortedMangas = mangasWithAverageRatingAndReviews.sort(
        (a, b) => b.averageRating - a.averageRating
      )

      // Sélection des trois mieux notés
      setTopRatedMangas(sortedMangas.slice(0, 4))
    })()
    // Ici on place un tableau vide en deuxième paramètre de use effect
    // pour executer la fonction une seule fois au premier chargement du composant
  }, [])

  const lastFourMangas = mangas ? mangas.slice(-4) : null

  const manuallySelectedRecommendation = mangas ? mangas.find((manga) => manga.id === 1) : null

  useEffect(() => {
    // Mettez à jour le manga sélectionné manuellement
    setSelectedRecommendation(manuallySelectedRecommendation)
  }, [mangas])

  return (
    <>
      <Header />
      <main>
        <Carousel />
        <div className="centeredContainer">
          <div className="mangasContainer">
            <h2>Les mieux notés</h2>
            <div className="mangasList">
              {topRatedMangas ? (
                topRatedMangas.map((manga) => (
                  <article key={manga.id}>
                    <Link to={`/mangas/details/${manga.id}`}>
                      <div className="imgBloc">
                        <img className="mangaImg" src={manga.imageUrl} alt={manga.title} />
                      </div>
                      <h3>{manga.title}</h3>
                    </Link>
                    <StarRating className="starRating " rating={manga.averageRating} />
                  </article>
                ))
              ) : (
                <p>En cours de chargement</p>
              )}
            </div>
          </div>
        </div>

        <div className="centeredContainer">
          <div className="mangasContainer">
            <h2>Recommandation</h2>
            {selectedRecommendation && (
              <article className="recommendationArticle">
                <div className="imgBloc">
                  <Link to={`/mangas/details/${selectedRecommendation.id}`}>
                    <img
                      className="mangaImg"
                      src={selectedRecommendation.imageUrl}
                      alt={selectedRecommendation.title}
                    />
                  </Link>
                </div>
                <div className="textContainer">
                  <Link to={`/mangas/details/${selectedRecommendation.id}`}>
                    <h3>{selectedRecommendation.title}</h3>
                  </Link>
                  <StarRating rating={selectedRecommendation.averageRating} />
                  <p>Auteur: {selectedRecommendation.author}</p>
                  <p>Genres: {selectedRecommendation.genre}</p>
                  <p>Nombre de volumes: {selectedRecommendation.volumeNumber}</p>
                  <p>Synopsis: {selectedRecommendation.synopsis}</p>
                  {console.log("Synopsis:", selectedRecommendation.synopsis)}
                </div>
              </article>
            )}
          </div>
        </div>

        <div className="centeredContainer">
          <div className="mangasContainer">
            <h2>Les derniers publiés</h2>
            <div className="mangasList">
              {lastFourMangas ? (
                <>
                  {lastFourMangas.map((manga) => {
                    return (
                      <article key={manga.id}>
                        <Link to={`/mangas/details/${manga.id}`}>
                          <div className="imgBloc">
                            <img className="mangaImg" src={manga.imageUrl} alt={manga.title} />
                          </div>
                          <h3>{manga.title}</h3>
                        </Link>
                      </article>
                    )
                  })}
                </>
              ) : (
                <p>En cours de chargement</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default HomePage
