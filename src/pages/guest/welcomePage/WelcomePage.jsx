import { Link } from "react-router-dom"
import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./WelcomePage.scss"

const WelcomePage = () => {
  return (
    <>
      <Header />
      <div class="image-container">
        <img src="/assets/images/OharaLibrary.webp" alt="Library" class="darkened-image"></img>
        <div class="text-overlay">
          <h1>LES ARCHIVES D'OHARA</h1>
          <p>Suivez vos lectures.</p>
          <p>Découvrez de nouvelles œuvres</p>
        </div>
        <button class="library-button left-button1">
          <a href="/users/sign_up">Inscris-toi</a>
        </button>
        <button class="library-button right-button1">
          <a href="/users/sign_in">Se connecter</a>
        </button>
      </div>
      <Footer />
    </>
  )
}

export default WelcomePage
