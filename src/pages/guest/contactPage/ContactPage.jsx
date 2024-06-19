import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./ContactPage.scss"

const ContactPage = () => {
  // Référence pour accéder au formulaire HTML
  const form = useRef()
  // État pour gérer les messages de succès ou d'erreur
  const [message, setMessage] = useState("")

  // Fonction pour envoyer l'email
  const sendEmail = (e) => {
    e.preventDefault() // Empêche le comportement par défaut de soumission du formulaire

    // Récupération des valeurs des champs du formulaire
    const formElements = form.current.elements
    const username = formElements.username.value.trim()
    const email = formElements.email.value.trim()
    const content = formElements.content.value.trim()

    // Vérification si tous les champs sont remplis
    if (!username || !email || !content) {
      setMessage("Tous les champs doivent être remplis.") // Met à jour le message d'état
      return // Stoppe l'exécution de la fonction si les champs ne sont pas remplis
    }

    // Envoi de l'email avec emailjs
    emailjs
      .sendForm("service_vv01ey9", "template_zpejaf3", form.current, {
        publicKey: "8-K5flVJMlC6BQFo6",
      })
      .then(
        () => {
          // Si l'envoi est réussi
          setMessage("Votre message a été envoyé avec succès!")
        },
        (error) => {
          // Si l'envoi échoue
          setMessage(`Échec de l'envoi du message: ${error.text}`)
        }
      )
  }

  return (
    <>
      <Header />
      <div className="formContainer">
        <form className="form" ref={form} onSubmit={sendEmail}>
          <h2>Contact</h2>
          {message && (
            <p className={`message ${message.includes("Échec") ? "error" : ""}`}>{message}</p>
          )}
          <label>
            Nom
            <input
              type="text"
              name="username"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </label>
          <label>
            Adresse e-mail
            <input type="email" name="email" placeholder="Entrez votre adresse e-mail" required />
          </label>
          <label>
            Message
            <textarea type="text" name="content" placeholder="Écrivez votre message" required />
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      </div>
      <Footer />
    </>
  )
}

export default ContactPage
