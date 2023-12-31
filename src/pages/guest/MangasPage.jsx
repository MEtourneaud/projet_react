import { useEffect, useState } from "react"
import Footer from "../../components/guest/footer/Footer"
import Header from "../../components/guest/header/Header"
import { Link } from "react-router-dom"

const MangasPage = () => {
  const [mangas, setMangas] = useState(null)

  useEffect(() => {
    ;(async () => {
      const mangasResponse = await fetch(`http://localhost:3000/api/mangas`)
      const mangasResponseData = await mangasResponse.json()
      setMangas(mangasResponseData)
    })()
  }, [])

  return (
    <>
      <Header />
      <h2>Liste des mangas</h2>
      {mangas ? (
        <>
          {mangas.map((manga) => {
            return (
              <article>
                <h3>{manga.title}</h3>
                <Link to={`/mangas/details/${manga.id}`}>
                  <img src={manga.imageUrl} alt={manga.title}></img>
                </Link>
              </article>
            )
          })}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}
      <Footer />
    </>
  )
}

export default MangasPage
