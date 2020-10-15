import React from "react"
import { Route, Router } from "react-router-dom"
import { Home } from "./Home"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
        </>
    )
}