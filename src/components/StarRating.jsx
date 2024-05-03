const StarRating = ({ rating, maxStars = 5 }) => {
  const renderStars = () => {
    const stars = []

    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>★</span>) // Afficher uniquement des étoiles pleines
    }

    return stars
  }

  return <div className="starRating">{renderStars()}</div>
}

export default StarRating
