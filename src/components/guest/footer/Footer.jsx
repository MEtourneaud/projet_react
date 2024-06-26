import React from "react"
import "./Footer.scss"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="foot">
      <div className="logoContainer">
        <img className="logoFooter" src="/assets/images/logo.png" alt="logo to top" />
      </div>
      <div>
        <ul className="ulFooter">
          <li className="liCgu">
            <Link className="hover-foot" to="/cgu">
              CGU
            </Link>
          </li>
          <li className="liFooter">
            <Link to="https://twitter.com">
              <img
                className="logoSocialMedia"
                src="/assets/images/socialMedia/twitter.png"
                alt="logo twitter"
              />
            </Link>
          </li>
          <li className="liFooter">
            <Link to="https://www.facebook.com/">
              <img
                className="logoSocialMedia"
                src="/assets/images/socialMedia/facebook.png"
                alt="logo facebook"
              />
            </Link>
          </li>
          <li className="liFooter">
            <Link to="https://www.instagram.com/">
              <img
                className="logoSocialMedia"
                src="/assets/images/socialMedia/instagram.png"
                alt="logo instagram"
              />
            </Link>
          </li>
          <li className="liFooter liYoutube">
            <Link to="https://www.youtube.com">
              <img
                className="logoSocialMedia"
                src="/assets/images/socialMedia/youtube.png"
                alt="logo youtube"
              />
            </Link>
          </li>
          <li className="liFooter">
            <Link className="hover-foot" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <h2 className="copyright">&copy;Les Archives d'Ohara</h2>
    </footer>
  )
}

export default Footer
