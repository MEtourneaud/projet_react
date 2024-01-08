import { useEffect, useState } from "react"
import Footer from "../../components/guest/footer/Footer"
import Header from "../../components/guest/header/Header"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [mangas, setMangas] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [selectedRecommendation, setSelectedRecommendation] = useState(null)
  const [topRatedMangas, setTopRatedMangas] = useState(null)

  useEffect(() => {
    ;(async () => {
      const mangasResponse = await fetch(`http://localhost:3000/api/mangas`)
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
      console.log("Mangas with reviews:", mangasResponseData)
      console.log("Reviews:", reviewsResponseData)

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
  }, [])

  const lastThreeMangas = mangas ? mangas.slice(-3) : null

  const manuallySelectedRecommendation = mangas ? mangas.find((manga) => manga.id === 1) : null

  useEffect(() => {
    // Mettez à jour le manga sélectionné manuellement
    setSelectedRecommendation(manuallySelectedRecommendation)
  }, [mangas])

  return (
    <>
      <Header />

      <h2>Les mieux notés</h2>
      {topRatedMangas ? (
        <>
          {topRatedMangas.map((manga) => (
            <article key={manga.id}>
              <h3>{manga.title}</h3>
              <p>Moyenne des notes: {manga.averageRating}</p>
              <Link to={`/mangas/details/${manga.id}`}>
                <img src={manga.imageUrl} alt={manga.title} />
              </Link>
            </article>
          ))}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}

      <h2>Recommandation</h2>
      {selectedRecommendation && (
        <article>
          <Link to={`/mangas/details/${selectedRecommendation.id}`}>
            <img src={selectedRecommendation.imageUrl} alt={selectedRecommendation.title} />
          </Link>
          <h3>{selectedRecommendation.title}</h3>
          <p>{selectedRecommendation.synopsis}</p>
        </article>
      )}

      <h2>Les derniers publiés</h2>
      {lastThreeMangas ? (
        <>
          {lastThreeMangas.map((manga) => {
            return (
              <article key={manga.id}>
                <h3>{manga.title}</h3>
                <Link to={`/mangas/details/${manga.id}`}>
                  <img src={manga.imageUrl} alt={manga.title} />
                </Link>
              </article>
            )
          })}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}

      <Footer />
    </>
  )
}

export default HomePage
