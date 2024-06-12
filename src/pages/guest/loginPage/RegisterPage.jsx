import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "../../../components/guest/header/Header"
import "./RegisterPage.scss"

const RegisterPage = () => {
  const [message, setMessage] = useState(null) // État pour gérer les messages
  const navigate = useNavigate()

  // Fonction appelée lors de la soumission du formulaire d'inscription
  const handleRegistration = async (event) => {
    event.preventDefault() // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    const username = event.target.username.value
    const password = event.target.password.value
    const confirmPassword = event.target.confirmPassword.value

    // Vérifie si les mots de passe correspondent
    if (password !== confirmPassword) {
      setMessage("Le mot de passe ne correspond pas.")
      return
    }

    // Crée l'objet de données d'inscription
    const registerData = {
      username: username,
      password: password,
      RoleId: 3, // Définit le rôle par défaut à 3 (utilisateur)
    }

    const registerDataJson = JSON.stringify(registerData) // Convertit l'objet en JSON

    try {
      // Envoie la requête POST à l'API pour l'enregistrement
      const registerResponse = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: registerDataJson,
      })

      // Vérifier le statut de la réponse
      if (registerResponse.status === 201) {
        setMessage("Vous vous êtes bien enregistré.")
        navigate("/users/sign_in")
      } else {
        const responseData = await registerResponse.json()
        setMessage(`Erreur lors de l'enregistrement : ${responseData.message}`)
      }
    } catch (error) {
      setMessage(`Erreur lors de l'enregistrement : ${error.message}`)
    }
  }

  return (
    <>
      <Header />
      <div className="formContainer">
        <form className="form" onSubmit={handleRegistration}>
          <h2>Inscription</h2>
          {message && <p className="message">{message}</p>}
          <label>
            Nom d'utilisateur
            <input
              type="text"
              name="username"
              placeholder="Entrer votre nom d'utilisateur"
              required
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              name="password"
              placeholder="Entrer votre mot de passe"
              required
            />
          </label>
          <label>
            Confirmer le mot de passe
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              required
            />
          </label>
          <input type="submit" />
          <div className="formLink">
            <Link className="hover-link" to="/users/sign_in">
              Se connecter !
            </Link>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default RegisterPage
