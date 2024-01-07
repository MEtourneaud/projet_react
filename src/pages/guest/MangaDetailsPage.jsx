import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Footer from "../../components/guest/footer/Footer"
import Header from "../../components/guest/header/Header"

const MangaDetailsPage = () => {
  const { mangaId } = useParams()
  const [manga, setManga] = useState(null)
  const [reviews, setReviews] = useState(null)
  const token = localStorage.getItem("jwt")

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

  useEffect(() => {
    ;(async () => {
      const reviewsReponse = await fetch("http://localhost:3000/api/reviews")
      const reviewsData = await reviewsReponse.json()

      setReviews(reviewsData)
    })()
  }, [])

  // je créé une fonction, qui récupère un  id de manga et qui va créer sur l'api une review
  const handleCreateReview = async (event, mangaId) => {
    event.preventDefault()

    // je récupère les valeurs du formulaire
    const content = event.target.content.value
    const rating = event.target.rating.value

    // je créé un objet avec les valeurs du formulaire
    const reviewToCreate = {
      content: content,
      rating: rating,
      // + l'id du manga passé en parametre
      MangaId: mangaId,
    }
    console.log(reviewToCreate)

    // je transforme en JSON mon objet
    const reviewToCreateJson = JSON.stringify(reviewToCreate)

    // je fais mon appel fetch sur la création d'une review

    try {
      const reviewResponse = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // en passant le token en authorization
          Authorization: "Bearer " + token,
        },
        // et le json avec les données du form (et l'id du manga)
        body: reviewToCreateJson,
      })
      console.log(reviewToCreate)
      //on teste la réponse via un boolen si réponse ou si pas de réponse via le .ok
      if (reviewResponse.ok) {
        //la fonction alert permet de comuniquer un résultat
        alert("Commentaire créé.")

        window.location.reload()
      } else {
        alert("Le commentaire n'as pus être créé. Veuillez réessayer. ")
      }
    } catch (error) {
      alert("Une erreur est survenue. Veullez réessayer")
    }
  }

  return (
    <>
      <Header />
      {manga ? (
        <>
          <article>
            <img src={manga.imageUrl} alt={manga.title}></img>
            <h3>{manga.title}</h3>
            <p>Auteur: {manga.author}</p>
            <p>Genres: {manga.genre}</p>
            <p>Nombre de tome: {manga.volumeNumber}</p>
            <p>Résumé: {manga.synopsis}</p>
          </article>
          {/* <button
            onClick={() => addToProfile(manga)}
            style={{ backgroundColor: "green", color: "white", padding: "10px", cursor: "pointer" }}
          >
            Ajouter au profil
          </button> */}

          <div>
            <p>Donnez vorte avis.</p>
          </div>

          <div className="reviewsBloc">
            {reviews ? (
              <div>
                {reviews

                  .filter((review) => review.MangaId === manga.id)
                  .map((review) => (
                    <article className="reviewContent" key={review.id}>
                      <p className="ratingCom">Note : {review.rating}</p>
                      <p>Utilisateur : {review.User.username}</p>
                      <p>Commentaire : {review.content}</p>
                    </article>
                  ))}
              </div>
            ) : (
              <p>En cours de chargement</p>
            )}
            {/* 
                je créé un form pour chaque manga 
                et au submit j'appelle la fonction handleCreateReview
                en lui passant l'id du manga actuel
                */}

            <form
              className="formContainer"
              onSubmit={(event) => handleCreateReview(event, manga.id)}
            >
              <label className="noteBloc">
                Note
                <input className="note" type="number" name="rating" />
              </label>
              <label className="commentBloc">
                Commentaire
                <textarea className="commentArea" type="text" name="content" />
              </label>

              <input className="submitBtn" type="submit" />
            </form>
          </div>

          {/* <LoginReviews/>  */}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}
      <Footer />
    </>
  )
}

export default MangaDetailsPage
