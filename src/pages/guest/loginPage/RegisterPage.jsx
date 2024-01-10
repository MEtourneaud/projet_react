import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
    <section className="loginPage">
      <Header />
      <div className="loginContainer">
        {message && <p>{message}</p>}
        <form className="loginForm" onSubmit={handleRegistration}>
          <h2>Inscription</h2>
          <label>
            Nom d'utilisateur
            <input type="text" name="username" />
          </label>
          <label>
            Mot de passe
            <input type="password" name="password" />
          </label>
          <label>
            Confirmer le mot de passe
            <input type="password" name="confirmPassword" />
          </label>
          <input type="submit" />
        </form>
      </div>
      <Footer />
    </section>
  )
}

export default RegisterPage
