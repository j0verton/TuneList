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
import { TuningProvider } from "./components/tunings/TuningsProvider"
import { PhotoProvider } from "./components/photo/PhotoProvider"

export const ApplicationViews = (props) => {
    return (
        <>
        <CollectionProvider>
            <TuneProvider>
                <UserProvider>
                    <TuningProvider>
                    <PhotoProvider>
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route exact path="/tunes/create">
                            <TuneForm />
                        </Route>

                        <Route exact path="/tunes/edit/:tuneId">
                            <TuneForm />
                        </Route>

                            <Route exact path="/tunes">
                                <TunesList />
                            </Route>

                            <Route exact path="/users">
                                <UserList />
                            </Route>
                            </PhotoProvider>
                        </TuningProvider>
                    </UserProvider>
                </TuneProvider>
            </CollectionProvider>
        </>
    )
}
