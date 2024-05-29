import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useVerifyIfUserIsLogged = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwt")

    if (!token) {
      navigate("/users/sign_in")
    }
  }, [navigate])
}
