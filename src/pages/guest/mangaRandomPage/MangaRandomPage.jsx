import { useEffect, useState } from "react"
import Footer from "../../../components/guest/footer/Footer"
import Header from "../../../components/guest/header/Header"

const MangaRandomPage = () => {
  const [randomManga, setRandomMangas] = useState()

  useEffect(() => {
    ;(async () => {
      const randomMangaResponse = await fetch(`http://localhost:3000/api/mangas`)
      const randomMangaResponseData = await randomMangaResponse.json()
      setRandomMangas(randomMangaResponseData)
    })()
  }, [])

  const randomMangaIndex =
    randomManga && randomManga.length > 0
      ? randomManga[Math.floor(Math.random() * randomManga.length)]
      : null

  return (
    <>
      <Header />
      <h2>Manga choisi au hasard</h2>
      <article>
        {randomMangaIndex && randomMangaIndex.title && (
          <>
            <h3>{randomMangaIndex.title}</h3>
            <img src={randomMangaIndex.imageUrl} alt={randomMangaIndex.title} />
          </>
        )}
      </article>
      <Footer />
    </>
  )
}

export default MangaRandomPage
