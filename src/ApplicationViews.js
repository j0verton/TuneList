import React from "react"
import { Route } from "react-router-dom"
import { TuneForm } from "./components/tunes/TuneForm"
import { TuneProvider } from "./components/tunes/TuneProvider"
import { Home } from "./Home"
import { ListCard } from "./components/tunes/ListCard"
import { TunesList } from "./components/tunes/TuneListList"
import { CollectionProvider } from "./components/collections/CollectionsProvider"
import { UserProvider } from "./components/user/UserProvider"
import { UserList } from "./components/user/UserList"

export const ApplicationViews = (props) => {
    return (
        <>
        <TuneProvider>
            <Route exact path="/">
                <Home />
            </Route>
        </TuneProvider>

            <TuneProvider>
                <Route exact path="/tunes/create">
                    <TuneForm />
                </Route>
            </TuneProvider>

            <TuneProvider>
                <Route exact path="/tunes/edit/:tuneId">
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

            <UserProvider>
                <TuneProvider>
                    <Route exact path="/users">
                        <UserList />
                    </Route>
                </TuneProvider>
            </UserProvider>
        </>
    )
}
