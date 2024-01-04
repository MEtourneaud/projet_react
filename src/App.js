import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/guest/HomePage"
import MangasPage from "./pages/guest/MangasPage"
import MangaRandomPage from "./pages/guest/MangaRandomPage"
import MangaDetailsPage from "./pages/guest/MangaDetailsPage"
import LoginPage from "./pages/guest/LoginPage"
import RegisterPage from "./pages/guest/RegisterPage"
import ContactPage from "./pages/guest/ContactPage"
import ProfilePage from "./pages/guest/ProfilePage"
import CollectionMangaPage from "./pages/guest/CollectionMangaPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminMangasPage from "./pages/admin/AdminMangasPage"
import AdminMangaCreate from "./pages/admin/AdminMangaCreate"
import AdminMangaUpdate from "./pages/admin/AdminMangaUpdate"
import AdminMangaDelete from "./pages/admin/AdminMangaDelete"

import "./App.css"

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
        <Route path="/admin/mangas/update" element={<AdminMangaUpdate />} />
        <Route path="/admin/mangas/delete" element={<AdminMangaDelete />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
