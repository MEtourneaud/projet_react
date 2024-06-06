import React from "react"
import Slider from "react-slick"

// Importez les styles de slick-carousel
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import "./carrousel.scss"

const images = [
  "/assets/images/carrousel/haikyu.jpg",
  "/assets/images/carrousel/gintama.jpg",
  "/assets/images/carrousel/vinlandSaga.jpg",
]

const Carousel = () => {
  // Configuration du carrousel
  const settings = {
    dots: true, // Afficher les points de navigation
    infinite: true, // Faire défiler en boucle
    speed: 500, // Vitesse de défilement (en ms)
    slidesToShow: 1, // Nombre de diapositives affichées à la fois
    slidesToScroll: 1, // Nombre de diapositives défilées à la fois
    autoplay: true, // Activer le défilement automatique
    autoplaySpeed: 3000, // Vitesse du défilement automatique (en ms)
  }

  return (
    <div className="carousel-container">
      {" "}
      {/* Conteneur avec overflow: hidden */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            {" "}
            {/* Chaque diapositive */}
            <img src={image} alt={`Slide ${index}`} className="carousel-image" />
            {/* <div className="button-container">
              <Link className="slide-button left-button">Détails</Link>
              <Link className="slide-button right-button">Ajout au profil</Link>
            </div> */}
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel
