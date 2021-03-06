import React, { useState, createContext, useContext } from "react"
import { CollectionContext } from "../collections/CollectionsProvider"

export const TuneContext = createContext()

export const TuneProvider = props => {
    const [tunes, setTunes] = useState([])
    const [tune, setTune] = useState({})
    const { getCollectionsByUserId, saveCollection, deleteUnusedCollections } = useContext(CollectionContext)

    
            const getTunes = () => {
                return fetch('http://localhost:8088/tunes/?_expand=user')
                .then(response => response.json())
            }
    
    // adds new Tunes to database
    const saveTune  = tuneObj => {
        //set up an object for the join table "tuneCollections"
        let tuneCollectionsObj = { tuneId: tuneObj.id }
        // get all the users collections
        getCollectionsByUserId(localStorage.getItem("tunes_user"))
        //
        .then(res => {
            return res.map(response => {
                return response.name})
            })
        .then(response=>{  
            //standard tuning and the collection doesn't exist
            if (tuneObj.tuning === "Standard" && !response.includes(tuneObj.key)) {
                saveCollection(tuneObj.tuning, tuneObj.key)
                    .then(()=> getCollectionsByUserId(localStorage.getItem("tunes_user")))
                    .then(collections => {
                        return collections.find(collection=> collection.name === tuneObj.key)}
                        )
                    .then(res=>{
                        tuneCollectionsObj.collectionId = res.id
                    })
                    .then(() => {
                        postNewTune(tuneObj, tuneCollectionsObj)
                    })
            //tune is in an alternate tuning and the collection doesn't exist
            } else if (tuneObj.tuning !== "Standard" &&!response.includes(`${tuneObj.key}/${tuneObj.tuning}`))  {
                saveCollection(tuneObj.tuning, tuneObj.key)
                .then(()=> {
                    return getCollectionsByUserId(localStorage.getItem("tunes_user"))
                })
                .then(collections => {
                    
                    return collections.find(collection=> collection.name === `${tuneObj.key}/${tuneObj.tuning}`)
                }
                    )
                .then(res=>{
                    tuneCollectionsObj.collectionId = res.id
                })    
                .then(() => {
                    postNewTune(tuneObj, tuneCollectionsObj)
                    })
            //collection exists
            } else {
                getCollectionsByUserId(localStorage.getItem("tunes_user"))
                .then(collections=> {
                    let foundCollection = collections.find(collection => {
                        return collection.name === `${tuneObj.key}/${tuneObj.tuning}` || collection.name === `${tuneObj.key}`
                    })
                    return foundCollection
                })
                .then(foundCollection=> {
                    tuneCollectionsObj.collectionId = foundCollection.id
                    postNewTune(tuneObj, tuneCollectionsObj)
                       
                })
            }})
    }

    const postNewTune =(tuneObj, tuneCollectionsObj)=> {
        return fetch('http://localhost:8088/tunes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tuneObj)
        })
        .then(res=> res.json())
        .then(res => {
            tuneCollectionsObj.tuneId=res.id
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
            if (res.tuning === tuneObj.tuning && res.key === tuneObj.key) {
                return fetch(`http://localhost:8088/tunes/${tuneObj.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(tuneObj)
                })
            } else {
                deleteTune(res.id)
                .then(() => {
                    delete tuneObj.id
                    saveTune(tuneObj)
                })
            }
        })
    }
    
    const addStarToTune = (tuneId) => {
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

    const addAudioToTune = (id, url) => {
        return fetch(`http://localhost:8088/tunes/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                audioUpload: url
            })
        })
    }
    
    const removeStarFromTune = (tuneId) => {
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
        .then(deleteUnusedCollections)
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
            tune, tunes, getTunes, saveTune, editTune, deleteTune, getTuneById, getTunesByUserId, getStarredTunesByUserId, addStarToTune, removeStarFromTune, addAudioToTune, addTuneCollections
        }}>
            {props.children}
        </TuneContext.Provider>
    )
}
