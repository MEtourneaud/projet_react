import "./StarRating.scss"

const StarRating = ({ rating }) => {
  // Fonction pour afficher les étoiles en fonction de la note
  const renderStars = () => {
    const stars = [] // Tableau pour stocker les éléments étoiles
    const fullStars = Math.floor(rating) // Nombre d'étoiles pleines
    const hasHalfStar = rating - fullStars >= 0.5 // Détermine s'il y a une demi-étoile

    // Boucle pour ajouter les étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="full-star">
          ★
        </span>
      )
    }

    // Ajouter une demi-étoile si nécessaire
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="half-star">
          ★
        </span>
      )
    }

    return stars
  }

  return <div className="starRating">{renderStars()}</div>
}

export default StarRating
