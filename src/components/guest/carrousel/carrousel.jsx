import React from "react"
import Slider from "react-slick"
import { Link } from "react-router-dom"

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000, // Changer la vitesse d'autoplay
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
            {/* Ajout des boutons en bas et au centre */}
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
