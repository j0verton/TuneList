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

    // async function mergeCollection() {
    //     if (collections){
    //         let mergedCollection = await collections.map(collection => {
    //             return collection.tuneCollections.map( async cTune =>{
    //                 // console.log("cTune", cTune)
    //                 let resTune = await getTuneById(cTune.tuneId)
    //                 console.log("restUne",resTune)
    //                 return resTune
    //             })
    //         })
    //         // console.log("mergedCollection", mergedCollection)
    //         .then(setUserCollections(mergedCollection))
    //         console.log("userCollections", userCollections)
    //     } else {
    //         console.log("else - empty collections")
    //     }
    // }


    useEffect(()=> {
        if(userCollections){
        let tabs = userCollections.map(collection => {
            return { menuItem: collection.name, render: () => <Tab.Pane>{<ListCard tunesArr={collection.tuneCollections} />}</Tab.Pane>}
        })
        console.log("tabs",tabs)
        setPanes(tabs)
    }
    },[userCollections, tunes])

    useEffect(()=> {
        getCollectionsByUserId(localStorage.getItem("tunes_user"))
    }, [])
    
    useEffect(()=> {
        getTunesByUserId(localStorage.getItem("tunes_user"))
        .then(allUserTunes => {
            console.log("allUserTunes",allUserTunes)
            setTunes(allUserTunes)})

    }, []) 

    useEffect(() => {
        if (collections && tunes){
            let mergedCollection = collections.map(collection => {
                collection.tuneCollections = collection.tuneCollections.map(cTune =>{
                    let resTune = tunes.find(tune => tune.id===cTune.tuneId)
                    return resTune
                })
                return collection

            })
            setUserCollections(mergedCollection)
            console.log("mergedCollection", mergedCollection )
            // console.log("userCollections", userCollections)
        }
        }, [ collections ])

    return panes ? (
        <Tab panes={panes} />
    ) : null
}