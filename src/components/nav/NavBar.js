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
                        {/* <Header as="h2">Tune List</Header> */}
                       <Image src={logo} floated="left" size="medium" alt="TuneList logo, a fiddle over 3 sheets of paper" className="LogoNav" />
                    </Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/tunes"><Icon name="newspaper" /><p className="nav__text">Tunes</p></Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/users"><Icon name="address book" /><p className="nav__text">Users</p></Link>
                </li>
                {/* <li className="navbar__item active">
                    <Link className="navbar__link" to="/messages"><Icon name="list alternate" /><p className="nav__text">Message Board</p></Link>
                </li> */}
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/tunes/create"><Icon name="add square" /><p className="nav__text">Add a Tune</p></Link>
                </li>
                <li className="navbar__item active logout">
                    <Link className="navbar__link" onClick={() => {
                        localStorage.removeItem("tunes_user")
                    }}
                        to="/login"><Icon name="eject" /><p className="nav__text">Logout</p></Link>
                </li>
            </ul>
        </section>
    )
}
