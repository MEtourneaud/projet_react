import Footer from "../../components/guest/footer/Footer"
import Header from "../../components/guest/header/Header"

const LoginPage = (event) => {
  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    console.log(username, password)

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
    }
  }

  return (
    <>
      <Header />
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
