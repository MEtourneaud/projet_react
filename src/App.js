import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import MangasPage from "./pages/guest/mangasPage/MangasPage"
import MangaRandomPage from "./pages/guest/mangaRandomPage/MangaRandomPage"
import MangaDetailsPage from "./pages/guest/mangaDetailsPage/MangaDetailsPage"
import LoginPage from "./pages/guest/loginPage/LoginPage"
import RegisterPage from "./pages/guest/loginPage/RegisterPage"
// import ProfilePage from "./pages/guest/profilePage/ProfilePage"
// import CollectionMangaPage from "./pages/guest/profilePage/CollectionMangaPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminMangasPage from "./pages/admin/adminManga/adminMangasPage/AdminMangasPage"
import AdminMangaCreate from "./pages/admin/adminManga/adminMangaCreate/AdminMangaCreate"
import AdminMangaUpdate from "./pages/admin/AdminMangasUpdate/AdminMangaUpdate"
import AdminUsersPage from "./pages/admin/adminUser/AdminUsersPage"
import HomePage from "./pages/guest/homePage/HomePage"
import ContactPage from "./pages/guest/contactPage/ContactPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes Guest */}
        <Route path="/" element={<HomePage />} />
        <Route path="/mangas" element={<MangasPage />} />
        <Route path="/mangas/details/:mangaId" element={<MangaDetailsPage />} />s
        <Route path="/mangas/random" element={<MangaRandomPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/users/:id" element={<ProfilePage />} />
        <Route path="/users/:id/collection" element={<CollectionMangaPage />} /> */}
        <Route path="/users/sign_up" element={<RegisterPage />} />
        <Route path="/users/sign_in" element={<LoginPage />} />
        {/* Routes Admin */}
        <Route path="/admin/" element={<AdminDashboard />} />
        <Route path="/admin/mangas" element={<AdminMangasPage />} />
        <Route path="/admin/mangas/create" element={<AdminMangaCreate />} />
        <Route path="/admin/mangas/update/:mangaId" element={<AdminMangaUpdate />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
