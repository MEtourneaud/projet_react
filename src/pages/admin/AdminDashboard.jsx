import HeaderAdmin from "../../components/admin/HeaderAdmin"
import "./AdminDashboard.scss"

const AdminDashboard = () => {
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
