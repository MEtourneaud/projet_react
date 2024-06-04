import HeaderAdmin from "../../components/admin/HeaderAdmin"
import { useVerifyIfUserIsLogged } from "../../utils/security-utils"
import "./AdminDashboard.scss"

const AdminDashboard = () => {
  useVerifyIfUserIsLogged()

  return (
    <>
      <HeaderAdmin />
      <div class="image-admin">
        <img src="/assets/images/admin-gorosei.webp" alt="Library" class="darkened-image"></img>
        <div class="text-admin">
          <h1>BIENVENUE</h1>
          <h1>ADMINISTRATEUR</h1>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
