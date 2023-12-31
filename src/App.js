import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import MangasPage from "./pages/guest/MangasPage"
import MangaRandomPage from "./pages/guest/MangaRandomPage"
import MangaDetailsPage from "./pages/guest/MangaDetailsPage"
import LoginPage from "./pages/guest/LoginPage"
import RegisterPage from "./pages/guest/RegisterPage"
import ContactPage from "./pages/guest/ContactPage"
import ProfilePage from "./pages/guest/ProfilePage"
import CollectionMangaPage from "./pages/guest/CollectionMangaPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminMangasPage from "./pages/admin/adminManga/AdminMangasPage"
import AdminMangaCreate from "./pages/admin/adminManga/AdminMangaCreate"
import AdminMangaUpdate from "./pages/admin/adminManga/AdminMangaUpdate"
import AdminUsersPage from "./pages/admin/adminUser/AdminUsersPage"
import HomePage from "./pages/guest/homePage/HomePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes Guest */}
        <Route path="/" element={<HomePage />} />
        <Route path="/mangas" element={<MangasPage />} />
        <Route path="/mangas/details/:mangaId" element={<MangaDetailsPage />} />
        <Route path="/mangas/random" element={<MangaRandomPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/users/:id" element={<ProfilePage />} />
        <Route path="/users/:id/collection" element={<CollectionMangaPage />} />

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
