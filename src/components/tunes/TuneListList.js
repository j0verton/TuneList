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

    const [panes, setPanes] = useState([])

    useEffect(()=> {
        if(userCollections){
        let tabs = userCollections.map(collection => {
            return { menuItem: collection.name, render: () => <Tab.Pane>{<ListCard tunesArr={collection.tuneCollections} />}</Tab.Pane>}
        })
        console.log("tabs",tabs)
        setPanes(tabs)
    }
    },[userCollections])

    useEffect(()=> {
        getCollectionsByUserId(localStorage.getItem("tunes_user"))
    }, [])
    
    useEffect(() => {
        console.log("collections",collections)
        async function mergeCollection() {
            if (collections){
                return collections.map(collection => {
                    return collection.tuneCollections.map( async cTune =>{
                        // console.log("cTune", cTune)
                        let resTune = await getTuneById(cTune.tuneId)
                        console.log("restUne",resTune)
                        return resTune
                    })
                })
                // console.log("mergedCollection", mergedCollection)
                .then(mergedCollection => {

                    setUserCollections(mergedCollection)
                    console.log("userCollections", userCollections)
                })
            } else {
                console.log("else - empty collections")
            }
        }
        mergeCollection()
        }, [ collections ])

    return panes ? (
        <Tab panes={panes} />
    ) : null
}