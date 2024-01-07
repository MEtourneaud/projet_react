import "./Footer.scss"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="foot">
      <p>Les Archives d'Ohara</p>
      <button className="scrollToTopButton" onClick={scrollToTop}>
        Revenir en haut
      </button>
    </footer>
  )
}

export default Footer
