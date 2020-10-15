import React from "react"
import { Route, Router } from "react-router-dom"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
        </>
    )
}