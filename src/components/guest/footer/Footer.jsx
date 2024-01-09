import React from "react"
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
      <ul className="ulFooter">
        <li className="liFooter">
          <h2 className="liArchives">Les Archives d'Ohara</h2>
        </li>
        <li className="liTop">
          <img
            className="topButton"
            src="/assets/images/topButton.svg"
            alt="topButton"
            onClick={scrollToTop}
          />
        </li>
      </ul>
    </footer>
  )
}

export default Footer
