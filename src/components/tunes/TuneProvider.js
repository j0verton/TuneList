import React, { useState, createContext, useContext } from "react"
import { CollectionContext } from "../collections/CollectionsProvider"

export const TuneContext = createContext()

export const TuneProvider = props => {
    const [tunes, setTunes] = useState([])
    const [tune, setTune] = useState({})
    const { collections, getCollectionsByUserId, saveCollection } = useContext(CollectionContext)

    
    // adds new Tunes to database
    const saveTune  = tuneObj => {
        let tuneCollectionsObj = { tuneId: tuneObj.id }
        getCollectionsByUserId(localStorage.getItem("tunes_user"))
        .then(res => {
            console.log("res", collections)
            return collections.map(collections.name)})
        .then(response=>{        
            if (tuneObj.tuning === "Standard" && !response.includes(tuneObj.key)) {
                saveCollection(tuneObj.tuning, tuneObj.key)
                    .then(()=> getCollectionsByUserId(localStorage.getItem("tunes_user")))
                    .then(collections => collections.find(collection=> collection.name === `${tuneObj.key}/${tuneObj.tuning}`))
                    .then(res=>{
                        tuneCollectionsObj.collectionId = res.id
                    })
                    .then(() => {
                        return fetch('http://localhost:8088/tunes', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(tuneObj)
                        })
                    })
            } else if (!response.includes(`${tuneObj.key}/${tuneObj.tuning}`))  {
                saveCollection(tuneObj.tuning, tuneObj.key)
                .then(()=> getCollectionsByUserId(localStorage.getItem("tunes_user")))
                .then(collections => collections.find(collection=> collection.name === `${tuneObj.key}/${tuneObj.tuning}`))
                .then(res=>{
                    tuneCollectionsObj.collectionId = res.id
                })    
                .then(() => {
                        return fetch('http://localhost:8088/tunes', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(tuneObj)
                        })
                    })
            } else {
                let collection = response.find(collection.name === `${tuneObj.key}/${tuneObj.tuning}` || collection.name === `${tuneObj.key}/${tuneObj.tuning}`)
                tuneCollectionsObj.collectionId = collection.id
                return fetch('http://localhost:8088/tunes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tuneObj)
                })
            }})
        .then(getLastTune)
            .then(res => {
                tuneCollectionsObj.tuneId = res[0].id
                addTuneCollections(tuneCollectionsObj)
        })
    }

        // console.log("coming into save", tuneObj)
        // let tuneCollectionsObj = { tuneId: tuneObj.id }
        // if (tuneObj.tuning === "Standard" && tuneObj.key === "G") {
        //     tuneCollectionsObj.collectionId = 1
        // } else if (tuneObj.tuning === "Standard" && tuneObj.key === "C") {
        //     tuneCollectionsObj.collectionId = 4
        // } else if (tuneObj.tuning === "Standard" && tuneObj.key === "F") {
        //     tuneCollectionsObj.collectionId = 5
        // } else if (tuneObj.tuning === "Cross") {
        //     tuneCollectionsObj.collectionId = 2
        // } else if (tuneObj.tuning === "High D") {
        //     tuneCollectionsObj.collectionId = 3
        // } else {
        //     tuneCollectionsObj.collectionId = 6
        // }
        // console.log(tuneCollectionsObj)



    const addTuneCollections = tuneCollectionsObj => {
        return fetch('http://localhost:8088/tuneCollections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tuneCollectionsObj)
        })
    }
    const getLastTune = () => {
        return fetch('http://localhost:8088/tunes?_sort=id&_order=desc&_limit=1')
            .then(response => response.json())
    }

    // allows user to edit their Tunes
    const editTune = tuneObj => {
        getTuneByIdWithTC(tuneObj.id).then(res => {
            if (res.tuning === tuneObj.tuning && res.key === tuneObj.key) {
                console.log("put")
                return fetch(`http://localhost:8088/tunes/${tuneObj.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(tuneObj)
                })
            } else {
                console.log("crazy one", res)
                deleteTune(res.id)
                    .then(() => {
                        delete tuneObj.id
                        console.log("tuneobj pre save", tuneObj)
                        saveTune(tuneObj)
                    })
            }
        })
    }

    const addStarToTune = (tuneId) => {
        console.log("log inside add", tuneId)
        return fetch(`http://localhost:8088/tunes/${tuneId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                starred: 1
            })
        })
    }

    const removeStarFromTune = (tuneId) => {
        console.log("log inside remove", tuneId)
        return fetch(`http://localhost:8088/tunes/${tuneId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                starred: 0
            })
        })
    }
    // removes Tune from database
    const deleteTune = tuneId => {
        console.log("delete", tuneId)
        debugger
        return fetch(`http://localhost:8088/tunes/${tuneId}`, {
            method: 'DELETE'
        })
    }

    const deleteTuneCollections = tuneCollectionsId => {
        return fetch(`http://localhost:8088/tuneCollections/${tuneCollectionsId}`, {
            method: 'DELETE'
        })
    }

    const getTuneByIdWithTC = id => {
        return fetch(`http://localhost:8088/tunes/${id}?_embed=tuneCollections`)
            .then(res => res.json())
    }

    const getTuneById = id => {
        return fetch(`http://localhost:8088/tunes/${id}`)
            .then(res => res.json())
    }

    const getTunesByUserId = (userId) => {
        return fetch(`http://localhost:8088/tunes/?userId=${userId}`)
            .then(res => res.json())
        // .then(setTunes)
    }

    const getStarredTunesByUserId = (userId) => {
        return fetch(`http://localhost:8088/tunes/?userId=${userId}&starred=1`)
            .then(res => res.json())
        // .then(setTunes)
    }

    return (
        <TuneContext.Provider value={{
            tune, tunes, saveTune, editTune, deleteTune, getTuneById, getTunesByUserId, getStarredTunesByUserId, addStarToTune, removeStarFromTune
        }}>
            {props.children}
        </TuneContext.Provider>
    )
}