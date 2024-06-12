import { useState } from "react"
import { useNavigate } from "react-router"
import { jwtDecode } from "jwt-decode" // Correction de l'importation
// import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import { Link } from "react-router-dom"
import "./LoginPage.scss"

const LoginPage = () => {
  const [message, setMessage] = useState(null) // État pour gérer les messages
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

    try {
      // Effectuer la requête de connexion
      const loginResponse = await fetch(`http://localhost:3000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Je définis le type de contenu de la requête comme étant du JSON
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
        setIsAuthenticated(true)

        // Décoder le token pour obtenir les rôles
        const decodedToken = jwtDecode(token)
        const roles = decodedToken.roles

        // Vérifier les rôles et rediriger en conséquence
        if (roles.includes("admin") || roles.includes("superadmin")) {
          navigate("/admin") // Rediriger vers la section admin
        } else {
          navigate("/home")
        }

        setMessage({ text: "Vous êtes bien connecté", type: "success" })
      } else {
        setMessage({ text: "Erreur lors de la connexion", type: "error" })
      }
    } catch (error) {
      setMessage({ text: `Erreur lors de la connexion: ${error.message}`, type: "error" })
    }
  }

  return (
    <>
      <Header />
      <div className="formContainer">
        <form className="form" onSubmit={handleLogin}>
          <h2>Connexion</h2>
          {message && (
            <p className={`message ${message.type === "error" ? "error" : "success"}`}>
              {message.text}
            </p>
          )}
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
          <input type="submit" />
          <div className="formLink">
            <Link className="hover-link" to="/users/sign_up">
              Inscris-toi !
            </Link>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default LoginPage
