import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { useHistory } from "react-router-dom"
import { Tab } from "semantic-ui-react"
import { CollectionContext } from "../collections/CollectionsProvider"
import { TuneContext } from "./TuneProvider"
import { ListCard } from "./ListCard"

export const TunesList = (props) => {
    const { getTuneById } = useContext(TuneContext)
    const {collections, getCollectionsByUserId} = useContext(CollectionContext)
    const [ userCollections, setUserCollections ] = useState([])
    // const [update, setUpdate] = useState(false)
    const history = useHistory()

    const makeTabs = () => {

    }
    const tabs = userCollections.map(collection => {
        return { menuItem: collection.name, render: () => <Tab.Pane>{ListCard(collection.tuneCollections)}</Tab.Pane>}
    })

    useEffect(() => {
        getCollectionsByUserId(localStorage.getItem("tunes_user"))
        .then(res => {
            console.log("getCollectionsByUserId res", res)
            return res.map(collection => {
                return collection.tuneCollections.map( cTune =>{
                    return getTuneById(cTune.tuneId)
                })
            })
        })
        .then(setUserCollections)
        .then(console.log("userCollections", userCollections))
    }, [ collections ])

    // useEffect(() => {
    //     getTunesByUserId(localStorage.getItem("tunes_user"))
    // },[collections])

    return (
        <Tab panes={tabs} />
    )
}