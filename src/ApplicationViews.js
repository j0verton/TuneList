import React from "react"
import { Route } from "react-router-dom"
import { TuneForm } from "./components/tunes/TuneForm"
import { TuneProvider } from "./components/tunes/TuneProvider"
import { Home } from "./Home"
import { ListCard } from "./components/tunes/ListCard"
import { TunesList } from "./components/tunes/TuneListList"
import { CollectionProvider } from "./components/collections/CollectionsProvider"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <TuneProvider>
                <Route exact path="/tunes/create">
                    <TuneForm />
                </Route>
            </TuneProvider>

            <TuneProvider>
                <Route exact path="/tunes/edit/:tuneId(\d)">
                    <TuneForm />
                </Route>
            </TuneProvider>
        
            <TuneProvider>
                <CollectionProvider>
                    <Route exact path="/tunes">
                        <TunesList />
                    </Route>
                </CollectionProvider>
            </TuneProvider>
        </>
    )
}
