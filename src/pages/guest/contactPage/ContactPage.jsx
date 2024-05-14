import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./ContactPage.scss"

const ContactPage = () => {
  return (
    <section className="loginPage">
      <Header />
      <div className="loginContainer">
        <form className="loginForm">
          <h2>Contact</h2>
          <label>
            Nom
            <input type="text" name="username" />
          </label>
          <label>
            Adresse e-mail
            <input type="email" name="email" />
          </label>
          <label>
            Message
            <textarea type="text" name="content" />
          </label>
          <input type="submit" />
        </form>
      </div>
      <Footer />
    </section>
  )
}

export default ContactPage
