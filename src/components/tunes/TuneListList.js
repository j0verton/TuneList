import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { useHistory } from "react-router-dom"
import { Tab } from "semantic-ui-react"
import { CollectionContext } from "../collections/CollectionsProvider"
import { TuneContext } from "./TuneProvider"
import { ListCard } from "./ListCard"

export const TunesList = (props) => {
    const { getTunesByUserId } = useContext(TuneContext)
    const {collections, getCollectionsByUserId} = useContext(CollectionContext)
    const [tunes, setTunes]= useState([])
    const [ userCollections, setUserCollections ] = useState([])
    // const [update, setUpdate] = useState(false)
    const history = useHistory()
    
    const [panes, setPanes] = useState([])

    useEffect(()=> {
        if(userCollections){
        let tabs = userCollections.map(collection => {
            return { menuItem: collection.name, render: () => <Tab.Pane>{<ListCard tunesArr={collection.tuneCollections} />}</Tab.Pane>}
        })
        setPanes(tabs)
    }
    },[userCollections, tunes])
    
    useEffect(()=> {
        getTunesByUserId(localStorage.getItem("tunes_user"))
        .then(allUserTunes => {
            console.log("allUserTunes",allUserTunes)
            setTunes(allUserTunes)})
        .then(()=> {
            getCollectionsByUserId(localStorage.getItem("tunes_user"))
        })
        }, [])

    useEffect(() => {
        if (collections.length && tunes.length){
            // debugger
            const newCollections = [...collections]
            const filteredCollections = [...collections]
            console.log(newCollections)
            let UserFilteredTuneCollection = newCollections.map(collection => {

                let filteredTuneCollections =collection.tuneCollections.filter(tuneCollection=> tunes.some(tune=> tune.id===tuneCollection.tuneId))
                console.log(filteredTuneCollections, collection, "filteredCollections")
                debugger
                collection.tuneCollections = filteredTuneCollections
                return collection
                })
            UserFilteredTuneCollection = UserFilteredTuneCollection.flat()
            console.log("userfiltered after flat",UserFilteredTuneCollection)
            let mergedCollection = UserFilteredTuneCollection.map(collection => {
                // debugger
                console.log("collection in merged",UserFilteredTuneCollection,collection)
                collection.tuneCollections = collection.tuneCollections.map(cTune =>{
                    let resTune = tunes.find(tune => tune.id===cTune.tuneId)
                    return resTune
                })
                return collection

            })
            setUserCollections(mergedCollection)
            // console.log("mergedCollection", mergedCollection )
            // console.log("userCollections", userCollections)
        }
        }, [ collections ])

    return panes ? (
        <Tab panes={panes} />
    ) : null
}