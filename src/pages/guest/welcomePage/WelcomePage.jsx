import { Link } from "react-router-dom"
import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./WelcomePage.scss"

const WelcomePage = () => {
  return (
    <>
      <Header />
      <h1>LES ARCHIVES D'OHARA</h1>
      <p>Suivez vos lectures.</p>
      <p>Découvrez de nouvelles œuvres</p>
      <div>
        <button className="slide-button left-button">
          <Link to="/users/sign_up">Inscris-toi</Link>
        </button>
        <button className="slide-button right-button">
          <Link to="/users/sign_in">Se connecter</Link>
        </button>
      </div>
      <Footer />
    </>
  )
}

export default WelcomePage
