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
            // make a copy of the collections state
            const newCollections = [...collections]
            //makes a new array by .maping out copy of state
            //for each collection we filter out TuneCollections that don't match the id of a tune in the tunes state 
            //which contains only the current user's tunes 
            let UserFilteredTuneCollection = newCollections.map(collection => {
                let filteredTuneCollections =collection.tuneCollections.filter(tuneCollection=> tunes.some(tune=> tune.id===tuneCollection.tuneId))
                //filtered tuneCollections contains only the 
                collection.tuneCollections = filteredTuneCollections
                return collection
                })
            UserFilteredTuneCollection = UserFilteredTuneCollection.flat()
            
            let mergedCollection = UserFilteredTuneCollection.map(collection => {
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