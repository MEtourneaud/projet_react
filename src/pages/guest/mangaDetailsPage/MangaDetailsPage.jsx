import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import StarRating from "../../../components/StarRating/StarRating"
import "./MangaDetailsPage.scss"

const MangaDetailsPage = () => {
  // Récupère l'ID du manga à partir des paramètres d'URL
  const { mangaId } = useParams()
  const [manga, setManga] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [averageRating, setAverageRating] = useState(0) // Ajout de l'état pour la moyenne des notes
  const [message, setMessage] = useState(null) // État pour gérer les messages
  const token = localStorage.getItem("jwt")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaResponse = await fetch(`http://localhost:3000/api/mangas/${mangaId}`)
        const reviewsResponse = await fetch("http://localhost:3000/api/reviews")

        if (!mangaResponse.ok || !reviewsResponse.ok) {
          throw new Error(`La requête a échoué avec le statut ${mangaResponse.status}`)
        }

        const mangaData = await mangaResponse.json()
        const reviewsData = await reviewsResponse.json()

        setManga(mangaData.data)
        setReviews(reviewsData)

        // Calcul de la moyenne des notes
        const mangaReviews = reviewsData.filter((review) => review.MangaId === mangaData.data.id)
        const totalRating = mangaReviews.reduce((acc, review) => acc + review.rating, 0)
        const averageRating = mangaReviews.length > 0 ? totalRating / mangaReviews.length : 0
        setAverageRating(averageRating)
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du manga :", error.message)
      }
    }

    fetchData()
  }, [mangaId])

  // Fonction pour créer une review
  const handleCreateReview = async (event, mangaId) => {
    event.preventDefault()

    if (!token) {
      setMessage("Vous devez être connecté pour laisser un commentaire.")
      return
    }

    // Récupère les valeurs du formulaire
    const content = event.target.content.value
    const rating = event.target.rating.value

    // Crée un objet avec les valeurs du formulaire
    const reviewToCreate = {
      content: content,
      rating: rating,
      MangaId: mangaId,
    }
    console.log(reviewToCreate)

    // Transforme en JSON l'objet
    const reviewToCreateJson = JSON.stringify(reviewToCreate)

    // Fait un appel fetch pour créer une review
    try {
      const reviewResponse = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: reviewToCreateJson,
      })
      console.log(reviewToCreate)
      if (reviewResponse.ok) {
        setMessage("Commentaire créé.")
        window.location.reload()
      } else {
        setMessage("Le commentaire n'a pas pu être créé. Veuillez réessayer.")
      }
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer. Un avis par utilisateur")
    }
  }

  return (
    <>
      <Header />
      <section>
        {manga ? (
          <div>
            <article className="mangaArticle">
              <div className="coverBloc">
                <img className="coverImg" src={manga.imageUrl} alt={manga.title}></img>
              </div>
              <div className="textBloc">
                <h3>{manga.title}</h3>
                <div className="ratingContainer">
                  <div className="rating">
                    <StarRating rating={averageRating} />
                    <span className="ratingValue">{averageRating.toFixed(1)}</span>
                  </div>
                </div>
                <p>
                  <span>Auteur:</span> {manga.author}
                </p>
                <p>
                  <span>Genres:</span> {manga.genre}
                </p>
                <p>
                  <span>Nombre de tome:</span> {manga.volumeNumber}
                </p>
                <p>
                  <span>Résumé:</span> {manga.synopsis}
                </p>
                <div className="buttonContainer">
                  <Link className="mangaButton" to="#">
                    Ajouter au profil
                  </Link>
                </div>
              </div>
            </article>

            <h3 className="reviewTitle">Donnez votre avis</h3>
            <div>
              {token ? (
                <div className="formComContainer">
                  <form
                    className="formCom"
                    onSubmit={(event) => handleCreateReview(event, manga.id)}
                  >
                    <label>
                      Note
                      <input type="number" name="rating" min="0" max="5" />
                    </label>
                    <label>
                      Commentaire
                      <textarea type="text" name="content" />
                    </label>
                    <input type="submit" />
                  </form>
                </div>
              ) : (
                <>
                  <p>Vous devez être connecté pour laisser un avis.</p>
                  <Link className="hover-link navbar_link" to="/users/sign_in">
                    Connecte-toi !
                  </Link>
                </>
              )}
              {reviews ? (
                <div className="commentContainer">
                  {reviews
                    .filter((review) => review.MangaId === manga.id)
                    .map((review) => (
                      <article className="commentSection" key={review.id}>
                        {message && <p className="message">{message}</p>}
                        <p className="userName">{review.User.username}</p>
                        <div className="rating">
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="comment">{review.content}</p>
                      </article>
                    ))}
                </div>
              ) : (
                <p>En cours de chargement</p>
              )}
            </div>
          </div>
        ) : (
          <p>En cours de chargement</p>
        )}
      </section>

      <Footer />
    </>
  )
}

export default MangaDetailsPage
