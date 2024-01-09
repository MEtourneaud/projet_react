const StarRating = ({ rating }) => {
  const maxStars = 5

  const renderStars = () => {
    const stars = []

    for (let i = 0; i < maxStars; i++) {
      const isFilled = i < rating
      stars.push(<span key={i}>{isFilled ? "★" : "☆"}</span>)
    }

    return stars
  }

  return <div className="starRating">{renderStars()}</div>
}

export default StarRating
