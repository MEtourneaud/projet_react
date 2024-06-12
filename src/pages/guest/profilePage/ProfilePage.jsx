import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./ProfilePage.scss"

const ProfilePage = () => {
  return (
    <>
      <Header />
      <div className="constructionContainer">
        <img
          className="construction"
          src="/assets/images/under-construction.png"
          alt="Under Construction"
        />
      </div>
      <Footer />
    </>
  )
}

export default ProfilePage
