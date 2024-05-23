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
      setTopRatedMangas(sortedMangas.slice(0, 3))
    })()
    // Ici on place un tableau vide en deuxième paramètre de use effect
    // pour executer la fonction une seule fois au premier chargement du composant
  }, [])

  const lastFourMangas = mangas ? mangas.slice(-3) : null

  return (
    <>
      <Header />
      <main>
        <Carousel />
        <div>
          <h2 className="homeH2">Les derniers publiés</h2>
          <div>
            {lastFourMangas ? (
              <>
                {lastFourMangas.map((manga, index) => {
                  // Déterminer si on utilise le carré à droite ou à gauche
                  const squareClass = index % 2 === 0 ? "square-right" : "square-left"
                  return (
                    <article key={manga.id}>
                      <Link to={`/mangas/details/${manga.id}`}>
                        <div className="imgBloc">
                          <img className="mangaImg" src={manga.imageUrl} alt={manga.title} />
                          <div className={squareClass}>
                            <h3>{manga.title}</h3>
                            {/* Les étoiles sous le titre, dans le même conteneur */}
                            <StarRating className="starRating" rating={manga.averageRating} />
                          </div>
                        </div>
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

        <div>
          <h2 className="homeH2">Les mieux notés</h2>
          <div>
            {topRatedMangas ? (
              topRatedMangas.map((manga, index) => {
                // Utilise modulo pour alterner la position des carrés
                const squareClass = index % 2 === 0 ? "square-right" : "square-left"
                return (
                  <article key={manga.id}>
                    <Link to={`/mangas/details/${manga.id}`}>
                      <div className="imgBloc">
                        <img className="mangaImg" src={manga.imageUrl} alt={manga.title} />
                        <div className={squareClass}>
                          <h3>{manga.title}</h3>
                          <StarRating className="starRating" rating={manga.averageRating} />
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })
            ) : (
              <p>En cours de chargement</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default HomePage
