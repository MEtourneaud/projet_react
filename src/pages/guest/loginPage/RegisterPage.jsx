import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./RegisterPage.scss"

const RegisterPage = () => {
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleRegistration = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const confirmPassword = event.target.confirmPassword.value

    if (password !== confirmPassword) {
      setMessage(`Le mot de passe ne correspond pas.`)
      return
    }

    const registerData = {
      username: username,
      password: password,
      RoleId: 3,
    }

    const registerDataJson = JSON.stringify(registerData)

    const registerResponse = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: registerDataJson,
    })

    if (registerResponse.status === 201) {
      setMessage("Vous vous êtes bien enregistré")
      navigate("/users/sign_in")
    } else {
      setMessage("Erreur lors de l'enregistrement")
    }
  }

  return (
    <>
      <Header />
      <div className="formContainer">
        {message && <p>{message}</p>}
        <form className="form" onSubmit={handleRegistration}>
          <h2>Inscription</h2>
          <label>
            Nom d'utilisateur
            <input type="text" name="username" placeholder="Entrer votre nom d'utilisateur" />
          </label>
          <label>
            Mot de passe
            <input type="password" name="password" placeholder="Entrer votre mot de passe" />
          </label>
          <label>
            Confirmer le mot de passe
            <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" />
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
