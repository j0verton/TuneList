import React, { useState, createContext } from "react"

export const CollectionContext = createContext()

export const CollectionProvider = props => {

    const [collections, setCollections] = useState([])
    const[tuneCollections, setTuneCollections]= useState([])

    const getCollections = () => {
        return fetch('http://localhost:8088/collections?_embed=tuneCollections')
        .then(response => response.json())
    }

    const getCustomCollectionsByUserId = (userId) => {
        return fetch(`http://localhost:8088/collections/?userId=${userId}&custom=true&_embed=tuneCollections`)
        .then(response => response.json())
    }

    const addCustomCollection = (collectionName) => {
        return fetch('http://localhost:8088/collections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: parseInt(localStorage.getItem("tunes_user")),
                name: collectionName,
                custom:true
            })
        })
    }
    
    // adds new collections to database
    const saveCollection = (tuning, key, collectionName="") => {
        if (collectionName===""){
            if (tuning==="Standard"){
                collectionName = key.charAt(0).toUpperCase() + key.slice(1)
            } else if (tuning !=="standard"){
                collectionName = `${key.charAt(0).toUpperCase() + key.slice(1)}/${tuning}`
            }
        }        
        return fetch('http://localhost:8088/collections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: parseInt(localStorage.getItem("tunes_user")),
                name: collectionName
            })
        })
    }
    
    // allows user to edit their collections
    const editCollection = collectionObj => {
        return fetch(`http://localhost:8088/collections/${collectionObj.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collectionObj)
        })
    }
    
    // removes collection from database
    const deleteCollection = collectionId => {
        return fetch(`http://localhost:8088/collections/${collectionId}`, {
            method: 'DELETE'
        }).then(getCollections)
    }

    const getCollectionById = id => {
        return fetch(`http://localhost:8088/collections/${id}?_expand=user&_embed=tuneCollections`)
            .then(res => res.json())
    }
            
    const getCollectionsByUserId = (userId) => {
        return fetch(`http://localhost:8088/collections?userId=${userId}&_embed=tuneCollections`)
        .then(res => res.json())
        .then(res=> {
            setCollections(res)
            return res
        })
    }

    const getTuneCollectionsByCollectionIdWithTunes = (id) => {
        return fetch(`http://localhost:8088/tuneCollections?collectionId=${id}&_expand=tune`)
        .then(res => res.json())
        .then(res=> {
            setTuneCollections(res)
            return res
        })
    }
    const deleteUnusedCollections = () => {
        getCollections()
        .then(allCollections=> {
            return collections.filter(collection =>{
                return collection.tuneCollections.length === 0
            })
        })
        .then(response=> {
            response.forEach(element => {
                deleteCollection(element.id)
            })   
            })
        }

    return (
        <CollectionContext.Provider value={{
            collections, tuneCollections, getCollections, saveCollection, deleteCollection, getCollectionsByUserId, getTuneCollectionsByCollectionIdWithTunes, deleteUnusedCollections, addCustomCollection, editCollection, getCustomCollectionsByUserId
        }}>
            {props.children}
        </CollectionContext.Provider>
    )
}
