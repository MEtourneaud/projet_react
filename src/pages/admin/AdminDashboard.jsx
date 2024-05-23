import HeaderAdmin from "../../components/admin/HeaderAdmin"
import { useVerifyIfUserIsLogged } from "../../utils/security-utils"
import "./AdminDashboard.scss"

const AdminDashboard = () => {
  useVerifyIfUserIsLogged()

  return (
    <>
      <HeaderAdmin />
      <div className="DashboardContainer">
        <h1>Bienvenue sur la page d'administration</h1>
        <img src="/assets/images/logo.png" alt="logo"></img>
      </div>
    </>
  )
}

export default AdminDashboard
