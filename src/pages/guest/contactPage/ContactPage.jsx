import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./ContactPage.scss"

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className="formContainer">
        <form className="form">
          <h2>Contact</h2>
          <label>
            Nom
            <input type="text" name="username" placeholder="Entrer votre nom d'utilisateur" />
          </label>
          <label>
            Adresse e-mail
            <input type="email" name="email" placeholder="Entrer votre adresse e-mail" />
          </label>
          <label>
            Message
            <textarea type="text" name="content" placeholder="Écrivez votre message" />
          </label>
          <input type="submit" />
        </form>
      </div>
      <Footer />
    </>
  )
}

export default ContactPage
