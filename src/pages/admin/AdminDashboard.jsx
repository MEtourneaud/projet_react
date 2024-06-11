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
          <h2>BIENVENUE</h2>
          <h2>ADMINISTRATEUR</h2>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
