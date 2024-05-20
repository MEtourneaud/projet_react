import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../../../components/guest/footer/Footer"
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
      <section className="registerPage">
        <div className="registerContainer">
          {message && <p>{message}</p>}
          <form className="registerForm" onSubmit={handleRegistration}>
            <h2>Inscription</h2>
            <label>
              Nom d'utilisateur
              <input type="text" name="username" placeholder="Nom d'utilisateur" />
            </label>
            <label>
              Mot de passe
              <input type="password" name="password" placeholder="Mot de passe" />
            </label>
            <label>
              Confirmer le mot de passe
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
              />
            </label>
            <input type="submit" />
            <div className="centeredContainer">
              <Link className="loginFormLink" to="/users/sign_in">
                Se connecter !
              </Link>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default RegisterPage
