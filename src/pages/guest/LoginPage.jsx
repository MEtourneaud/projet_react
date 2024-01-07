import { useState } from "react"
import Footer from "../../components/guest/footer/Footer"
import Header from "../../components/guest/header/Header"
import { useNavigate } from "react-router"

const LoginPage = (event) => {
  // eslint-disable-next-line
  const [message, setMessage] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt") !== null)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    // console.log(username, password)

    const loginData = {
      username,
      password,
    }

    const loginDataJson = JSON.stringify(loginData)

    const loginResponse = await fetch(`http://localhost:3000/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //Je définis le type de contenu de la requête comme étant du JSON
      },
      body: loginDataJson,
    })

    const loginResponseData = await loginResponse.json()

    const token = loginResponseData.data

    if (token) {
      localStorage.setItem("jwt", token)
      setIsAuthenticated(true) // Mettez à jour l'état d'authentification après la connexion réussie
    }

    if (loginResponse.status === 200) {
      setMessage("Vous êtes bien connecté")
      navigate("/")
    } else {
      setMessage("Erreur lors de l'enregistrement")
    }
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <section>
        <form onSubmit={handleLogin}>
          <label>
            username
            <input type="text" name="username" />
          </label>
          <label>
            password
            <input type="password" name="password" />
          </label>
          <input type="submit" />
        </form>
      </section>
      <Footer />
    </>
  )
}

export default LoginPage
