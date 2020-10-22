import React from "react"
import { Link } from "react-router-dom"
import { Icon, Image } from "semantic-ui-react"
import logo from "../../img/TuneListLogo.png"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <section className="navbar__container">
            
            <ul className="navbar">
                <li className="navbar__item navbar__logo active">
                    <Link className="navbar__link" to="/">
                       <Image src={logo} floated="left" size="medium" alt="TuneList logo, a fiddle over 3 sheets of paper" className="LogoNav" />
                    </Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/tunes"><Icon name="newspaper" />Tunes</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/friends"><Icon name="address book" />Friends</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/tasks"><Icon name="list alternate" />Message Board</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/messages"><Icon name="comments" />Messages</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/tunes/create"><Icon name="comments" />Add a Tune</Link>
                </li>
                <li className="navbar__item active logout">
                    <Link className="navbar__link" onClick={() => {
                        localStorage.removeItem("tunes_user")
                    }}
                        to="/login"><Icon name="eject" />Logout</Link>
                </li>
            </ul>
        </section>
    )
}
