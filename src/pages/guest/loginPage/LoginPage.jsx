import { useState } from "react"
import { useNavigate } from "react-router"
import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./LoginPage.scss"
import { Link } from "react-router-dom"

const LoginPage = (event) => {
  const [message, setMessage] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)
  const navigate = useNavigate()

  // Hook de navigation pour rediriger l'utilisateur après la connexion
  const handleLogin = async (event) => {
    event.preventDefault()

    // Récupérer les valeurs du formulaire
    const username = event.target.username.value
    const password = event.target.password.value

    // Objet avec les données de connexion
    const loginData = {
      username,
      password,
    }

    // Convertir les données en format JSON
    const loginDataJson = JSON.stringify(loginData)

    // Effectuer la requête de connexion
    const loginResponse = await fetch(`http://localhost:3000/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //Je définis le type de contenu de la requête comme étant du JSON
      },
      body: loginDataJson,
    })

    // Récupérer les données de la réponse
    const loginResponseData = await loginResponse.json()

    // Récupérer le jeton d'authentification
    const token = loginResponseData.data

    // Si le jeton est présent, mettre à jour l'état d'authentification et enregistrer le jeton dans le localStorage
    if (token) {
      localStorage.setItem("jwt", token)
      setIsAuthenticated(true) // Mettez à jour l'état d'authentification après la connexion réussie
    }

    // Afficher un message en fonction du statut de la réponse
    if (loginResponse.status === 200) {
      setMessage("Vous êtes bien connecté")
      navigate("/")
    } else {
      setMessage("Erreur lors de la connexion")
    }
  }

  return (
    <section className="loginPage">
      <Header />
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleLogin}>
          <h2>Login</h2>
          <label>
            username
            <input type="text" name="username" />
          </label>
          <label>
            password
            <input type="password" name="password" />
          </label>
          <input type="submit" />
          <div className="centeredContainer">
            <Link className="loginFormLink" to="/users/sign_up">
              Inscris-toi !
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  )
}

export default LoginPage
