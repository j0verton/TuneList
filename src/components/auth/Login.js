import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Button, Divider } from "semantic-ui-react"
// import logo from "../../img/logo_words.png"
// import video from "../../video/video.mp4"
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
                            {/* <img src={logo} alt="tune list logo" className="logo" /> */}
                            <h1>TuneList</h1>

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

                {/* <video className="videoTag" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video> */}
            </div>
        </>
    )
}