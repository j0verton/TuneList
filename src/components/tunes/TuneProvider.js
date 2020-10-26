import React, { useState, createContext } from "react"

export const TuneContext = createContext()

export const TuneProvider = props => {
    const [tunes, setTunes] = useState([])
    const [tune, setTune] = useState({})

    // adds new Tunes to database
    const saveTune = tuneObj => {
        console.log(tuneObj)
        let tuneCollectionsObj = {tuneId:tuneObj.id}
        if (tuneObj.tuning==="Standard" && tuneObj.key==="G" ) {
            tuneCollectionsObj.collectionId = 1
        } else if (tuneObj.tuning==="Standard" && tuneObj.key==="C" ) {
            tuneCollectionsObj.collectionId = 4
        } else if (tuneObj.tuning==="Standard" && tuneObj.key==="F" ) {
            tuneCollectionsObj.collectionId = 5
        } else if (tuneObj.tuning==="Cross") {
            tuneCollectionsObj.collectionId = 2
        } else if (tuneObj.tuning==="High D"){
            tuneCollectionsObj.collectionId = 3
        } else {
            tuneCollectionsObj.collectionId = 6
        }
        console.log(tuneCollectionsObj)
        return fetch('http://localhost:8088/tunes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tuneObj)
        })
        .then(getLastTune)
        .then(res => {
            console.log(res)
            tuneCollectionsObj.tuneId=res[0].id
            addTuneCollections(tuneCollectionsObj)
        })
    }
    
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
            if (res.tuning === tuneObj.tuning || res.key === tuneObj.key) {
                return fetch(`http://localhost:8088/tunes/${tuneObj.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(tuneObj)
                })
            } else {
                deleteTune(res.id)
                .then(() => res.tuneCollections.forEach(tuneCollection => {
                    deleteTuneCollections(tuneCollection.id)
                }))
                delete tuneObj.id
                saveTune(tuneObj)
            }
    })}
    
    const addStarToTune = (tuneId) => {
        console.log("log inside add",tuneId)
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
        console.log("log inside remove",tuneId)
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
        return fetch(`http://localhost:8088/tunes/${tuneId}`, {
            method: 'DELETE'
        })
    }

    const deleteTuneCollections = tuneCollectionsId => {
        return fetch(`http://http://localhost:8088/tuneCollections/${tuneCollectionsId}`, {
            method: 'DELETE'
        })
    }

    const getTuneByIdWithTC = id => {
        return fetch(`http://http://localhost:8088/tunes/${id}?_embed=tuneCollections`)
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