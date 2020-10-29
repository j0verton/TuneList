import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Button, Divider, Image } from "semantic-ui-react"
import logo from "../../img/TuneListLogo.png"
// import video from "https://res.cloudinary.com/banjo/video/upload/v1604000786/MOV04365_elnyos.mp4"
import "./Login.css"

export const Login = props => {
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("tunes_user", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <>
            <div className="mainContainer">
                <main className="container--login">
                    <dialog className="dialog dialog--auth" ref={existDialog}>
                        <div>User does not exist</div>
                        <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                    </dialog>

                    <section>
                        <form className="form--login" onSubmit={handleLogin}>
                        <Image src={logo} size="medium" alt="TuneList logo, a fiddle over 3 sheets of paper" className="LogoNav" />
                             <Divider />

                            <p className="about">TuneList is an app that fiddle players can use to store and organize their tune list and tune information.</p>

                            <Divider />

                            <h2>Please sign in</h2>
                            <fieldset>
                                <label htmlFor="inputEmail"> Email address </label>
                                <input ref={email} type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Email address"
                                    required autoFocus />
                            </fieldset>
                            <fieldset>
                                <Button primary type="submit">
                                    Sign in
                        </Button>
                            </fieldset>
                        </form>
                    </section>
                    <section className="link--register">
                        <Link to="/register">Not a member yet?</Link>
                    </section>
                </main>

                <video className="videoTag" autoPlay loop muted>
                    <source src={'https://res.cloudinary.com/banjo/video/upload/v1604000786/MOV04365_elnyos.mp4'} type="video/mp4" />
                </video>
            </div>
        </>
    )
}