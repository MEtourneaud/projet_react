import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"
import "./MangasPage.scss"

const MangasPage = () => {
  const [mangas, setMangas] = useState(null)

  useEffect(() => {
    ;(async () => {
      const mangasResponse = await fetch(`http://localhost:3000/api/mangas`)
      const mangasResponseData = await mangasResponse.json()

      const sortedMangas = mangasResponseData.sort((a, b) => a.title.localeCompare(b.title))

      setMangas(sortedMangas)
    })()
  }, [])

  return (
    <>
      <Header />
      <section className="mangaList">
        <div className="centeredContainer">
          <div className="mangasContainer">
            <h2>Liste des mangas</h2>
            <div className="mangasList">
              {mangas ? (
                <>
                  {mangas.map((manga) => {
                    return (
                      <article>
                        <Link to={`/mangas/details/${manga.id}`}>
                          <div className="listBloc">
                            <img className="listImg" src={manga.imageUrl} alt={manga.title}></img>
                          </div>
                          <h3>{manga.title}</h3>
                        </Link>
                      </article>
                    )
                  })}
                </>
              ) : (
                <p>En cours de chargement</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default MangasPage
